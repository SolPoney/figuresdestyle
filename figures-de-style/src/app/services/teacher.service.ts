import { Injectable } from '@angular/core';
import { Student, StudentProgress } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private readonly STUDENTS_KEY = 'figures_students';
  private readonly STUDENT_PROGRESS_KEY = 'figures_student_progress';

  constructor() {}

  // Gestion des élèves
  getStudents(teacherId: string): Student[] {
    const stored = localStorage.getItem(this.STUDENTS_KEY);
    if (!stored) return [];

    try {
      const allStudents = JSON.parse(stored) as Student[];
      return allStudents.filter((s) => s.teacherId === teacherId);
    } catch {
      return [];
    }
  }

  addStudent(teacherId: string, email: string, name: string): Student {
    const students = this.getAllStudents();

    const newStudent: Student = {
      id: this.generateId(),
      email,
      name,
      teacherId,
      createdAt: new Date(),
      lastActive: new Date(),
    };

    students.push(newStudent);
    localStorage.setItem(this.STUDENTS_KEY, JSON.stringify(students));
    return newStudent;
  }

  removeStudent(studentId: string): void {
    const students = this.getAllStudents().filter((s) => s.id !== studentId);
    localStorage.setItem(this.STUDENTS_KEY, JSON.stringify(students));

    // Supprimer aussi la progression
    const progress = this.getAllProgress().filter(
      (p) => p.studentId !== studentId
    );
    localStorage.setItem(this.STUDENT_PROGRESS_KEY, JSON.stringify(progress));
  }

  updateStudent(student: Student): void {
    const students = this.getAllStudents();
    const index = students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      localStorage.setItem(this.STUDENTS_KEY, JSON.stringify(students));
    }
  }

  // Progression des élèves
  getStudentProgress(studentId: string): StudentProgress[] {
    const allProgress = this.getAllProgress();
    return allProgress.filter((p) => p.studentId === studentId);
  }

  getStudentModuleScore(studentId: string, moduleId: string): number | null {
    const progress = this.getAllProgress().find(
      (p) => p.studentId === studentId && p.moduleId === moduleId
    );
    return progress ? progress.score : null;
  }

  saveStudentProgress(progress: StudentProgress): void {
    const allProgress = this.getAllProgress();
    const existingIndex = allProgress.findIndex(
      (p) =>
        p.studentId === progress.studentId && p.moduleId === progress.moduleId
    );

    if (existingIndex !== -1) {
      allProgress[existingIndex] = progress;
    } else {
      allProgress.push(progress);
    }

    localStorage.setItem(
      this.STUDENT_PROGRESS_KEY,
      JSON.stringify(allProgress)
    );
  }

  // Statistiques
  getTeacherStats(teacherId: string) {
    const students = this.getStudents(teacherId);
    const totalStudents = students.length;

    // Élèves actifs (dernière activité < 7 jours)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const activeStudents = students.filter(
      (s) => s.lastActive && new Date(s.lastActive) > weekAgo
    ).length;

    // Score moyen
    const allProgress = this.getAllProgress();
    const studentProgress = allProgress.filter((p) =>
      students.some((s) => s.id === p.studentId)
    );

    const averageScore =
      studentProgress.length > 0
        ? studentProgress.reduce((sum, p) => sum + p.score, 0) /
          studentProgress.length
        : 0;

    return {
      totalStudents,
      activeStudents,
      averageScore: Math.round(averageScore),
      students,
    };
  }

  // Export des résultats en CSV
  exportToCSV(teacherId: string): string {
    const students = this.getStudents(teacherId);
    const allProgress = this.getAllProgress();

    let csv = 'Nom,Email,Module,Score,Date de complétion\n';

    students.forEach((student) => {
      const progress = allProgress.filter((p) => p.studentId === student.id);

      if (progress.length === 0) {
        csv += `${student.name},${student.email},Aucun,0,N/A\n`;
      } else {
        progress.forEach((p) => {
          csv += `${student.name},${student.email},Module ${p.moduleId},${
            p.score
          }%,${new Date(p.completedAt).toLocaleDateString()}\n`;
        });
      }
    });

    return csv;
  }

  downloadCSV(teacherId: string): void {
    const csv = this.exportToCSV(teacherId);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `resultats_eleves_${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Utilitaires privés
  private getAllStudents(): Student[] {
    const stored = localStorage.getItem(this.STUDENTS_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as Student[];
    } catch {
      return [];
    }
  }

  private getAllProgress(): StudentProgress[] {
    const stored = localStorage.getItem(this.STUDENT_PROGRESS_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as StudentProgress[];
    } catch {
      return [];
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
