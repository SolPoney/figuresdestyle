import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiAuthService } from '../../services/api-auth.service';
import { PaymentService } from '../../services/payment.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  currentUser: User | null = null;
  email: string = '';
  name: string = '';
  password: string = '';
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private apiAuthService: ApiAuthService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.signup();
    }
  }

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.apiAuthService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.login(response.user.email, ''); // Sync with old service
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Erreur de connexion';
        },
      });
  }

  signup(): void {
    if (!this.email || !this.name || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.apiAuthService
      .signup({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.authService.login(response.user.email, ''); // Sync with old service
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage =
            error.error?.message || "Erreur lors de l'inscription";
        },
      });
  }

  logout(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
      this.router.navigate(['/']);
    }
  }

  upgradeToPremium(): void {
    this.paymentService.createCheckoutSession('premium');
  }

  upgradeToSchool(): void {
    this.paymentService.createCheckoutSession('school');
  }

  getPlanLabel(): string {
    if (!this.currentUser) return '';

    switch (this.currentUser.plan) {
      case 'free':
        return 'Gratuit';
      case 'premium':
        return 'Premium';
      case 'school':
        return 'École';
      default:
        return '';
    }
  }

  getPlanColor(): string {
    if (!this.currentUser) return 'text-gray-400';

    switch (this.currentUser.plan) {
      case 'free':
        return 'text-gray-400';
      case 'premium':
        return 'text-yellow-400';
      case 'school':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  }
}
