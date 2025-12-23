import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiPaymentService } from './api-payment.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private authService: AuthService,
    private apiPaymentService: ApiPaymentService
  ) {}

  async createCheckoutSession(plan: 'premium' | 'school'): Promise<void> {
    const user = this.authService.currentUserValue;

    if (!user) {
      alert('Vous devez être connecté pour effectuer un paiement');
      return;
    }

    // En mode développement sans backend, simulation
    if (!environment.production && !environment.apiUrl.includes('railway')) {
      const confirmPayment = confirm(
        plan === 'premium'
          ? 'Passer au plan Premium (9,99€/mois) ? (Mode simulation)'
          : 'Passer au plan École (199€/an) ? (Mode simulation)'
      );

      if (confirmPayment) {
        if (plan === 'premium') {
          this.authService.upgradeToPremium();
          alert(
            '✅ Paiement réussi ! Vous avez maintenant accès à tous les modules.'
          );
        } else if (plan === 'school') {
          this.authService.upgradeToSchool();
          alert(
            "✅ Abonnement École activé ! Vous pouvez maintenant gérer jusqu'à 30 élèves."
          );
        }
      }
      return;
    }

    // En production, utiliser l'API backend
    try {
      await this.apiPaymentService.processPayment(plan);
    } catch (error) {
      console.error('Erreur paiement:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
    }
  }

  getPriceLabel(plan: 'premium' | 'school'): string {
    return plan === 'premium' ? '9,99€' : '199€/an';
  }
}
