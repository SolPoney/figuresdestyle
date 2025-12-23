import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  MonitoringService,
  ActivityLog,
  SiteStats,
} from '../../services/monitoring.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  stats: SiteStats | null = null;
  recentLogs: ActivityLog[] = [];
  contactMessages: any[] = [];
  errors: ActivityLog[] = [];
  showLogs = false;
  showContacts = false;
  showErrors = false;

  // Mot de passe admin simple (en production, utiliser une vraie authentification)
  private readonly ADMIN_PASSWORD = 'admin2024';
  isAuthenticated = false;
  password = '';

  constructor(
    private monitoringService: MonitoringService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérifier si déjà authentifié dans cette session
    const adminAuth = sessionStorage.getItem('admin_authenticated');
    if (adminAuth === 'true') {
      this.isAuthenticated = true;
      this.loadData();
    }
  }

  login(): void {
    if (this.password === this.ADMIN_PASSWORD) {
      this.isAuthenticated = true;
      sessionStorage.setItem('admin_authenticated', 'true');
      this.loadData();
    } else {
      alert('Mot de passe incorrect');
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    sessionStorage.removeItem('admin_authenticated');
    this.router.navigate(['/']);
  }

  loadData(): void {
    this.stats = this.monitoringService.getSiteStats();
    this.recentLogs = this.monitoringService.getLogs(50);
    this.errors = this.monitoringService.getRecentErrors(20);
    this.loadContactMessages();
  }

  loadContactMessages(): void {
    const stored = localStorage.getItem('contact_messages');
    if (stored) {
      this.contactMessages = JSON.parse(stored);
    }
  }

  markAsRead(messageId: string): void {
    const messages = JSON.parse(
      localStorage.getItem('contact_messages') || '[]'
    );
    const message = messages.find((m: any) => m.id === messageId);
    if (message) {
      message.read = true;
      localStorage.setItem('contact_messages', JSON.stringify(messages));
      this.loadContactMessages();
    }
  }

  deleteMessage(messageId: string): void {
    if (confirm('Supprimer ce message ?')) {
      const messages = JSON.parse(
        localStorage.getItem('contact_messages') || '[]'
      );
      const filtered = messages.filter((m: any) => m.id !== messageId);
      localStorage.setItem('contact_messages', JSON.stringify(filtered));
      this.loadContactMessages();
      this.loadData(); // Recharger les stats
    }
  }

  cleanOldLogs(): void {
    if (confirm('Supprimer les logs de plus de 30 jours ?')) {
      this.monitoringService.cleanOldLogs();
      this.loadData();
      alert('Logs nettoyés avec succès');
    }
  }

  getLogTypeLabel(type: string): string {
    const labels: any = {
      login: 'Connexion',
      signup: 'Inscription',
      upgrade: 'Upgrade',
      module_complete: 'Module complété',
      error: 'Erreur',
      contact: 'Contact',
    };
    return labels[type] || type;
  }

  getLogTypeColor(type: string): string {
    const colors: any = {
      login: 'text-blue-400',
      signup: 'text-green-400',
      upgrade: 'text-yellow-400',
      module_complete: 'text-purple-400',
      error: 'text-red-400',
      contact: 'text-cyan-400',
    };
    return colors[type] || 'text-gray-400';
  }

  exportData(): void {
    const data = {
      stats: this.stats,
      logs: this.recentLogs,
      contacts: this.contactMessages,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin-export-${
      new Date().toISOString().split('T')[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
