import { Component } from '@angular/core';
import { LegalLayoutComponent } from './legal-layout.component';

@Component({
  selector: 'app-cgv',
  standalone: true,
  imports: [LegalLayoutComponent],
  template: `
    <app-legal>
      <h1 class="text-4xl font-bold text-dark-text mb-8">
        Conditions Générales de Vente
      </h1>

      <div
        class="prose prose-invert max-w-none space-y-6 text-dark-textSecondary"
      >
        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 1 - Objet
          </h2>
          <p>
            Les présentes conditions générales de vente régissent les ventes de
            services d'abonnement au site "Figures de style" entre [Votre
            Nom/Entreprise] et tout utilisateur du site.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 2 - Prix
          </h2>
          <p>Les prix des abonnements sont les suivants :</p>
          <ul class="list-disc list-inside space-y-2">
            <li><strong>Gratuit</strong> : Accès aux modules 1-2</li>
            <li>
              <strong>Premium</strong> : 9,99€ - Accès à tous les modules pour 1
              an
            </li>
            <li>
              <strong>École</strong> : 199€/an - Accès enseignant + 30 comptes
              élèves
            </li>
          </ul>
          <p class="mt-4">
            Les prix sont indiqués en euros toutes taxes comprises (TTC). Nous
            nous réservons le droit de modifier nos tarifs à tout moment.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 3 - Paiement
          </h2>
          <p>
            Le paiement s'effectue par carte bancaire via notre prestataire de
            paiement sécurisé Stripe. Le paiement est exigible immédiatement à
            la commande.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 4 - Accès au service
          </h2>
          <p>
            L'accès au service est activé immédiatement après validation du
            paiement. L'abonnement est valable pour une durée d'un an à compter
            de la date de souscription.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 5 - Droit de rétractation
          </h2>
          <p>
            Conformément à l'article L221-28 du Code de la consommation, vous
            disposez d'un délai de 14 jours à compter de la souscription pour
            exercer votre droit de rétractation sans avoir à justifier de motifs
            ni à payer de pénalités.
          </p>
          <p class="mt-4">
            Pour exercer ce droit, contactez-nous à :
            <a
              href="mailto:contact&#64;figures-de-style.fr"
              class="text-blue-400"
              >contact&#64;figures-de-style.fr</a
            >
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 6 - Résiliation
          </h2>
          <p>
            Les abonnements ne sont pas renouvelés automatiquement. À
            l'expiration de votre abonnement, vous revenez automatiquement au
            plan gratuit.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 7 - Responsabilité
          </h2>
          <p>
            Nous nous engageons à fournir un service de qualité mais ne pouvons
            garantir une disponibilité 100% du site. Nous ne saurions être tenus
            responsables des dommages résultant d'une interruption du service.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 8 - Propriété intellectuelle
          </h2>
          <p>
            Tous les contenus présents sur le site (textes, images, exercices)
            sont protégés par le droit d'auteur. Toute reproduction sans
            autorisation est interdite.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold text-dark-text mb-4">
            Article 9 - Litiges
          </h2>
          <p>
            En cas de litige, une solution amiable sera recherchée avant toute
            action judiciaire. À défaut, les tribunaux français seront seuls
            compétents.
          </p>
        </section>
      </div>
    </app-legal>
  `,
})
export class CgvComponent {}
