import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

interface CheckoutSessionResponse {
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiPaymentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createCheckoutSession(
    priceId: string,
    plan: 'premium' | 'school'
  ): Observable<CheckoutSessionResponse> {
    return this.http.post<CheckoutSessionResponse>(
      `${environment.apiUrl}/stripe/create-checkout-session`,
      {
        priceId,
        plan,
      }
    );
  }

  async processPayment(plan: 'premium' | 'school'): Promise<void> {
    try {
      // Prix IDs à configurer dans Stripe Dashboard
      const priceIds = {
        premium: environment.production
          ? 'price_premium_monthly'
          : 'price_test_premium',
        school: environment.production
          ? 'price_school_yearly'
          : 'price_test_school',
      };

      const priceId = priceIds[plan];

      // Créer la session Stripe
      this.createCheckoutSession(priceId, plan).subscribe({
        next: (response) => {
          // Rediriger vers Stripe Checkout
          window.location.href = response.url;
        },
        error: (error) => {
          console.error('Erreur création session:', error);
          alert('Erreur lors du paiement. Veuillez réessayer.');
        },
      });
    } catch (error) {
      console.error('Erreur paiement:', error);
      alert('Erreur lors du paiement. Veuillez réessayer.');
    }
  }
}
