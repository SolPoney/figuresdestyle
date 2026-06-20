import { Injectable } from "@angular/core";
import { ConfirmDialogService } from "../components/confirm-dialog/confirm-dialog.service";
import { environment } from "../../environments/environment";
import { ApiPaymentService } from "./api-payment.service";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root",
})
export class PaymentService {
	constructor(
		private authService: AuthService,
		private apiPaymentService: ApiPaymentService,
		private confirmDialog: ConfirmDialogService,
	) {}

	async createCheckoutSession(plan: "premium" | "school"): Promise<void> {
		const user = this.authService.currentUserValue;

		if (!user) {
			await this.confirmDialog.open({
				title: "Connexion requise",
				message: "Vous devez être connecté pour effectuer un paiement.",
				confirmLabel: "OK",
				cancelLabel: "",
				variant: "primary",
			});
			return;
		}

		// En mode développement sans backend, simulation
		if (!environment.production && !environment.apiUrl.includes("railway")) {
			const ok = await this.confirmDialog.open({
				title: plan === "premium" ? "Passer Premium" : "Plan École",
				message: plan === "premium"
					? "Passer au plan Premium pour 9,99 €/mois ?"
					: "Passer au plan École pour 199 €/an ?",
				confirmLabel: "Confirmer",
				cancelLabel: "Annuler",
				variant: "primary",
			});

			if (ok) {
				if (plan === "premium") {
					this.authService.upgradeToPremium();
					await this.confirmDialog.open({
						title: "Paiement réussi",
						message: "Vous avez maintenant accès à tous les modules Premium.",
						confirmLabel: "Super !",
						cancelLabel: "",
						variant: "primary",
					});
				} else {
					this.authService.upgradeToSchool();
					await this.confirmDialog.open({
						title: "Abonnement École activé",
						message: "Vous pouvez maintenant gérer jusqu'à 30 élèves.",
						confirmLabel: "Super !",
						cancelLabel: "",
						variant: "primary",
					});
				}
			}
			return;
		}

		// En production, utiliser l'API backend
		try {
			await this.apiPaymentService.processPayment(plan);
		} catch (error) {
			console.error("Erreur paiement:", error);
			await this.confirmDialog.open({
				title: "Erreur de paiement",
				message: "Une erreur est survenue lors du paiement. Veuillez réessayer.",
				confirmLabel: "OK",
				cancelLabel: "",
				variant: "danger",
			});
		}
	}

	getPriceLabel(plan: "premium" | "school"): string {
		return plan === "premium" ? "9,99€" : "199€/an";
	}
}
