import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TeacherService } from '../../services/teacher.service';
import { ModuleService } from '../../services/module.service';
import { User } from '../../models/user.model';
import { Student, StudentProgress } from '../../models/student.model';

interface StudentWithProgress extends Student {
  averageScore: number;
  completedModules: number;
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css',
})
export class TeacherDashboardComponent implements OnInit {
  currentUser: User | null = null;
  students: StudentWithProgress[] = [];
  selectedStudent: StudentWithProgress | null = null;
  stats = {
    totalStudents: 0,
    activeStudents: 0,
    averageScore: 0,
  };

  // Formulaire ajout élève
  showAddStudentForm = false;
  newStudentEmail = '';
  newStudentName = '';

  // Vue détaillée
  studentModuleScores: {
    moduleId: string;
    score: number | null;
    moduleName: string;
  }[] = [];

  constructor(
    private authService: AuthService,
    private teacherService: TeacherService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user && user.plan === 'school') {
        this.loadDashboardData();
      }
    });
  }

  loadDashboardData(): void {
    if (!this.currentUser) return;

    const stats = this.teacherService.getTeacherStats(this.currentUser.id);
    this.stats = {
      totalStudents: stats.totalStudents,
      activeStudents: stats.activeStudents,
      averageScore: stats.averageScore,
    };

    // Charger les élèves avec leur progression
    this.students = stats.students.map((student) => {
      const progress = this.teacherService.getStudentProgress(student.id);
      const averageScore =
        progress.length > 0
          ? progress.reduce((sum, p) => sum + p.score, 0) / progress.length
          : 0;

      return {
        ...student,
        averageScore: Math.round(averageScore),
        completedModules: progress.length,
      };
    });
  }

  addStudent(): void {
    if (!this.currentUser || !this.newStudentEmail || !this.newStudentName)
      return;

    // Vérifier la limite de 30 élèves
    if (this.students.length >= 30) {
      alert('Limite de 30 élèves atteinte pour le plan École');
      return;
    }

    this.teacherService.addStudent(
      this.currentUser.id,
      this.newStudentEmail,
      this.newStudentName
    );

    this.newStudentEmail = '';
    this.newStudentName = '';
    this.showAddStudentForm = false;
    this.loadDashboardData();
  }

  removeStudent(studentId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      this.teacherService.removeStudent(studentId);
      this.loadDashboardData();
      if (this.selectedStudent?.id === studentId) {
        this.selectedStudent = null;
      }
    }
  }

  viewStudentDetails(student: StudentWithProgress): void {
    this.selectedStudent = student;
    // Charger les scores par module (asynchrone)
    this.moduleService.getModules().subscribe((modules: any[]) => {
      this.studentModuleScores = modules.map((module: any) => ({
        moduleId: module.id,
        moduleName: module.titre,
        score: this.teacherService.getStudentModuleScore(student.id, module.id),
      }));
    });
  }

  closeStudentDetails(): void {
    this.selectedStudent = null;
    this.studentModuleScores = [];
  }

  exportResults(): void {
    if (!this.currentUser) return;
    this.teacherService.downloadCSV(this.currentUser.id);
  }

  getScoreColor(score: number | null): string {
    if (score === null) return 'text-gray-400';
    if (score >= 70) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  }

  getScoreBadgeClass(score: number | null): string {
    if (score === null) return 'bg-gray-600';
    if (score >= 70) return 'bg-green-600';
    if (score >= 50) return 'bg-yellow-600';
    return 'bg-red-600';
  }
}
