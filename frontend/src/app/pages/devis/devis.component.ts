import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import jsPDF from "jspdf";

@Component({
	selector: "app-devis",
	standalone: true,
	imports: [CommonModule, FormsModule, RouterModule],
	templateUrl: "./devis.component.html",
	styleUrls: ["./devis.component.css"],
})
export class DevisComponent {
	// Champs du formulaire
	nomEtablissement = "";
	contact = "";
	email = "";
	telephone = "";
	nombreEleves = 30;
	optionPremium = false;
	optionAccompagnement = false;
	optionAtelier = false;

	// État
	prixTotal: number | null = null;
	messageEmail = "";
	isLoading = false;
	isSuccess = false;
	isError = false;

	constructor(private http: HttpClient) {}

	get prixEstime(): number {
		let prix = 100 + (this.nombreEleves || 0) * 2;
		if (this.optionPremium) prix += 200;
		if (this.optionAccompagnement) prix += 150;
		if (this.optionAtelier) prix += 300;
		return prix;
	}

	private get formData() {
		const options: string[] = [];
		if (this.optionPremium) options.push("premium");
		if (this.optionAccompagnement) options.push("accompagnement");
		if (this.optionAtelier) options.push("atelier");
		return {
			nomEtablissement: this.nomEtablissement,
			contact: this.contact,
			email: this.email,
			telephone: this.telephone,
			nombreEleves: this.nombreEleves,
			options,
		};
	}

	onSubmit() {
		this.prixTotal = this.prixEstime;
		this.isLoading = true;
		this.isSuccess = false;
		this.isError = false;
		this.messageEmail = "";

		this.http
			.post("/api/devis", { ...this.formData, prix: this.prixTotal })
			.subscribe({
				next: () => {
					this.isLoading = false;
					this.isSuccess = true;
					this.messageEmail =
						"Votre demande de devis a bien été envoyée. Vous recevrez un email de confirmation sous peu.";
				},
				error: () => {
					this.isLoading = false;
					this.isError = true;
					this.messageEmail =
						"Erreur lors de l'envoi. Contactez-nous directement à contact@figures-de-style.fr";
				},
			});
	}

	genererPDF() {
		if (!this.prixTotal) return;
		const doc = new jsPDF();
		const f = this.formData;
		doc.setFontSize(18);
		doc.text("Devis établissement scolaire", 10, 15);
		doc.setFontSize(12);
		doc.text(`Nom de l'établissement : ${f.nomEtablissement}`, 10, 30);
		doc.text(`Contact : ${f.contact}`, 10, 40);
		doc.text(`Email : ${f.email}`, 10, 50);
		doc.text(`Téléphone : ${f.telephone}`, 10, 60);
		doc.text(`Nombre d'élèves : ${f.nombreEleves}`, 10, 70);
		doc.text(`Options : ${f.options.join(", ")}`, 10, 80);
		doc.text(`Prix estimé : ${this.prixTotal} €`, 10, 100);
		doc.save("devis-ecole.pdf");
	}
}
