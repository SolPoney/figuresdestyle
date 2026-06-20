import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-legal",
	standalone: true,
	imports: [CommonModule, RouterModule],
	template: `
    <div class="page">
      <div class="container-md animate-slide-up">
        <a routerLink="/" class="inline-flex items-center gap-2 text-dark-textSecondary hover:text-dark-text text-sm mb-10 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Accueil
        </a>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class LegalLayoutComponent {}
