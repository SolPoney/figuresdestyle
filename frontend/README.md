# Figures de Style

Site éducatif interactif pour apprendre et maîtriser 33 figures de style à travers plus de 500 exemples variés.

## Caractéristiques

- **Angular 17** avec routing standalone
- **Tailwind CSS** pour le design
- **Mode sombre par défaut** (#121212 background, #F8F8F8 text)
- **Accessibilité RGAA** :
  - Contrastes élevés (WCAG AAA)
  - Focus visible sur tous les éléments interactifs
  - Labels ARIA pour la navigation
  - Navigation au clavier complète
  - Attributs sémantiques HTML5
- **Responsive** : Mobile, tablette, desktop
- **Plus de 15 exemples** par figure de style

## Structure du site

### Modules disponibles

#### **Module 1 : Substitution et représentation**

Métaphore, Comparaison, Métonymie, Synecdoque, Allégorie, Personnification, Animisme, Périphrase

#### **Module 2 : Amplification et atténuation**

Hyperbole, Euphémisme, Litote, Gradation, Antiphrase

#### **Module 3 : Construction et organisation de la phrase**

Anaphore, Épiphore, Chiasme, Parallélisme, Asyndète, Polysyndète, Ellipse

#### **Module 4 : Sons et rythme**

Allitération, Assonance, Onomatopée

#### **Module 5 : Pensée et sens**

Oxymore, Paradoxe, Antithèse, Ironie, Synesthésie

#### **Module 6 : Figures rhétoriques rares**

Hyperbate, Hypallage, Épanadiplose, Climax, Anticlimax, Zeugma

### Pages

1. **Page d'accueil** (`/`)

   - Liste de tous les modules thématiques
   - Accès direct à chaque module

2. **Page module** (`/module/:id`)

   - Définitions détaillées de chaque figure de style
   - **15+ exemples** illustratifs par figure
   - Bouton pour commencer l'exercice

3. **Page exercice** (`/exercise/:id`)
   - **10 questions** à choix multiple par module
   - Système d'indices intelligent
   - Feedback immédiat
   - Score final avec pourcentage
   - Objectif : 70% de réussite

## Installation et lancement

### Prérequis

- Node.js v20.18.3 ou supérieur
- npm 10.8.2 ou supérieur

### Installation

```bash
cd figures-de-style
npm install
```

### Développement

```bash
npm start
```

Le site sera accessible sur [http://localhost:4200](http://localhost:4200)

### Production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`

## Design System

### Couleurs (Mode Sombre)

```css
--dark-bg: #121212          /* Fond principal */
--dark-surface: #1E1E1E     /* Surfaces/cartes */
--dark-text: #F8F8F8        /* Texte principal */
--dark-textSecondary: #B0B0B0  /* Texte secondaire */
--dark-border: #2C2C2C      /* Bordures */
```

### Couleurs d'accent

- **Bleu** (#3B82F6) : Boutons principaux, liens
- **Vert** (#059669) : Validation, succès
- **Rouge** (#DC2626) : Erreurs, réponses incorrectes
- **Jaune** (#EAB308) : Indices, avertissements

## Accessibilité RGAA

Le site respecte les normes d'accessibilité RGAA :

- Contraste de couleurs WCAG AAA
- Navigation au clavier (Tab, Enter, Espace)
- Focus visible avec ring de 4px
- Labels ARIA sur tous les éléments interactifs
- Attributs `role` et `aria-*` appropriés
- Structure sémantique HTML5
- Alternatives textuelles pour les icônes
- Indicateurs de progression accessibles

## Structure du projet

```
src/
├── app/
│   ├── models/
│   │   └── module.model.ts          # Interfaces TypeScript
│   ├── services/
│   │   └── module.service.ts        # Service de gestion des modules
│   ├── pages/
│   │   ├── home/                    # Page d'accueil
│   │   ├── module/                  # Page des modules
│   │   └── exercise/                # Page des exercices
│   ├── app.component.ts
│   ├── app.routes.ts                # Configuration du routing
│   └── app.config.ts
├── styles.css                        # Styles globaux + Tailwind
└── index.html
```

## Technologies utilisées

- **Angular 17** - Framework principal
- **Tailwind CSS** - Framework CSS utilitaire
- **TypeScript** - Langage de programmation
- **RxJS** - Gestion de la réactivité

## Licence

Projet éducatif sous licence MIT

## Contribution

Pour ajouter de nouveaux modules ou exercices, modifiez le fichier `src/app/services/module.service.ts`

---

Développé pour l'apprentissage des figures de style
