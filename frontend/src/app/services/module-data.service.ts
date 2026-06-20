import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

export interface FigureDetail {
  id: string;
  titre: string;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    reponses: string[];
    correct: number;
  }>;
}

export interface ModuleSummary {
  id: string;
  titre: string;
  description: string;
  type: string;
  ordre: number;
  figures: string[];
}

export interface ModuleDetail {
  id: string;
  titre: string;
  description: string;
  type: string;
  figures: FigureDetail[];
}

@Injectable({ providedIn: 'root' })
export class ModuleDataService {
  private readonly api = '/api/modules';

  constructor(private http: HttpClient) {}

  /** Liste tous les modules (pour la page d'accueil, etc.) */
  getAllModulesSummary(): Observable<ModuleSummary[]> {
    return this.http.get<ModuleSummary[]>(this.api);
  }

  /** Détail d'un module avec ses figures et questions */
  getModuleById(id: string): Observable<ModuleDetail> {
    return this.http.get<ModuleDetail>(`${this.api}/${id}`);
  }

  /** Une figure seule avec ses questions */
  getFigure(slug: string): Observable<FigureDetail> {
    return this.http.get<FigureDetail>(`${this.api}/figures/${slug}`);
  }

  /** Charge toutes les questions d'un module (pour l'exercise component) */
  async getQuestionsForModule(moduleId: string) {
    const mod = await firstValueFrom(this.getModuleById(moduleId));
    const questions = mod.figures.flatMap((fig) => fig.questions);
    return { module: mod, questions };
  }

  saveModuleScore(moduleId: string, score: number, totalQuestions: number) {
    const key = 'figures_de_style_scores';
    const scores = JSON.parse(localStorage.getItem(key) || '[]');
    const percentage = Math.round((score / totalQuestions) * 100);
    const existing = scores.find((s: any) => s.moduleId === moduleId);
    const entry = { moduleId, score, totalQuestions, percentage, date: new Date() };
    if (existing) {
      Object.assign(existing, entry);
    } else {
      scores.push(entry);
    }
    localStorage.setItem(key, JSON.stringify(scores));
  }
}
