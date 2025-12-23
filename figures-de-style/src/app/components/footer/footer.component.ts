import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-dark-surface border-t border-dark-border mt-auto">
      <div class="max-w-6xl mx-auto px-4 py-8">
        <div class="grid gap-8 md:grid-cols-3">
          <!-- À propos -->
          <div>
            <h3 class="text-lg font-bold text-dark-text mb-4">
              Figures de style
            </h3>
            <p class="text-sm text-dark-textSecondary">
              Apprenez à maîtriser les figures de style françaises à travers des
              exercices interactifs.
            </p>
          </div>

          <!-- Liens légaux -->
          <div>
            <h3 class="text-lg font-bold text-dark-text mb-4">
              Informations légales
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/mentions-legales"
                  class="text-sm text-dark-textSecondary hover:text-blue-400 transition-colors"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  routerLink="/politique-confidentialite"
                  class="text-sm text-dark-textSecondary hover:text-blue-400 transition-colors"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a
                  routerLink="/accessibilite"
                  class="text-sm text-dark-textSecondary hover:text-blue-400 transition-colors"
                >
                  Déclaration d'accessibilité
                </a>
              </li>
              <li>
                <a
                  routerLink="/cgv"
                  class="text-sm text-dark-textSecondary hover:text-blue-400 transition-colors"
                >
                  CGV
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h3 class="text-lg font-bold text-dark-text mb-4">
              Besoin d'aide ?
            </h3>
            <ul class="space-y-2">
              <li>
                <a
                  routerLink="/contact"
                  class="text-sm text-dark-textSecondary hover:text-blue-400 transition-colors"
                >
                  Nous contacter
                </a>
              </li>
              <li>
                <a
                  routerLink="/admin"
                  class="text-sm text-dark-textSecondary hover:text-blue-400 transition-colors"
                >
                  Tableau de bord admin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-dark-border text-center">
          <p class="text-sm text-dark-textSecondary">
            © {{ currentYear }} Figures de style. Tous droits réservés.
          </p>
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
