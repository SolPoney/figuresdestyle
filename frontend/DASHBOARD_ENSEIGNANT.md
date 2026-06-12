# Dashboard Enseignant - Plan École

## 📊 Vue d'ensemble

Le dashboard enseignant est une fonctionnalité exclusive du **plan École (199€/an)** qui permet aux professeurs de gérer jusqu'à 30 élèves et de suivre leur progression en temps réel.

## 🚀 Fonctionnalités

### 1. Statistiques globales

- **Total élèves** : Nombre d'élèves inscrits (max 30)
- **Élèves actifs** : Élèves ayant une activité dans les 7 derniers jours
- **Score moyen** : Performance moyenne de la classe sur tous les modules

### 2. Gestion des élèves

- ✅ Ajouter des élèves (nom + email)
- ✅ Supprimer des élèves
- ✅ Voir la liste complète avec statistiques individuelles
- ✅ Limite de 30 élèves par compte enseignant

### 3. Suivi détaillé par élève

- 📈 Nombre de modules complétés
- 📊 Score moyen individuel
- 📅 Date de dernière activité
- 📋 Détail des scores par module (modal)

### 4. Export des résultats

- 📥 Export CSV avec :
  - Nom et email de chaque élève
  - Scores par module
  - Date de complétion
  - Format compatible Excel/Google Sheets

## 🎯 Accès au dashboard

### Pour les enseignants (plan École)

1. Se connecter avec un compte plan École
2. Cliquer sur le bouton **"Dashboard"** en haut à droite de l'accueil
3. Ou aller directement sur `/teacher-dashboard`

### Protection

- Le dashboard est protégé par un `teacherGuard`
- Seuls les utilisateurs avec `plan: 'school'` peuvent y accéder
- Redirection automatique vers `/auth` si accès non autorisé

## 🛠️ Architecture technique

### Services

- **`TeacherService`** : Gestion des élèves et de leur progression
  - `getStudents()` : Liste des élèves d'un enseignant
  - `addStudent()` : Ajout d'un nouvel élève
  - `removeStudent()` : Suppression d'un élève
  - `getStudentProgress()` : Progression d'un élève
  - `getTeacherStats()` : Statistiques globales
  - `exportToCSV()` : Export des résultats
  - `downloadCSV()` : Téléchargement du fichier CSV

### Modèles

```typescript
interface Student {
  id: string;
  email: string;
  name: string;
  teacherId: string;
  createdAt: Date;
  lastActive?: Date;
}

interface StudentProgress {
  studentId: string;
  moduleId: string;
  score: number;
  attempts: number;
  completedAt: Date;
}
```

### Stockage

- **localStorage** :
  - `figures_students` : Liste de tous les élèves
  - `figures_student_progress` : Progression de tous les élèves

## 📱 Interface utilisateur

### Vue principale

- **Header** : Titre + bouton retour accueil
- **3 cartes statistiques** : Total élèves, Actifs, Score moyen
- **Barre d'actions** : Bouton "Exporter CSV" + "Ajouter un élève"
- **Liste des élèves** : Cartes avec infos + boutons "Détails" et "Supprimer"

### Formulaire d'ajout

- Champ "Nom complet"
- Champ "Email"
- Validation : max 30 élèves
- Boutons "Ajouter" / "Annuler"

### Modal détails élève

- Résumé : Modules complétés, Score moyen, Dernière activité
- Liste des scores par module avec badges colorés :
  - 🟢 Vert : ≥ 70%
  - 🟡 Jaune : 50-69%
  - 🔴 Rouge : < 50%
  - ⚪ Gris : Non complété

## 🎨 Design

- **Thème sombre** : Cohérent avec le reste de l'application
- **Couleurs** :
  - Purple (#9333ea) : Plan École
  - Blue : Actions principales
  - Green : Stats positives
  - Red : Suppression
- **Responsive** : Grid adaptatif (mobile → desktop)

## 🔄 Évolutions futures

### Pour la production

- [ ] Backend réel pour stockage sécurisé
- [ ] Authentification par email pour les élèves
- [ ] Génération automatique de codes d'accès élèves
- [ ] Notifications aux élèves (email)
- [ ] Graphiques de progression temporelle
- [ ] Comparaison classe vs moyenne nationale
- [ ] Export PDF des résultats
- [ ] Filtres et recherche dans la liste élèves
- [ ] Attribution de devoirs spécifiques
- [ ] Messagerie enseignant-élève

### Fonctionnalités avancées

- [ ] Groupes de classe (plusieurs classes par enseignant)
- [ ] Partage de comptes entre plusieurs enseignants
- [ ] Statistiques par figure de style
- [ ] Temps passé sur chaque module
- [ ] Taux de réussite par type de question

## 📞 Support

Pour toute question sur le plan École ou le dashboard enseignant, contactez-nous à l'adresse configurée dans l'application.

---

**Note** : Cette version utilise localStorage pour la démo. En production, toutes les données seront stockées de manière sécurisée sur un serveur backend avec authentification appropriée.
