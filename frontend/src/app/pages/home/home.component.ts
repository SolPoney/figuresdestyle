import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ModuleDataService, ModuleSummary } from '../../services/module-data.service';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  modules: ModuleSummary[] = [];
  currentUser: User | null = null;

  constructor(
    private moduleDataService: ModuleDataService,
    private moduleService: ModuleService,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Accueil — Figures de style');
    this.moduleDataService.getAllModulesSummary().subscribe({
      next: (modules) => (this.modules = modules),
      error: () => (this.modules = []),
    });
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  getModuleScore(moduleId: string): number | null {
    const score = this.moduleService.getModuleScore(moduleId);
    return score ? score.percentage : null;
  }

  isRevision(module: ModuleSummary): boolean {
    return module.type === 'revision';
  }

  canAccessModule(moduleId: string): boolean {
    return this.authService.canAccessModule(moduleId);
  }

  isPremiumModule(moduleId: string): boolean {
    return !this.authService.canAccessModule(moduleId);
  }
}
