import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-dark-surface border-t border-dark-border mt-auto" role="contentinfo">
      <div class="max-w-6xl mx-auto px-6 py-12">
        <div class="grid gap-10 md:grid-cols-3">

          <!-- Marque -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <span class="w-7 h-7 rounded-lg bg-indigo-700 flex items-center justify-center text-white font-bold text-xs">F</span>
              <span class="font-bold text-dark-text">Figures de style</span>
            </div>
            <p class="text-sm text-dark-textSecondary leading-relaxed">
              Maîtrisez les figures rhétoriques françaises à travers des exercices interactifs et 500+ exemples littéraires.
            </p>
          </div>

          <!-- Légal -->
          <nav aria-label="Liens légaux">
            <h3 class="text-sm font-semibold text-dark-text uppercase tracking-widest mb-4">Légal</h3>
            <ul class="flex flex-col gap-2.5">
              <li><a routerLink="/mentions-legales"            class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">Mentions légales</a></li>
              <li><a routerLink="/politique-confidentialite"   class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">Politique de confidentialité</a></li>
              <li><a routerLink="/accessibilite"               class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">Déclaration d'accessibilité</a></li>
              <li><a routerLink="/cgv"                         class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">CGV</a></li>
            </ul>
          </nav>

          <!-- Support -->
          <nav aria-label="Support et aide">
            <h3 class="text-sm font-semibold text-dark-text uppercase tracking-widest mb-4">Support</h3>
            <ul class="flex flex-col gap-2.5">
              <li><a routerLink="/contact" class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">Nous contacter</a></li>
              <li><a routerLink="/devis"   class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">Devis établissement</a></li>
              <li><a routerLink="/admin"   class="text-sm text-dark-textSecondary hover:text-dark-text transition-colors">Administration</a></li>
            </ul>
          </nav>

        </div>

        <div class="mt-10 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-dark-textSecondary">© {{ currentYear }} Figures de style. Tous droits réservés.</p>
          <p class="text-xs text-dark-textSecondary">Conforme RGAA · WCAG 2.1 AAA</p>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
