import { Routes } from "@angular/router";
import { premiumGuard } from "./guards/premium.guard";
import { teacherGuard } from "./guards/teacher.guard";
import { AdminComponent } from "./pages/admin/admin.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ExerciseComponent } from "./pages/exercise/exercise.component";
import { HomeComponent } from "./pages/home/home.component";
import { AccessibiliteComponent } from "./pages/legal/accessibilite.component";
import { CgvComponent } from "./pages/legal/cgv.component";
import { MentionsLegalesComponent } from "./pages/legal/mentions-legales.component";
import { PolitiqueConfidentialiteComponent } from "./pages/legal/politique-confidentialite.component";
import { ModuleComponent } from "./pages/module/module.component";
import { TeacherDashboardComponent } from "./pages/teacher-dashboard/teacher-dashboard.component";

export const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "auth", component: AuthComponent },
	{ path: "contact", component: ContactComponent },
	{ path: "admin", component: AdminComponent },
	{ path: "mentions-legales", component: MentionsLegalesComponent },
	{
		path: "politique-confidentialite",
		component: PolitiqueConfidentialiteComponent,
	},
	{ path: "accessibilite", component: AccessibiliteComponent },
	{ path: "cgv", component: CgvComponent },
	{
		path: "teacher-dashboard",
		component: TeacherDashboardComponent,
		canActivate: [teacherGuard],
	},
	{
		path: "module/:id",
		component: ModuleComponent,
		canActivate: [premiumGuard],
	},
	{
		path: "exercise/:id",
		component: ExerciseComponent,
		canActivate: [premiumGuard],
	},
	{ path: "**", redirectTo: "" },
];
