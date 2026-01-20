import { inject } from "@angular/core";
import {
	type ActivatedRouteSnapshot,
	type CanActivateFn,
	Router,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

export const premiumGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const moduleId = route.paramMap.get("id");

	if (!moduleId) {
		router.navigate(["/"]);
		return false;
	}

	// Vérifier si l'utilisateur peut accéder à ce module
	if (authService.canAccessModule(moduleId)) {
		return true;
	}

	// Rediriger vers la page d'authentification si module verrouillé
	router.navigate(["/auth"]);
	return false;
};
