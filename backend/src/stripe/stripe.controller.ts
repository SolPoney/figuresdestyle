import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  UseGuards,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';
import { CreateCheckoutDto } from './dto/stripe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Body() createCheckoutDto: CreateCheckoutDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.stripeService.createCheckoutSession(
      userId,
      createCheckoutDto.priceId,
      createCheckoutDto.plan,
    );
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new Error('Raw body is required for webhook verification');
    }
    return this.stripeService.handleWebhook(signature, rawBody);
  }
}
