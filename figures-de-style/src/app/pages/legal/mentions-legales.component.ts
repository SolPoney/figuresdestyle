import { Component } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal>
      <h1 class="text-4xl font-bold text-dark-text mb-8">Mentions légales</h1>

      <div
        class="prose prose-invert max-w-none space-y-6 text-dark-textSecondary"
      >
        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Éditeur du site
          </h2>
          <p>
            Le site "Figures de style" est édité par [Votre Nom/Entreprise]<br />
            Adresse : [Votre adresse]<br />
            Email :
            <a
              href="mailto:contact&#64;figures-de-style.fr"
              class="text-blue-400"
              >contact&#64;figures-de-style.fr</a
            >
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Hébergement</h2>
          <p>
            Le site est hébergé par [Nom de l'hébergeur]<br />
            Adresse : [Adresse de l'hébergeur]
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Propriété intellectuelle
          </h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, graphismes, logo,
            icônes, etc.) est la propriété exclusive de [Votre Nom/Entreprise],
            à l'exception des marques, logos ou contenus appartenant à d'autres
            sociétés partenaires ou auteurs.
          </p>
          <p>
            Toute reproduction, distribution, modification, adaptation,
            retransmission ou publication de ces différents éléments est
            strictement interdite sans l'accord exprès par écrit de [Votre
            Nom/Entreprise].
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Données personnelles
          </h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression des données vous concernant. Pour
            exercer ces droits, contactez-nous à :
            <a
              href="mailto:contact&#64;figures-de-style.fr"
              class="text-blue-400"
              >contact&#64;figures-de-style.fr</a
            >
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Cookies</h2>
          <p>
            Ce site utilise le stockage local du navigateur (localStorage) pour
            sauvegarder votre progression et vos préférences. Aucune donnée
            n'est transmise à des tiers.
          </p>
        </section>
      </div>
    </app-legal>
  `,
})
export class MentionsLegalesComponent {}
