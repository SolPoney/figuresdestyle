import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModuleDataService } from '../../services/module-data.service';
import { Question, Module } from '../../models/module.model';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent implements OnInit {
  moduleId: string = '';
  module?: Module;
  questions: Question[] = [];
  allQuestions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion?: Question;
  selectedAnswer: string = '';
  showHint: boolean = false;
  answeredQuestions: Map<number, { answer: string; isCorrect: boolean }> =
    new Map();
  showResult: boolean = false;
  score: number = 0;
  modulesConfig: any[] = [];
  nbQuestionsOptions: number[] = [5, 10, 20, 50, 100, 0];
  nbQuestions: number = 10;
  isRevision: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleDataService: ModuleDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.moduleId = params['id'];
      await this.loadModulesConfig();
      await this.loadQuestionsFromConfig(this.moduleId);
    });
  }

  async loadModulesConfig() {
    const resp = await fetch('assets/data/modules-config.json');
    this.modulesConfig = await resp.json();
  }

  async loadQuestionsFromConfig(moduleId: string) {
    const idx = parseInt(moduleId, 10) - 1;
    const config = this.modulesConfig[idx];
    if (!config) {
      this.questions = [];
      return;
    }
    this.isRevision = config.type === 'revision';
    let allQuestions: Question[] = [];
    for (const fig of config.figures) {
      try {
        const resp = await fetch(`assets/data/${fig}.json`);
        const data = await resp.json();
        if (data.questions) {
          allQuestions = allQuestions.concat(data.questions);
        }
      } catch (e) {}
    }
    this.allQuestions = this.shuffleArray(allQuestions);
    this.setNbQuestions(this.nbQuestions);
  }

  setNbQuestions(count: number) {
    // 0 = tout
    if (count === 0 || count > this.allQuestions.length) {
      this.questions = [...this.allQuestions];
    } else {
      this.questions = this.allQuestions.slice(0, count);
    }
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[0];
    this.answeredQuestions.clear();
    this.showResult = false;
    this.score = 0;
    this.selectedAnswer = '';
    this.showHint = false;
  }

  // Ancienne méthode supprimée, tout est géré par loadQuestionsFromConfig et setNbQuestions

  shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  toggleHint(): void {
    this.showHint = !this.showHint;
  }

  submitAnswer(): void {
    if (!this.selectedAnswer || !this.currentQuestion) return;

    const isCorrect =
      this.selectedAnswer ===
      this.currentQuestion.reponses[this.currentQuestion.correct];
    this.answeredQuestions.set(this.currentQuestionIndex, {
      answer: this.selectedAnswer,
      isCorrect,
    });

    if (isCorrect) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedAnswer = '';
      this.showHint = false;
    } else {
      this.showResult = true;
      // Sauvegarder le score
      this.moduleDataService.saveModuleScore(
        this.moduleId,
        this.score,
        this.questions.length
      );
    }
  }

  getScorePercentage(): number {
    if (this.questions.length === 0) return 0;
    return Math.round((this.score / this.questions.length) * 100);
  }

  isAnswered(): boolean {
    return this.answeredQuestions.has(this.currentQuestionIndex);
  }

  getCurrentAnswer(): { answer: string; isCorrect: boolean } | undefined {
    return this.answeredQuestions.get(this.currentQuestionIndex);
  }

  restartExercise(): void {
    this.setNbQuestions(this.nbQuestions);
  }

  goToModule(): void {
    this.router.navigate(['/module', this.moduleId]);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
