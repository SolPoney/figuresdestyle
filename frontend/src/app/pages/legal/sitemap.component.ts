import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LegalLayoutComponent } from "./legal-layout.component";

@Component({
	selector: "app-sitemap",
	standalone: true,
	imports: [LegalLayoutComponent, RouterModule],
	template: `
    <app-legal>
      <h1 class="text-4xl font-bold text-dark-text mb-8">Plan du site</h1>

      <nav aria-label="Plan du site" class="space-y-8 text-dark-textSecondary">

        <section>
          <h2 class="text-xl font-bold text-dark-text mb-3">Apprentissage</h2>
          <ul class="list-disc list-inside space-y-2">
            <li><a routerLink="/" class="link">Accueil — liste des modules</a></li>
            <li><span class="text-dark-textSecondary">Module (ex. : /module/module-1) — fiche d'une figure</span></li>
            <li><span class="text-dark-textSecondary">Exercice (ex. : /exercise/module-1) — quiz interactif</span></li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-dark-text mb-3">Compte</h2>
          <ul class="list-disc list-inside space-y-2">
            <li><a routerLink="/auth" class="link">Connexion / Inscription</a></li>
            <li><a routerLink="/teacher-dashboard" class="link">Tableau de bord enseignant</a></li>
            <li><a routerLink="/devis" class="link">Demander un devis École</a></li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-dark-text mb-3">Contact et aide</h2>
          <ul class="list-disc list-inside space-y-2">
            <li><a routerLink="/contact" class="link">Nous contacter</a></li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-bold text-dark-text mb-3">Informations légales</h2>
          <ul class="list-disc list-inside space-y-2">
            <li><a routerLink="/mentions-legales" class="link">Mentions légales</a></li>
            <li><a routerLink="/politique-confidentialite" class="link">Politique de confidentialité</a></li>
            <li><a routerLink="/cgv" class="link">Conditions générales de vente</a></li>
            <li><a routerLink="/accessibilite" class="link">Déclaration d'accessibilité</a></li>
            <li><a routerLink="/plan-du-site" class="link">Plan du site</a> (page actuelle)</li>
          </ul>
        </section>

      </nav>
    </app-legal>
  `,
})
export class SitemapComponent implements OnInit {
	constructor(private titleService: Title) {}

	ngOnInit(): void {
		this.titleService.setTitle("Plan du site — Figures de style");
	}
}
