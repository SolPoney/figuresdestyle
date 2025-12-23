import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY') || 'sk_test_YOUR_KEY',
      {
        apiVersion: '2025-12-15.clover',
      },
    );
  }

  async createCheckoutSession(
    userId: string,
    priceId: string,
    plan: 'premium' | 'school',
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const frontendUrl = this.configService.get('FRONTEND_URL');

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      client_reference_id: userId,
      success_url: `${frontendUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/pricing`,
      metadata: {
        userId: userId,
        plan: plan,
      },
    });

    return { url: session.url };
  }

  async handleWebhook(signature: string, rawBody: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case 'customer.subscription.created':
      case 'invoice.payment_succeeded':
        await this.handleSubscriptionSuccess(
          event.data.object as Stripe.Subscription | Stripe.Invoice,
        );
        break;

      case 'customer.subscription.deleted':
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdate(
          event.data.object as Stripe.Subscription,
        );
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }

    return { received: true };
  }

  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.client_reference_id || session.metadata?.userId;
    const customerId = session.customer as string;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: customerId,
      },
    });
  }

  private async handleSubscriptionSuccess(
    data: Stripe.Subscription | Stripe.Invoice,
  ) {
    const subscription =
      'subscription' in data
        ? await this.stripe.subscriptions.retrieve(data.subscription as string)
        : (data as any);

    const customerId = subscription.customer as string;

    const user = await this.prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
    });

    if (!user) return;

    const premiumUntil = new Date(subscription.current_period_end * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        plan: subscription.metadata?.plan === 'school' ? 'SCHOOL' : 'PREMIUM',
        stripeSubscriptionId: subscription.id,
        premiumUntil: premiumUntil,
      },
    });

    // Logger l'upgrade
    await this.prisma.activityLog.create({
      data: {
        type: 'UPGRADE',
        userId: user.id,
        email: user.email,
        details: {
          plan: subscription.metadata?.plan,
          subscriptionId: subscription.id,
        },
      },
    });
  }

  private async handleSubscriptionUpdate(subscription: Stripe.Subscription) {
    const customerId = subscription.customer as string;

    const user = await this.prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
    });

    if (!user) return;

    if (
      subscription.status === 'canceled' ||
      subscription.status === 'unpaid'
    ) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          plan: 'FREE',
          stripeSubscriptionId: null,
          premiumUntil: null,
        },
      });

      await this.prisma.activityLog.create({
        data: {
          type: 'DOWNGRADE',
          userId: user.id,
          email: user.email,
          details: {
            reason: subscription.status,
          },
        },
      });
    }
  }

  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const customerId = invoice.customer as string;

    const user = await this.prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
    });

    if (!user) return;

    await this.prisma.activityLog.create({
      data: {
        type: 'ERROR',
        userId: user.id,
        email: user.email,
        details: {
          error: 'payment_failed',
          invoiceId: invoice.id,
          amount: invoice.amount_due,
        },
      },
    });

    // TODO: Envoyer email de rappel de paiement
  }
}
