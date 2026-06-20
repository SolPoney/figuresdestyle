import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { CookieBannerComponent } from "./components/cookie-banner/cookie-banner.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, FooterComponent, NavbarComponent, ConfirmDialogComponent, CookieBannerComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "figures-de-style";
}
