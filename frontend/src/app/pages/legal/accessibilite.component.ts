import { Component } from "@angular/core";
import { LegalLayoutComponent } from "./legal-layout.component";

@Component({
	selector: "app-accessibilite",
	standalone: true,
	imports: [LegalLayoutComponent],
	template: `
    <app-legal>
      <h1 class="text-4xl font-bold text-dark-text mb-8">
        Déclaration d'accessibilité
      </h1>

      <div
        class="prose prose-invert max-w-none space-y-6 text-dark-textSecondary"
      >
        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Engagement d'accessibilité
          </h2>
          <p>
            [Votre Nom/Entreprise] s'engage à rendre son site accessible
            conformément à l'article 47 de la loi n° 2005-102 du 11 février
            2005.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            État de conformité
          </h2>
          <p>
            Le site "Figures de style" est en conformité partielle avec le RGAA
            (Référentiel Général d'Amélioration de l'Accessibilité).
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Fonctionnalités accessibles
          </h2>
          <ul class="list-disc list-inside space-y-2">
            <li>Navigation au clavier optimisée</li>
            <li>Contraste de couleurs élevé (thème sombre)</li>
            <li>Textes dimensionnables</li>
            <li>Structure sémantique HTML5</li>
            <li>Labels ARIA pour les éléments interactifs</li>
            <li>Formulaires avec labels explicites</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Technologies utilisées
          </h2>
          <ul class="list-disc list-inside space-y-2">
            <li>HTML5</li>
            <li>CSS3 (Tailwind CSS)</li>
            <li>JavaScript (Angular)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Amélioration continue
          </h2>
          <p>
            Nous travaillons continuellement à améliorer l'accessibilité de
            notre site. Si vous rencontrez des difficultés d'accès à certains
            contenus, n'hésitez pas à nous le signaler.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Contact</h2>
          <p>
            Si vous n'arrivez pas à accéder à un contenu ou à un service, vous
            pouvez nous contacter pour être orienté vers une alternative
            accessible ou obtenir le contenu sous une autre forme.
          </p>
          <p class="mt-4">
            Email :
            <a
              href="mailto:contact&#64;figures-de-style.fr"
              class="text-blue-400"
              >contact&#64;figures-de-style.fr</a
            ><br />
            Formulaire :
            <a routerLink="/contact" class="text-blue-400">Page de contact</a>
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Voies de recours
          </h2>
          <p>
            Si vous constatez un défaut d'accessibilité vous empêchant d'accéder
            à un contenu ou une fonctionnalité du site, que vous nous le
            signalez et que vous ne parvenez pas à obtenir une réponse de notre
            part, vous êtes en droit de faire parvenir vos doléances ou une
            demande de saisine au Défenseur des droits.
          </p>
        </section>
      </div>
    </app-legal>
  `,
})
export class AccessibiliteComponent {}
