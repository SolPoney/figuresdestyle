import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, PlanType } from '../models/user.model';
import { MonitoringService } from './monitoring.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'figures_user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Modules gratuits (1-2)
  private readonly FREE_MODULES = ['1', '2'];

  constructor(private monitoringService: MonitoringService) {
    const storedUser = this.loadUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private loadUserFromStorage(): User | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return null;

    try {
      const user = JSON.parse(stored);
      user.createdAt = new Date(user.createdAt);
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

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Connexion simple (sans backend pour l'instant)
  login(email: string, name: string = 'Utilisateur'): User {
    const user: User = {
      id: this.generateId(),
      email,
      name,
      plan: 'free',
      createdAt: new Date(),
    };

    this.saveUserToStorage(user);
    this.currentUserSubject.next(user);

    // Logger l'activité
    this.monitoringService.logActivity(
      'signup',
      { email, name },
      user.id,
      email
    );

    return user;
  }

  // Déconnexion
  logout(): void {
    const user = this.currentUserValue;
    if (user) {
      this.monitoringService.logActivity(
        'login',
        { action: 'logout' },
        user.id,
        user.email
      );
    }
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  // Vérifier si l'utilisateur a un plan premium
  hasPremium(): boolean {
    const user = this.currentUserValue;
    if (!user) return false;

    if (user.plan === 'free') return false;

    // Vérifier si l'abonnement est encore valide
    if (user.premiumUntil && user.premiumUntil < new Date()) {
      // Abonnement expiré, repasser en free
      this.downgradeToPlan('free');
      return false;
    }

    return true;
  }

  // Upgrade vers premium
  upgradeToPremium(): void {
    const user = this.currentUserValue;
    if (!user) return;

    user.plan = 'premium';
    user.premiumUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 an

    this.saveUserToStorage(user);
    this.currentUserSubject.next(user);

    // Logger l'upgrade
    this.monitoringService.logActivity(
      'upgrade',
      { plan: 'premium', price: '9.99€' },
      user.id,
      user.email
    );
  }

  // Upgrade vers école
  upgradeToSchool(): void {
    const user = this.currentUserValue;
    if (!user) return;

    user.plan = 'school';
    user.premiumUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 an

    this.saveUserToStorage(user);
    this.currentUserSubject.next(user);

    // Logger l'upgrade
    this.monitoringService.logActivity(
      'upgrade',
      { plan: 'school', price: '199€/an' },
      user.id,
      user.email
    );
  }

  // Downgrade vers un plan
  downgradeToPlan(plan: PlanType): void {
    const user = this.currentUserValue;
    if (!user) return;

    user.plan = plan;
    if (plan === 'free') {
      delete user.premiumUntil;
    }

    this.saveUserToStorage(user);
    this.currentUserSubject.next(user);
  }

  // Vérifier si un module est accessible
  canAccessModule(moduleId: string): boolean {
    // Modules gratuits toujours accessibles
    if (this.FREE_MODULES.includes(moduleId)) {
      return true;
    }

    // Autres modules nécessitent premium
    return this.hasPremium();
  }

  // Obtenir les modules accessibles
  getAccessibleModules(): string[] {
    if (this.hasPremium()) {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'final'];
    }
    return this.FREE_MODULES;
  }

  private generateId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
