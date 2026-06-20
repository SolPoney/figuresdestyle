import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

@Component({
	selector: "app-not-found",
	standalone: true,
	imports: [RouterModule],
	template: `
    <div class="page flex items-center justify-center min-h-[80vh]">
      <div class="max-w-lg mx-auto text-center animate-slide-up">
        <div class="text-[8rem] font-extrabold leading-none text-gradient mb-2" aria-hidden="true">404</div>
        <h1 class="page-title mb-4">Page introuvable</h1>
        <p class="page-subtitle mb-10">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <a routerLink="/" class="btn btn-primary btn-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Retour à l'accueil
          </a>
          <a routerLink="/contact" class="btn btn-secondary btn-lg">Nous contacter</a>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Page introuvable (404) — Figures de style');
  }
}
