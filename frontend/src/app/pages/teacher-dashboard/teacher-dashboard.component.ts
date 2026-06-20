import { CommonModule } from "@angular/common";
import { Component, ElementRef, type OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ConfirmDialogService } from "../../components/confirm-dialog/confirm-dialog.service";
import { Student, StudentProgress } from "../../models/student.model";
import { User } from "../../models/user.model";
import { AuthService } from "../../services/auth.service";
import { ModuleService } from "../../services/module.service";
import { TeacherService } from "../../services/teacher.service";

interface StudentWithProgress extends Student {
	averageScore: number;
	completedModules: number;
}

@Component({
	selector: "app-teacher-dashboard",
	standalone: true,
	imports: [CommonModule, RouterModule, FormsModule],
	templateUrl: "./teacher-dashboard.component.html",
	styleUrl: "./teacher-dashboard.component.css",
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
	newStudentEmail = "";
	newStudentName = "";

	// Vue détaillée
	studentModuleScores: {
		moduleId: string;
		score: number | null;
		moduleName: string;
	}[] = [];

	private modalTrigger: HTMLElement | null = null;

	constructor(
		private authService: AuthService,
		private teacherService: TeacherService,
		private moduleService: ModuleService,
		private confirmDialog: ConfirmDialogService,
	) {}

	ngOnInit(): void {
		this.authService.currentUser.subscribe((user: User | null) => {
			this.currentUser = user;
			if (user && user.plan === "school") {
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

	async addStudent(): Promise<void> {
		if (!this.currentUser || !this.newStudentEmail || !this.newStudentName)
			return;

		// Vérifier la limite de 30 élèves
		if (this.students.length >= 30) {
			await this.confirmDialog.open({
				title: "Limite atteinte",
				message: "Vous avez atteint la limite de 30 élèves pour le plan École.",
				confirmLabel: "OK",
				cancelLabel: "",
				variant: "primary",
			});
			return;
		}

		this.teacherService.addStudent(
			this.currentUser.id,
			this.newStudentEmail,
			this.newStudentName,
		);

		this.newStudentEmail = "";
		this.newStudentName = "";
		this.showAddStudentForm = false;
		this.loadDashboardData();
	}

	async removeStudent(studentId: string): Promise<void> {
		const ok = await this.confirmDialog.open({
			title: "Supprimer l'élève",
			message: "Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élève ?",
			confirmLabel: "Supprimer",
			cancelLabel: "Annuler",
			variant: "danger",
		});
		if (ok) {
			this.teacherService.removeStudent(studentId);
			this.loadDashboardData();
			if (this.selectedStudent?.id === studentId) {
				this.selectedStudent = null;
			}
		}
	}

	viewStudentDetails(student: StudentWithProgress, event?: MouseEvent): void {
		this.modalTrigger = event?.currentTarget as HTMLElement ?? null;
		this.selectedStudent = student;
		// Charger les scores par module (asynchrone)
		this.moduleService.getModules().subscribe((modules: any[]) => {
			this.studentModuleScores = modules.map((module: any) => ({
				moduleId: module.id,
				moduleName: module.titre,
				score: this.teacherService.getStudentModuleScore(student.id, module.id),
			}));
		});
		// Focus le bouton de fermeture après rendu
		setTimeout(() => {
			const closeBtn = document.querySelector<HTMLElement>('#student-modal [data-modal-close]');
			closeBtn?.focus();
		}, 50);
	}

	closeStudentDetails(): void {
		this.selectedStudent = null;
		this.studentModuleScores = [];
		this.modalTrigger?.focus();
		this.modalTrigger = null;
	}

	onModalKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			this.closeStudentDetails();
			return;
		}
		if (event.key !== 'Tab') return;

		const modal = document.getElementById('student-modal');
		if (!modal) return;

		const focusable = Array.from(
			modal.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
			)
		);
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === first) {
				event.preventDefault();
				last.focus();
			}
		} else {
			if (document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	exportResults(): void {
		if (!this.currentUser) return;
		this.teacherService.downloadCSV(this.currentUser.id);
	}

	getScoreColor(score: number | null): string {
		if (score === null) return "text-gray-400";
		if (score >= 70) return "text-green-400";
		if (score >= 50) return "text-yellow-400";
		return "text-red-400";
	}

	getScoreBadgeClass(score: number | null): string {
		if (score === null) return "bg-gray-600";
		if (score >= 70) return "bg-green-600";
		if (score >= 50) return "bg-yellow-600";
		return "bg-red-600";
	}
}
