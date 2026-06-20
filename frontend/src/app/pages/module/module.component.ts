import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ModuleDataService, ModuleDetail } from '../../services/module-data.service';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css',
})
export class ModuleComponent implements OnInit {
  module?: ModuleDetail;
  moduleId: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private moduleDataService: ModuleDataService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.moduleId = params['id'];
      this.loadModule(this.moduleId);
    });
  }

  loadModule(id: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.moduleDataService.getModuleById(id).subscribe({
      next: (mod) => {
        this.module = mod;
        this.titleService.setTitle(`${mod.titre} — Figures de style`);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Module introuvable ou serveur hors ligne.';
        this.isLoading = false;
      },
    });
  }
}
