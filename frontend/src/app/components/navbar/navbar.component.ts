import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
    <header class="sticky top-0 z-50 bg-dark-bg/90 backdrop-blur border-b border-dark-border">
      <nav class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16" aria-label="Navigation principale">

        <a routerLink="/" class="flex items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg" aria-label="Figures de style — Accueil">
          <span class="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center text-white font-bold text-sm" aria-hidden="true">F</span>
          <span class="font-bold text-dark-text tracking-tight hidden sm:block">Figures de style</span>
        </a>

        <div class="flex items-center gap-1 sm:gap-2">
          <a routerLink="/contact" class="btn btn-ghost btn-sm hidden sm:inline-flex">Contact</a>
          <a routerLink="/devis" class="btn btn-ghost btn-sm hidden sm:inline-flex">Devis école</a>

          <a
            *ngIf="currentUser && currentUser.plan === 'school'"
            routerLink="/teacher-dashboard"
            class="btn btn-school btn-sm"
          >
            Dashboard
          </a>

          <a *ngIf="!currentUser" routerLink="/auth" class="btn btn-primary btn-sm">
            Connexion
          </a>

          <a *ngIf="currentUser" routerLink="/auth" class="btn btn-secondary btn-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span class="hidden sm:inline">{{ currentUser.name || currentUser.email }}</span>
            <span *ngIf="currentUser.plan === 'premium'" class="badge-premium">Premium</span>
            <span *ngIf="currentUser.plan === 'school'" class="badge-school">École</span>
          </a>
        </div>
      </nav>
    </header>
  `,
})
export class NavbarComponent implements OnInit {
	currentUser: User | null = null;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.authService.currentUser.subscribe((user: User | null) => {
			this.currentUser = user;
		});
	}
}
