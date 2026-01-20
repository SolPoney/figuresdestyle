import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module, ExerciceModule, Question } from '../models/module.model';
import { Observable, of } from 'rxjs';

interface ModuleScore {
  moduleId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private readonly STORAGE_KEY = 'figures_de_style_scores';

  constructor(private http: HttpClient) {}

  /**
   * Charge dynamiquement la liste des modules depuis le fichier JSON de config
   */
  getModules(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/modules-config.json');
  }

  /**
   * Charge dynamiquement un module par son index (id = index+1)
   */
  getModuleById(id: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.getModules().subscribe({
        next: (modules) => {
          const module = modules[parseInt(id, 10) - 1];
          observer.next(module);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  /**
   * Mélange les choix de la question et recalcule l'index de la bonne réponse
   */
  prepareQuestion(question: any) {
    const shuffledChoices = this.shuffleArray([...question.choices]);
    return {
      ...question,
      choices: shuffledChoices,
      correct: shuffledChoices.indexOf(question.correctAnswer),
    };
  }

  async getExercicesByModuleId(moduleId: string): Promise<any[]> {
    // Pour les modules de révision, combiner les questions des modules requis

    // Pour les modules normaux, retourner questions mélangées
    const questions = await this.loadQuestionsFromJson(moduleId);
    const selected = this.shuffleArray([...questions]).slice(0, 10);
    return selected.map((q) => this.prepareQuestion(q));
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  saveModuleScore(
    moduleId: string,
    score: number,
    totalQuestions: number
  ): void {
    const scores = this.getModuleScores();
    const percentage = Math.round((score / totalQuestions) * 100);

    const existingIndex = scores.findIndex((s) => s.moduleId === moduleId);
    const newScore: ModuleScore = {
      moduleId,
      score,
      totalQuestions,
      percentage,
      date: new Date(),
    };

    if (existingIndex >= 0) {
      scores[existingIndex] = newScore;
    } else {
      scores.push(newScore);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scores));
  }

  getModuleScores(): ModuleScore[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  getModuleScore(moduleId: string): ModuleScore | undefined {
    return this.getModuleScores().find((s) => s.moduleId === moduleId);
  }

  resetAllScores(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private async loadQuestionsFromJson(moduleId: string): Promise<any[]> {
    // Implémentation du chargement des questions depuis les fichiers JSON externes
    // Doit retourner une promesse résolue avec le tableau de questions
    return new Promise((resolve, reject) => {
      // Simulation d'un chargement asynchrone
      setTimeout(() => {
        // Exemple de données, remplacer par le chargement réel depuis les fichiers JSON
        const exampleQuestions = [
          {
            id: '1',
            text: 'Quelle est la figure de style ?',
            choices: ['Métaphore', 'Comparaison', 'Métonymie', 'Synecdoque'],
            correctAnswer: 'Métaphore',
          },
          {
            id: '2',
            text: 'Donnez un exemple de comparaison.',
            choices: [
              'Les ailes du temps nous emportent',
              'Elle est fragile comme un oiseau',
              'Boire un verre',
              'Avoir un toit',
            ],
            correctAnswer: 'Elle est fragile comme un oiseau',
          },
        ];

        resolve(exampleQuestions);
      }, 1000);
    });
  }
}
