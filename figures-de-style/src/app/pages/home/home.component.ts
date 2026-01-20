import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModuleService } from '../../services/module.service';
import { AuthService } from '../../services/auth.service';
import { Module } from '../../models/module.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  modules: Module[] = [];
  currentUser: User | null = null;

  constructor(
    private moduleService: ModuleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.moduleService.getModules().subscribe({
      next: (modules) => {
        console.log('Contenu brut reçu :', modules);
        this.modules = modules && Array.isArray(modules) ? modules : [];
        console.log('Modules utilisés :', this.modules);
      },
      error: () => {
        this.modules = [];
        console.log('Erreur de chargement des modules');
      },
    });
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  getModuleScore(moduleId: string): number | null {
    const score = this.moduleService.getModuleScore(moduleId);
    return score ? score.percentage : null;
  }

  canAccessModule(moduleId: string): boolean {
    return this.authService.canAccessModule(moduleId);
  }

  isPremiumModule(moduleId: string): boolean {
    return !this.authService.canAccessModule(moduleId);
  }
}
