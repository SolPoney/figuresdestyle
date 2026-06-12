import { User } from "./user.model";

export interface Student {
	id: string;
	email: string;
	name: string;
	teacherId: string;
	createdAt: Date;
	lastActive?: Date;
}

export interface StudentProgress {
	studentId: string;
	moduleId: string;
	score: number;
	attempts: number;
	completedAt: Date;
}

export interface TeacherDashboardData {
	teacher: User;
	students: Student[];
	totalStudents: number;
	activeStudents: number;
	averageScore: number;
}
