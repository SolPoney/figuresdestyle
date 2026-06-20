import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-cookie-banner",
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
    @if (visible) {
      <div
        class="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up"
        role="region"
        aria-label="Gestion des cookies"
        aria-live="polite"
      >
        <div class="max-w-4xl mx-auto card surface-shine p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="flex-1 min-w-0">
            <p class="text-sm text-dark-text font-semibold mb-1">Cookies et confidentialité</p>
            <p class="text-xs text-dark-textSecondary leading-relaxed">
              Nous utilisons uniquement des cookies essentiels au fonctionnement du site (session, préférences).
              Aucun cookie publicitaire ou de tracking tiers.
              <a routerLink="/politique-confidentialite" class="link ml-1">En savoir plus</a>
            </p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button (click)="decline()" class="btn btn-secondary btn-sm">Refuser</button>
            <button (click)="accept()" class="btn btn-primary btn-sm">Accepter</button>
          </div>
        </div>
      </div>
    }
  `,
})
export class CookieBannerComponent implements OnInit {
	visible = false;

	ngOnInit(): void {
		const consent = localStorage.getItem("cookie_consent");
		if (!consent) this.visible = true;
	}

	accept(): void {
		localStorage.setItem("cookie_consent", "accepted");
		this.visible = false;
	}

	decline(): void {
		localStorage.setItem("cookie_consent", "declined");
		this.visible = false;
	}
}
