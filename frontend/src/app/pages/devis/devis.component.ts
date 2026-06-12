import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css'],
})
export class DevisComponent {
  prixTotal: number | null = null;
  dernierFormulaire: any = null;
  messageEmail: string = '';

  constructor(private http: HttpClient) {}

  onSubmit(form?: any) {
    // Calcul automatique du prix
    const nombreEleves = form?.value?.nombreEleves || 0;
    const options = form?.value?.options || [];

    let prix = 100 + nombreEleves * 2;

    if (options.includes('premium')) prix += 200;
    if (options.includes('accompagnement')) prix += 150;
    if (options.includes('atelier')) prix += 300;

    this.prixTotal = prix;
    this.dernierFormulaire = form?.value;
    this.messageEmail = '';
  }

  genererPDF() {
    const doc = new jsPDF();
    const f = this.dernierFormulaire || {};

    doc.setFontSize(18);
    doc.text('Devis établissement scolaire', 10, 15);

    doc.setFontSize(12);
    doc.text(`Nom de l'établissement : ${f.nomEtablissement || ''}`, 10, 30);
    doc.text(`Contact : ${f.contact || ''}`, 10, 40);
    doc.text(`Email : ${f.email || ''}`, 10, 50);
    doc.text(`Téléphone : ${f.telephone || ''}`, 10, 60);
    doc.text(`Nombre d'élèves : ${f.nombreEleves || ''}`, 10, 70);
    doc.text(`Options : ${(f.options || []).join(', ')}`, 10, 80);
    doc.text(`Prix estimé : ${this.prixTotal ?? ''} €`, 10, 100);

    doc.save('devis-ecole.pdf');
  }

  envoyerDevisParEmail() {
    if (!this.dernierFormulaire || !this.prixTotal) {
      this.messageEmail = "Veuillez d'abord remplir le formulaire.";
      return;
    }

    this.messageEmail = 'Envoi en cours...';

    this.http
      .post('/api/devis', { ...this.dernierFormulaire, prix: this.prixTotal })
      .subscribe({
        next: () => {
          this.messageEmail =
            'Votre demande de devis a bien été envoyée. Vous recevrez un email sous peu.';
        },
        error: () => {
          this.messageEmail =
            "Erreur lors de l'envoi du devis. Veuillez réessayer plus tard.";
        },
      });
  }
}
