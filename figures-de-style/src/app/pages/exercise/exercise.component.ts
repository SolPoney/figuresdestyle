import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../../services/module.service';
import { Question, Module } from '../../models/module.model';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css',
})
export class ExerciseComponent implements OnInit {
  moduleId: string = '';
  module?: Module;
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion?: Question;
  selectedAnswer: string = '';
  showHint: boolean = false;
  answeredQuestions: Map<number, { answer: string; isCorrect: boolean }> =
    new Map();
  showResult: boolean = false;
  score: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.moduleId = params['id'];
      this.module = this.moduleService.getModuleById(this.moduleId);
      this.questions = this.moduleService.getExercicesByModuleId(this.moduleId);

      if (this.questions.length > 0) {
        this.currentQuestion = this.questions[0];
      }
    });
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
      this.moduleService.saveModuleScore(
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
    this.currentQuestionIndex = 0;
    this.selectedAnswer = '';
    this.showHint = false;
    this.answeredQuestions.clear();
    this.showResult = false;
    this.score = 0;
    // Recharger les questions (pour avoir une nouvelle randomisation)
    this.questions = this.moduleService.getExercicesByModuleId(this.moduleId);
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions[0];
    }
  }

  goToModule(): void {
    this.router.navigate(['/module', this.moduleId]);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
