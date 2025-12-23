import { Component } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal>
      <h1 class="text-4xl font-bold text-dark-text mb-8">
        Politique de confidentialité
      </h1>

      <div
        class="prose prose-invert max-w-none space-y-6 text-dark-textSecondary"
      >
        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Collecte des données
          </h2>
          <p>
            Nous collectons uniquement les données nécessaires au fonctionnement
            du service :
          </p>
          <ul class="list-disc list-inside space-y-2">
            <li>Adresse email (pour la connexion)</li>
            <li>Nom (optionnel)</li>
            <li>Progression dans les modules</li>
            <li>Scores obtenus aux exercices</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Utilisation des données
          </h2>
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul class="list-disc list-inside space-y-2">
            <li>Gérer votre compte et votre progression</li>
            <li>Vous permettre d'accéder aux modules débloqués</li>
            <li>
              Envoyer des communications liées au service (pour les plans
              payants)
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Stockage des données
          </h2>
          <p>
            Dans cette version de démonstration, vos données sont stockées
            localement dans votre navigateur (localStorage). Elles ne sont pas
            transmises à nos serveurs.
          </p>
          <p>
            Dans la version production avec abonnement payant, vos données
            seront stockées de manière sécurisée sur nos serveurs et ne seront
            jamais vendues ou partagées avec des tiers sans votre consentement
            explicite.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul class="list-disc list-inside space-y-2">
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification de vos données</li>
            <li>Droit à l'effacement (droit à l'oubli)</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d'opposition au traitement de vos données</li>
          </ul>
          <p class="mt-4">
            Pour exercer ces droits, contactez-nous à :
            <a
              href="mailto:contact&#64;figures-de-style.fr"
              class="text-blue-400"
              >contact&#64;figures-de-style.fr</a
            >
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">Sécurité</h2>
          <p>
            Nous mettons en œuvre toutes les mesures techniques et
            organisationnelles appropriées pour protéger vos données contre tout
            accès non autorisé, perte ou altération.
          </p>
        </section>
      </div>
    </app-legal>
  `,
})
export class PolitiqueConfidentialiteComponent {}
