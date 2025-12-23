import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-dark-bg px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <a
          routerLink="/"
          class="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour à l'accueil
        </a>

        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class LegalLayoutComponent {}
