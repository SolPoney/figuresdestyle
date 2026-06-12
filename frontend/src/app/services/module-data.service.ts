import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Module } from "../models/module.model";

@Injectable({ providedIn: "root" })
export class ModuleDataService {
	constructor(private http: HttpClient) {}

	/**
	 * Charge dynamiquement un module par son id (ex: '1')
	 */
	getModuleById(id: string): Observable<Module | undefined> {
		// Si le module-X.json existe, on le charge, sinon on retourne undefined
		return new Observable<Module | undefined>((observer) => {
			this.http.get<Module>(`assets/data/module-${id}.json`).subscribe({
				next: (mod) => observer.next(mod),
				error: () => observer.next(undefined),
				complete: () => observer.complete(),
			});
		});
	}

	/**
	 * Charge la liste des modules disponibles (à adapter si besoin)
	 */
	getAllModules(ids: string[]): Observable<Module[]> {
		return new Observable<Module[]>((observer) => {
			const requests = ids.map((id) => this.getModuleById(id));
			Promise.all(requests.map((req) => req.toPromise()))
				.then((modules) => {
					observer.next(modules.filter((m): m is Module => m !== undefined));
					observer.complete();
				})
				.catch((err) => observer.error(err));
		});
	}

	// Ajout d'une méthode pour sauvegarder le score d'un module
	saveModuleScore(moduleId: string, score: number, totalQuestions: number) {
		// À adapter selon la logique de sauvegarde souhaitée (localStorage, backend, etc.)
		const scores = JSON.parse(localStorage.getItem("moduleScores") || "[]");
		const existing = scores.find((s: any) => s.moduleId === moduleId);
		if (existing) {
			existing.score = score;
			existing.totalQuestions = totalQuestions;
		} else {
			scores.push({ moduleId, score, totalQuestions });
		}
		localStorage.setItem("moduleScores", JSON.stringify(scores));
	}
}
