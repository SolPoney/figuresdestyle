import { CommonModule } from "@angular/common";
import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Module } from "../../models/module.model";
import { ModuleDataService } from "../../services/module-data.service";

@Component({
	selector: "app-module",
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: "./module.component.html",
	styleUrl: "./module.component.css",
})
export class ModuleComponent implements OnInit {
	module?: Module;
	moduleId: string = "";

	isFigureObject(figure: any): boolean {
		return figure && typeof figure === "object" && "nom" in figure;
	}

	constructor(
		private route: ActivatedRoute,
		private moduleDataService: ModuleDataService,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.moduleId = params["id"];
			this.moduleDataService.getModuleById(this.moduleId).subscribe({
				next: (mod) => (this.module = mod),
				error: () => (this.module = undefined),
			});
		});
	}
}
