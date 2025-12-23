import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { User, PlanType } from '../models/user.model';
import { MonitoringService } from './monitoring.service';
import { environment } from '../../environments/environment';

interface AuthResponse {
  user: User;
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly STORAGE_KEY = 'figures_user';
  private readonly TOKEN_KEY = 'figures_token';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Modules gratuits (1-2)
  private readonly FREE_MODULES = ['1', '2'];

  constructor(
    private http: HttpClient,
    private monitoringService: MonitoringService
  ) {
    const storedUser = this.loadUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private loadUserFromStorage(): User | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return null;

    try {
      const user = JSON.parse(stored);
      if (user.createdAt) {
        user.createdAt = new Date(user.createdAt);
      }
      if (user.premiumUntil) {
        user.premiumUntil = new Date(user.premiumUntil);
      }
      return user;
    } catch {
      return null;
    }
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Inscription avec backend
  signup(signupData: SignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/signup`, signupData)
      .pipe(
        tap((response) => {
          this.saveUserToStorage(response.user);
          this.saveToken(response.token);
          this.currentUserSubject.next(response.user);
          this.monitoringService.logActivity('signup', response.user.email);
        }),
        catchError((error) => {
          console.error('Erreur inscription:', error);
          return throwError(() => error);
        })
      );
  }

  // Connexion avec backend
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, loginData)
      .pipe(
        tap((response) => {
          this.saveUserToStorage(response.user);
          this.saveToken(response.token);
          this.currentUserSubject.next(response.user);
          this.monitoringService.logActivity('login', response.user.email);
        }),
        catchError((error) => {
          console.error('Erreur connexion:', error);
          return throwError(() => error);
        })
      );
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.monitoringService.logActivity('login', { action: 'logout' });
  }

  // Vérifier si connecté
  isAuthenticated(): boolean {
    return this.currentUserValue !== null && this.getToken() !== null;
  }

  // Upgrade vers premium
  upgradeToPremium(): void {
    const user = this.currentUserValue;
    if (!user) return;

    const updatedUser: User = {
      ...user,
      plan: 'premium',
      premiumUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
    };

    this.saveUserToStorage(updatedUser);
    this.currentUserSubject.next(updatedUser);
    this.monitoringService.logActivity(
      'upgrade',
      {
        plan: 'premium',
        price: '9.99',
      },
      user.id,
      user.email
    );
  }

  // Upgrade vers école
  upgradeToSchool(): void {
    const user = this.currentUserValue;
    if (!user) return;

    const updatedUser: User = {
      ...user,
      plan: 'school',
      premiumUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
    };

    this.saveUserToStorage(updatedUser);
    this.currentUserSubject.next(updatedUser);
    this.monitoringService.logActivity(
      'upgrade',
      {
        plan: 'school',
        price: '199',
      },
      user.id,
      user.email
    );
  }

  // Downgrade vers un plan
  downgradeToPlan(plan: PlanType): void {
    const user = this.currentUserValue;
    if (!user) return;

    const updatedUser: User = {
      ...user,
      plan,
      premiumUntil: plan === 'free' ? undefined : user.premiumUntil,
    };

    this.saveUserToStorage(updatedUser);
    this.currentUserSubject.next(updatedUser);
  }

  // Vérifier si un module est accessible
  canAccessModule(moduleId: string): boolean {
    const user = this.currentUserValue;

    // Modules gratuits accessibles à tous
    if (this.FREE_MODULES.includes(moduleId)) {
      return true;
    }

    // Premium et School ont accès à tout
    if (user && (user.plan === 'premium' || user.plan === 'school')) {
      // Vérifier si l'abonnement est toujours valide
      if (user.premiumUntil && new Date(user.premiumUntil) > new Date()) {
        return true;
      }
    }

    return false;
  }

  // Obtenir les modules accessibles
  getAccessibleModules(): string[] {
    const user = this.currentUserValue;

    if (!user || user.plan === 'free') {
      return this.FREE_MODULES;
    }

    // Premium et School : tous les modules
    if (
      (user.plan === 'premium' || user.plan === 'school') &&
      user.premiumUntil &&
      new Date(user.premiumUntil) > new Date()
    ) {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'final'];
    }

    return this.FREE_MODULES;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
