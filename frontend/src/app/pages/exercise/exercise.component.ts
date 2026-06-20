import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModuleDataService } from '../../services/module-data.service';

export interface Question {
  id?: string;
  question: string;
  reponses: string[];
  correct: number;
  indice?: string;
  explication?: string;
}

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent implements OnInit {
  moduleId: string = '';
  moduleTitre: string = '';
  moduleType: string = '';

  allQuestions: Question[] = [];
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion?: Question;
  selectedAnswer: string = '';
  showHint: boolean = false;
  answeredQuestions: Map<number, { answer: string; isCorrect: boolean }> = new Map();
  showResult: boolean = false;
  score: number = 0;

  nbQuestionsOptions: number[] = [5, 10, 20, 50, 100, 0];
  nbQuestions: number = 10;
  isLoading: boolean = false;
  errorMessage: string = '';

  get isRevision(): boolean {
    return this.moduleType === 'revision';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleDataService: ModuleDataService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Exercice — Figures de style');
    this.route.params.subscribe(async (params) => {
      this.moduleId = params['id'];
      await this.loadModule(this.moduleId);
    });
  }

  async loadModule(moduleId: string) {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const { module, questions } = await this.moduleDataService.getQuestionsForModule(moduleId);
      this.moduleTitre = module.titre;
      this.moduleType = module.type;
      this.titleService.setTitle(`Exercice : ${module.titre} — Figures de style`);
      this.allQuestions = this.shuffleArray(questions);
      this.setNbQuestions(this.nbQuestions);
    } catch (e) {
      this.errorMessage = 'Impossible de charger le module. Le serveur est peut-être hors ligne.';
      this.questions = [];
    } finally {
      this.isLoading = false;
    }
  }

  setNbQuestions(count: number) {
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
    const isCorrect = this.selectedAnswer === this.currentQuestion.reponses[this.currentQuestion.correct];
    this.answeredQuestions.set(this.currentQuestionIndex, { answer: this.selectedAnswer, isCorrect });
    if (isCorrect) this.score++;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
      this.selectedAnswer = '';
      this.showHint = false;
    } else {
      this.showResult = true;
      this.moduleDataService.saveModuleScore(this.moduleId, this.score, this.questions.length);
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
