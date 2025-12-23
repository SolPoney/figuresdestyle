import { Injectable } from '@angular/core';

export interface ActivityLog {
  id: string;
  type:
    | 'login'
    | 'signup'
    | 'upgrade'
    | 'module_complete'
    | 'error'
    | 'contact';
  userId?: string;
  userEmail?: string;
  details: any;
  timestamp: Date;
}

export interface SiteStats {
  totalUsers: number;
  freeUsers: number;
  premiumUsers: number;
  schoolUsers: number;
  totalModulesCompleted: number;
  averageScore: number;
  contactMessages: number;
  last7Days: {
    newUsers: number;
    activeUsers: number;
    upgrades: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MonitoringService {
  private readonly LOGS_KEY = 'site_activity_logs';
  private readonly MAX_LOGS = 1000;

  constructor() {}

  // Enregistrer une activité
  logActivity(
    type: ActivityLog['type'],
    details: any,
    userId?: string,
    userEmail?: string
  ): void {
    const logs = this.getLogs();

    const newLog: ActivityLog = {
      id: Date.now().toString(),
      type,
      userId,
      userEmail,
      details,
      timestamp: new Date(),
    };

    logs.unshift(newLog); // Ajouter au début

    // Limiter le nombre de logs
    if (logs.length > this.MAX_LOGS) {
      logs.splice(this.MAX_LOGS);
    }

    localStorage.setItem(this.LOGS_KEY, JSON.stringify(logs));
  }

  // Récupérer tous les logs
  getLogs(limit?: number): ActivityLog[] {
    const stored = localStorage.getItem(this.LOGS_KEY);
    if (!stored) return [];

    try {
      const logs = JSON.parse(stored) as ActivityLog[];
      return limit ? logs.slice(0, limit) : logs;
    } catch {
      return [];
    }
  }

  // Récupérer les logs par type
  getLogsByType(type: ActivityLog['type'], limit = 50): ActivityLog[] {
    return this.getLogs()
      .filter((log) => log.type === type)
      .slice(0, limit);
  }

  // Obtenir les statistiques du site
  getSiteStats(): SiteStats {
    const users = this.getAllUsers();
    const scores = this.getAllScores();
    const logs = this.getLogs();
    const contacts = this.getContactMessages();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentLogs = logs.filter((log) => new Date(log.timestamp) > weekAgo);

    return {
      totalUsers: users.length,
      freeUsers: users.filter((u) => u.plan === 'free').length,
      premiumUsers: users.filter((u) => u.plan === 'premium').length,
      schoolUsers: users.filter((u) => u.plan === 'school').length,
      totalModulesCompleted: scores.length,
      averageScore:
        scores.length > 0
          ? Math.round(
              scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length
            )
          : 0,
      contactMessages: contacts.filter((c) => !c.read).length,
      last7Days: {
        newUsers: recentLogs.filter((l) => l.type === 'signup').length,
        activeUsers: new Set(
          recentLogs.filter((l) => l.userId).map((l) => l.userId)
        ).size,
        upgrades: recentLogs.filter((l) => l.type === 'upgrade').length,
      },
    };
  }

  // Obtenir les erreurs récentes
  getRecentErrors(limit = 20): ActivityLog[] {
    return this.getLogsByType('error', limit);
  }

  // Nettoyer les vieux logs (garder 30 derniers jours)
  cleanOldLogs(): void {
    const logs = this.getLogs();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const recentLogs = logs.filter(
      (log) => new Date(log.timestamp) > thirtyDaysAgo
    );

    localStorage.setItem(this.LOGS_KEY, JSON.stringify(recentLogs));
  }

  // Helpers privés
  private getAllUsers(): any[] {
    const stored = localStorage.getItem('figures_user');
    if (!stored) return [];
    try {
      const user = JSON.parse(stored);
      return user ? [user] : [];
    } catch {
      return [];
    }
  }

  private getAllScores(): any[] {
    const stored = localStorage.getItem('figures_de_style_scores');
    if (!stored) return [];
    try {
      return JSON.parse(stored) || [];
    } catch {
      return [];
    }
  }

  private getContactMessages(): any[] {
    const stored = localStorage.getItem('contact_messages');
    if (!stored) return [];
    try {
      return JSON.parse(stored) || [];
    } catch {
      return [];
    }
  }
}
