import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ApiAuthService } from "../services/api-auth.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthService,
		private apiAuthService: ApiAuthService,
		private router: Router,
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		// Ajouter le token JWT à toutes les requêtes
		const token = this.apiAuthService.getToken();

		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				// Si 401 Unauthorized, déconnecter l'utilisateur
				if (error.status === 401) {
					this.authService.logout();
					this.router.navigate(["/auth"]);
				}

				return throwError(() => error);
			}),
		);
	}
}
