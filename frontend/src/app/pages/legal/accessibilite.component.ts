import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LegalLayoutComponent } from "./legal-layout.component";

@Component({
	selector: "app-accessibilite",
	standalone: true,
	imports: [LegalLayoutComponent, RouterModule],
	template: `
    <app-legal>
      <h1 class="text-4xl font-bold text-dark-text mb-8">
        Déclaration d'accessibilité
      </h1>

      <div class="prose prose-invert max-w-none space-y-6 text-dark-textSecondary">

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">État de conformité</h2>
          <p>
            Le site <strong class="text-dark-text">Figures de style</strong> est en
            <strong class="text-dark-text">conformité partielle</strong> avec le
            référentiel RGAA 4.1 (Référentiel Général d'Amélioration de l'Accessibilité),
            en raison des non-conformités listées ci-dessous.
          </p>
          <p class="mt-3">
            Audit réalisé en juin 2026 sur la base des 106 critères du RGAA 4.1.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Fonctionnalités accessibles</h2>
          <ul class="list-disc list-inside space-y-2">
            <li>Lien d'évitement vers le contenu principal (skip-link)</li>
            <li>Titres de page dynamiques et descriptifs</li>
            <li>Navigation au clavier complète avec focus visible</li>
            <li>Respect de <code>prefers-reduced-motion</code></li>
            <li>Contraste de couleurs élevé (thème sombre)</li>
            <li>Structure sémantique HTML5 (landmarks, headings)</li>
            <li>Formulaires avec labels explicites et messages d'erreur par champ</li>
            <li>Composants ARIA corrects : boutons toggle (<code>aria-expanded</code>), quiz (<code>role="radio"</code>), modale (<code>aria-modal</code>, focus trap)</li>
            <li>Indicateurs de score non basés uniquement sur la couleur</li>
            <li>Liens d'action avec labels explicites incluant le contexte</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Non-conformités résiduelles</h2>
          <p class="mb-3">Les points suivants n'ont pas encore été corrigés :</p>
          <ul class="list-disc list-inside space-y-2">
            <li>Absence de page de plan du site navigable sans JavaScript</li>
            <li>Certains contenus dynamiques peuvent nécessiter une aide à la lecture d'écran</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Technologies utilisées</h2>
          <ul class="list-disc list-inside space-y-2">
            <li>HTML5</li>
            <li>CSS3 (Tailwind CSS)</li>
            <li>JavaScript (Angular 17)</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Contact</h2>
          <p>
            Si vous n'arrivez pas à accéder à un contenu ou à un service, contactez-nous
            pour être orienté vers une alternative accessible ou obtenir le contenu sous
            une autre forme.
          </p>
          <p class="mt-4">
            Email :
            <a href="mailto:contact&#64;figures-de-style.fr" class="link">contact&#64;figures-de-style.fr</a><br/>
            Formulaire : <a routerLink="/contact" class="link">Page de contact</a>
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Voies de recours</h2>
          <p>
            Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un
            contenu ou une fonctionnalité du site, que vous nous le signalez et que vous
            ne parvenez pas à obtenir une réponse satisfaisante, vous êtes en droit de
            faire parvenir vos doléances au
            <strong class="text-dark-text">Défenseur des droits</strong>.
          </p>
        </section>

      </div>
    </app-legal>
  `,
})
export class AccessibiliteComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Accessibilité — Figures de style');
  }
}
