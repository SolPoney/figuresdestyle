# 📚 Figures de Style - Plateforme d'apprentissage

Application complète d'apprentissage des figures de style avec système freemium, authentification et paiement intégré.

## 🚀 Fonctionnalités

- ✅ **11 modules d'apprentissage** + modules de révision
- ✅ **Système freemium** : 2 modules gratuits, 11 en premium
- ✅ **Authentification JWT** avec backend NestJS
- ✅ **Paiement Stripe** intégré
- ✅ **Plan École** avec gestion des élèves
- ✅ **Dashboard enseignant** complet
- ✅ **Base de données** SQLite (dev) / PostgreSQL (prod)
- ✅ **Interface moderne** avec Tailwind CSS et thème sombre

## 📁 Structure du projet

```
.
├── backend/              # API NestJS + Prisma
│   ├── src/
│   │   ├── auth/        # Authentification JWT
│   │   ├── stripe/      # Paiement Stripe
│   │   └── prisma/      # ORM base de données
│   └── prisma/
│       └── schema.prisma # Schéma de la base de données
│
├── figures-de-style/     # Frontend Angular 17
│   └── src/
│       ├── app/
│       │   ├── pages/   # Pages de l'application
│       │   ├── services/ # Services (Auth, Payment, etc.)
│       │   └── models/  # Modèles TypeScript
│       └── environments/ # Configuration dev/prod
│
└── start-all.sh          # Script de démarrage rapide
```

## 🛠️ Installation

### Prérequis

- Node.js 18+ et npm
- Git

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE_USERNAME/figuresdestyle.git
cd figuresdestyle
```

### 2. Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontend
cd ../figures-de-style
npm install
cd ..
```

### 3. Configurer les variables d'environnement

Créez un fichier `backend/.env` :

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="<votre_jwt_secret>"
STRIPE_SECRET_KEY="<votre_stripe_secret_key>"
STRIPE_WEBHOOK_SECRET="<votre_stripe_webhook_secret>"
FRONTEND_URL="http://localhost:4200"
```

### 4. Initialiser la base de données

```bash
cd backend
npx prisma generate
npx prisma db push
```

## 🚀 Démarrage

### Option 1 : Script automatique (recommandé)

```bash
./start-all.sh
```

Ce script démarre automatiquement :

- Backend NestJS sur `http://localhost:3000/api`
- Frontend Angular sur `http://localhost:4200`
- Prisma Studio sur `http://localhost:5555`

### Option 2 : Démarrage manuel

**Terminal 1 - Backend :**

```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend :**

```bash
cd figures-de-style
npm start
```

**Terminal 3 - Prisma Studio (optionnel) :**

```bash
cd backend
npx prisma studio
```

## 📊 Base de données

Le schéma Prisma comprend :

- `User` - Utilisateurs avec plans (FREE, PREMIUM, SCHOOL)
- `Score` - Scores des modules
- `Student` - Élèves du plan École
- `ContactMessage` - Messages de contact
- `ActivityLog` - Logs d'activité
- `PromoCode` - Codes promotionnels
- `Referral` - Système de parrainage

Visualisez les données avec Prisma Studio : `http://localhost:5555`

## 🧪 Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd figures-de-style
npm test
```

## 📦 Build pour production

```bash
# Frontend
cd figures-de-style
npm run build

# Backend (automatique avec start:prod)
cd backend
npm run build
npm run start:prod
```

## 🌐 Déploiement

### Frontend (Vercel/Netlify)

```bash
cd figures-de-style
npm run build
# Déployez le dossier dist/figures-de-style/
```

### Backend (Railway/Heroku)

```bash
cd backend
# Configurez DATABASE_URL avec PostgreSQL
# Déployez via Git ou CLI
```

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt (paramétrable)
- ✅ JWT avec expiration paramétrable

# ⚠️ AVERTISSEMENT SÉCURITÉ

Ne partagez jamais vos fichiers `.env` ou toute clé/API sensible. Utilisez les fichiers `.env.example` fournis pour la configuration. Consultez le fichier `SECURITY.md` pour les bonnes pratiques et la gestion des secrets.

- ✅ CORS configuré
- ✅ Validation des données avec class-validator
- ✅ Protection CSRF pour Stripe webhooks

## 📝 Licence

All Rights Reserved License

## 👨‍💻 Auteur

Votre nom - [Votre GitHub](https://github.com/VOTRE_USERNAME)

```
Figures de style
├─ .env.example
├─ CONNEXION_FRONTEND_BACKEND.md
├─ DEPLOIEMENT.md
├─ README.md
├─ SECURITY.md
├─ backend
│  ├─ .env.example
│  ├─ .prettierrc
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ SUPABASE_CONNECTION.md
│  ├─ api-tests.http
│  ├─ eslint.config.mjs
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20241224010000_init
│  │  │  │  └─ migration.sql
│  │  │  └─ migration_lock.toml
│  │  └─ schema.prisma
│  ├─ src
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ auth
│  │  │  ├─ auth.controller.spec.ts
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.spec.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ dto
│  │  │  │  └─ auth.dto.ts
│  │  │  ├─ guards
│  │  │  │  └─ jwt-auth.guard.ts
│  │  │  └─ strategies
│  │  │     └─ jwt.strategy.ts
│  │  ├─ main.ts
│  │  ├─ prisma
│  │  │  ├─ prisma.module.ts
│  │  │  ├─ prisma.service.spec.ts
│  │  │  └─ prisma.service.ts
│  │  └─ stripe
│  │     ├─ dto
│  │     │  └─ stripe.dto.ts
│  │     ├─ stripe.controller.spec.ts
│  │     ├─ stripe.controller.ts
│  │     ├─ stripe.module.ts
│  │     ├─ stripe.service.spec.ts
│  │     └─ stripe.service.ts
│  ├─ start.sh
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ test-api.sh
│  ├─ test-simple.sh
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
├─ biome.json
├─ figures-de-style
│  ├─ .angular
│  │  └─ cache
│  │     └─ 17.3.17
│  │        ├─ figures-de-style
│  │        │  └─ .tsbuildinfo
│  │        └─ vite
│  │           └─ deps
│  │              ├─ @angular_common.js
│  │              ├─ @angular_common.js.map
│  │              ├─ @angular_common_http.js
│  │              ├─ @angular_common_http.js.map
│  │              ├─ @angular_core.js
│  │              ├─ @angular_core.js.map
│  │              ├─ @angular_forms.js
│  │              ├─ @angular_forms.js.map
│  │              ├─ @angular_platform-browser.js
│  │              ├─ @angular_platform-browser.js.map
│  │              ├─ @angular_router.js
│  │              ├─ @angular_router.js.map
│  │              ├─ _metadata.json
│  │              ├─ chunk-2DJJH5CC.js
│  │              ├─ chunk-2DJJH5CC.js.map
│  │              ├─ chunk-APQJ6POP.js
│  │              ├─ chunk-APQJ6POP.js.map
│  │              ├─ chunk-CONQKHOI.js
│  │              ├─ chunk-CONQKHOI.js.map
│  │              ├─ chunk-FGIJWRIL.js
│  │              ├─ chunk-FGIJWRIL.js.map
│  │              ├─ chunk-GC5FLHL6.js
│  │              ├─ chunk-GC5FLHL6.js.map
│  │              ├─ chunk-IGJZNA3K.js
│  │              ├─ chunk-IGJZNA3K.js.map
│  │              ├─ chunk-V4GYEGQC.js
│  │              ├─ chunk-V4GYEGQC.js.map
│  │              ├─ package.json
│  │              ├─ rxjs.js
│  │              ├─ rxjs.js.map
│  │              ├─ rxjs_operators.js
│  │              └─ rxjs_operators.js.map
│  ├─ .editorconfig
│  ├─ .env.example
│  ├─ 4
│  ├─ CONTENU.md
│  ├─ DASHBOARD_ENSEIGNANT.md
│  ├─ DEPLOIEMENT_PRODUCTION.md
│  ├─ MONETISATION_PASSIVE.md
│  ├─ README.md
│  ├─ angular.json
│  ├─ config.production.ts
│  ├─ data
│  │  └─ module-1.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app
│  │  │  ├─ app.component.css
│  │  │  ├─ app.component.html
│  │  │  ├─ app.component.spec.ts
│  │  │  ├─ app.component.ts
│  │  │  ├─ app.config.ts
│  │  │  ├─ app.routes.ts
│  │  │  ├─ components
│  │  │  │  └─ footer
│  │  │  │     └─ footer.component.ts
│  │  │  ├─ guards
│  │  │  │  ├─ premium.guard.ts
│  │  │  │  └─ teacher.guard.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ auth.interceptor.ts
│  │  │  ├─ models
│  │  │  │  ├─ module.model.ts
│  │  │  │  ├─ student.model.ts
│  │  │  │  └─ user.model.ts
│  │  │  ├─ pages
│  │  │  │  ├─ admin
│  │  │  │  │  ├─ admin.component.css
│  │  │  │  │  ├─ admin.component.html
│  │  │  │  │  └─ admin.component.ts
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ auth.component.css
│  │  │  │  │  ├─ auth.component.html
│  │  │  │  │  └─ auth.component.ts
│  │  │  │  ├─ contact
│  │  │  │  │  ├─ contact.component.css
│  │  │  │  │  ├─ contact.component.html
│  │  │  │  │  └─ contact.component.ts
│  │  │  │  ├─ exercise
│  │  │  │  │  ├─ exercise.component.css
│  │  │  │  │  ├─ exercise.component.html
│  │  │  │  │  ├─ exercise.component.old.html
│  │  │  │  │  └─ exercise.component.ts
│  │  │  │  ├─ home
│  │  │  │  │  ├─ home.component.css
│  │  │  │  │  ├─ home.component.html
│  │  │  │  │  └─ home.component.ts
│  │  │  │  ├─ legal
│  │  │  │  │  ├─ accessibilite.component.ts
│  │  │  │  │  ├─ cgv.component.ts
│  │  │  │  │  ├─ legal-layout.component.ts
│  │  │  │  │  ├─ mentions-legales.component.ts
│  │  │  │  │  └─ politique-confidentialite.component.ts
│  │  │  │  ├─ module
│  │  │  │  │  ├─ module.component.css
│  │  │  │  │  ├─ module.component.html
│  │  │  │  │  └─ module.component.ts
│  │  │  │  └─ teacher-dashboard
│  │  │  │     ├─ teacher-dashboard.component.css
│  │  │  │     ├─ teacher-dashboard.component.html
│  │  │  │     └─ teacher-dashboard.component.ts
│  │  │  └─ services
│  │  │     ├─ api-auth.service.ts
│  │  │     ├─ api-payment.service.ts
│  │  │     ├─ auth.service.ts
│  │  │     ├─ module-data.service.ts
│  │  │     ├─ module.service.ts
│  │  │     ├─ monitoring.service.ts
│  │  │     ├─ payment.service.ts
│  │  │     └─ teacher.service.ts
│  │  ├─ assets
│  │  │  └─ data
│  │  │     ├─ allegorie.json
│  │  │     ├─ alliteration.json
│  │  │     ├─ anaphore.json
│  │  │     ├─ animisme.json
│  │  │     ├─ anticlimax.json
│  │  │     ├─ antiphrase.json
│  │  │     ├─ antithese.json
│  │  │     ├─ assonance.json
│  │  │     ├─ asyndete.json
│  │  │     ├─ chiasme.json
│  │  │     ├─ climax.json
│  │  │     ├─ comparaison.json
│  │  │     ├─ ellipse.json
│  │  │     ├─ epanadiplose.json
│  │  │     ├─ epiphore.json
│  │  │     ├─ euphemisme.json
│  │  │     ├─ gradation.json
│  │  │     ├─ hypallage.json
│  │  │     ├─ hyperbate.json
│  │  │     ├─ hyperbole.json
│  │  │     ├─ ironie.json
│  │  │     ├─ litote.json
│  │  │     ├─ metaphore.json
│  │  │     ├─ metonymie.json
│  │  │     ├─ module-1.json
│  │  │     ├─ module-2.json
│  │  │     ├─ modules-config.json
│  │  │     ├─ onomatopee.json
│  │  │     ├─ oxymore.json
│  │  │     ├─ paradoxe.json
│  │  │     ├─ parallellisme.json
│  │  │     ├─ periphrase.json
│  │  │     ├─ personnification.json
│  │  │     ├─ polysyndete.json
│  │  │     ├─ synecdoque.json
│  │  │     ├─ synesthesie.json
│  │  │     └─ zeugma.json
│  │  ├─ environments
│  │  │  ├─ environment.prod.ts
│  │  │  └─ environment.ts
│  │  ├─ favicon.ico
│  │  ├─ googlea6bde28068c7e4c4.html
│  │  ├─ index.html
│  │  ├─ main.ts
│  │  ├─ manifest.json
│  │  ├─ robots.txt
│  │  ├─ sitemap.xml
│  │  └─ styles.css
│  ├─ tailwind.config.js
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  └─ tsconfig.spec.json
├─ flavicon
│  ├─ android-icon-144x144.png
│  ├─ android-icon-192x192.png
│  ├─ android-icon-36x36.png
│  ├─ android-icon-48x48.png
│  ├─ android-icon-72x72.png
│  ├─ android-icon-96x96.png
│  ├─ apple-icon-114x114.png
│  ├─ apple-icon-120x120.png
│  ├─ apple-icon-144x144.png
│  ├─ apple-icon-152x152.png
│  ├─ apple-icon-180x180.png
│  ├─ apple-icon-57x57.png
│  ├─ apple-icon-60x60.png
│  ├─ apple-icon-72x72.png
│  ├─ apple-icon-76x76.png
│  ├─ apple-icon-precomposed.png
│  ├─ apple-icon.png
│  ├─ browserconfig.xml
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon-96x96.png
│  ├─ favicon.ico
│  ├─ manifest.json
│  ├─ ms-icon-144x144.png
│  ├─ ms-icon-150x150.png
│  ├─ ms-icon-310x310.png
│  └─ ms-icon-70x70.png
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ railway.yml
├─ render.yaml
├─ start-all.sh
└─ vercel.json

```
```
Figures de style
├─ .env.example
├─ CONNEXION_FRONTEND_BACKEND.md
├─ DEPLOIEMENT.md
├─ README.md
├─ SECURITY.md
├─ backend
│  ├─ .env.example
│  ├─ .prettierrc
│  ├─ Dockerfile
│  ├─ README.md
│  ├─ SUPABASE_CONNECTION.md
│  ├─ api-tests.http
│  ├─ eslint.config.mjs
│  ├─ nest-cli.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20241224010000_init
│  │  │  │  └─ migration.sql
│  │  │  └─ migration_lock.toml
│  │  └─ schema.prisma
│  ├─ src
│  │  ├─ app.controller.spec.ts
│  │  ├─ app.controller.ts
│  │  ├─ app.module.ts
│  │  ├─ app.service.ts
│  │  ├─ auth
│  │  │  ├─ auth.controller.spec.ts
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.spec.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ dto
│  │  │  │  └─ auth.dto.ts
│  │  │  ├─ guards
│  │  │  │  └─ jwt-auth.guard.ts
│  │  │  └─ strategies
│  │  │     └─ jwt.strategy.ts
│  │  ├─ main.ts
│  │  ├─ prisma
│  │  │  ├─ prisma.module.ts
│  │  │  ├─ prisma.service.spec.ts
│  │  │  └─ prisma.service.ts
│  │  └─ stripe
│  │     ├─ dto
│  │     │  └─ stripe.dto.ts
│  │     ├─ stripe.controller.spec.ts
│  │     ├─ stripe.controller.ts
│  │     ├─ stripe.module.ts
│  │     ├─ stripe.service.spec.ts
│  │     └─ stripe.service.ts
│  ├─ start.sh
│  ├─ test
│  │  ├─ app.e2e-spec.ts
│  │  └─ jest-e2e.json
│  ├─ test-api.sh
│  ├─ test-simple.sh
│  ├─ tsconfig.build.json
│  └─ tsconfig.json
├─ biome.json
├─ figures-de-style
│  ├─ .angular
│  │  └─ cache
│  │     └─ 17.3.17
│  │        ├─ figures-de-style
│  │        │  └─ .tsbuildinfo
│  │        └─ vite
│  │           └─ deps
│  │              ├─ @angular_common.js
│  │              ├─ @angular_common.js.map
│  │              ├─ @angular_common_http.js
│  │              ├─ @angular_common_http.js.map
│  │              ├─ @angular_core.js
│  │              ├─ @angular_core.js.map
│  │              ├─ @angular_forms.js
│  │              ├─ @angular_forms.js.map
│  │              ├─ @angular_platform-browser.js
│  │              ├─ @angular_platform-browser.js.map
│  │              ├─ @angular_router.js
│  │              ├─ @angular_router.js.map
│  │              ├─ _metadata.json
│  │              ├─ chunk-2DJJH5CC.js
│  │              ├─ chunk-2DJJH5CC.js.map
│  │              ├─ chunk-APQJ6POP.js
│  │              ├─ chunk-APQJ6POP.js.map
│  │              ├─ chunk-CONQKHOI.js
│  │              ├─ chunk-CONQKHOI.js.map
│  │              ├─ chunk-FGIJWRIL.js
│  │              ├─ chunk-FGIJWRIL.js.map
│  │              ├─ chunk-GC5FLHL6.js
│  │              ├─ chunk-GC5FLHL6.js.map
│  │              ├─ chunk-IGJZNA3K.js
│  │              ├─ chunk-IGJZNA3K.js.map
│  │              ├─ chunk-V4GYEGQC.js
│  │              ├─ chunk-V4GYEGQC.js.map
│  │              ├─ package.json
│  │              ├─ rxjs.js
│  │              ├─ rxjs.js.map
│  │              ├─ rxjs_operators.js
│  │              └─ rxjs_operators.js.map
│  ├─ .editorconfig
│  ├─ .env.example
│  ├─ 4
│  ├─ CONTENU.md
│  ├─ DASHBOARD_ENSEIGNANT.md
│  ├─ DEPLOIEMENT_PRODUCTION.md
│  ├─ MONETISATION_PASSIVE.md
│  ├─ README.md
│  ├─ angular.json
│  ├─ config.production.ts
│  ├─ data
│  │  └─ module-1.json
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ app
│  │  │  ├─ app.component.css
│  │  │  ├─ app.component.html
│  │  │  ├─ app.component.spec.ts
│  │  │  ├─ app.component.ts
│  │  │  ├─ app.config.ts
│  │  │  ├─ app.routes.ts
│  │  │  ├─ components
│  │  │  │  └─ footer
│  │  │  │     └─ footer.component.ts
│  │  │  ├─ guards
│  │  │  │  ├─ premium.guard.ts
│  │  │  │  └─ teacher.guard.ts
│  │  │  ├─ interceptors
│  │  │  │  └─ auth.interceptor.ts
│  │  │  ├─ models
│  │  │  │  ├─ module.model.ts
│  │  │  │  ├─ student.model.ts
│  │  │  │  └─ user.model.ts
│  │  │  ├─ pages
│  │  │  │  ├─ admin
│  │  │  │  │  ├─ admin.component.css
│  │  │  │  │  ├─ admin.component.html
│  │  │  │  │  └─ admin.component.ts
│  │  │  │  ├─ auth
│  │  │  │  │  ├─ auth.component.css
│  │  │  │  │  ├─ auth.component.html
│  │  │  │  │  └─ auth.component.ts
│  │  │  │  ├─ contact
│  │  │  │  │  ├─ contact.component.css
│  │  │  │  │  ├─ contact.component.html
│  │  │  │  │  └─ contact.component.ts
│  │  │  │  ├─ exercise
│  │  │  │  │  ├─ exercise.component.css
│  │  │  │  │  ├─ exercise.component.html
│  │  │  │  │  ├─ exercise.component.old.html
│  │  │  │  │  └─ exercise.component.ts
│  │  │  │  ├─ home
│  │  │  │  │  ├─ home.component.css
│  │  │  │  │  ├─ home.component.html
│  │  │  │  │  └─ home.component.ts
│  │  │  │  ├─ legal
│  │  │  │  │  ├─ accessibilite.component.ts
│  │  │  │  │  ├─ cgv.component.ts
│  │  │  │  │  ├─ legal-layout.component.ts
│  │  │  │  │  ├─ mentions-legales.component.ts
│  │  │  │  │  └─ politique-confidentialite.component.ts
│  │  │  │  ├─ module
│  │  │  │  │  ├─ module.component.css
│  │  │  │  │  ├─ module.component.html
│  │  │  │  │  └─ module.component.ts
│  │  │  │  └─ teacher-dashboard
│  │  │  │     ├─ teacher-dashboard.component.css
│  │  │  │     ├─ teacher-dashboard.component.html
│  │  │  │     └─ teacher-dashboard.component.ts
│  │  │  └─ services
│  │  │     ├─ api-auth.service.ts
│  │  │     ├─ api-payment.service.ts
│  │  │     ├─ auth.service.ts
│  │  │     ├─ module-data.service.ts
│  │  │     ├─ module.service.ts
│  │  │     ├─ monitoring.service.ts
│  │  │     ├─ payment.service.ts
│  │  │     └─ teacher.service.ts
│  │  ├─ assets
│  │  │  └─ data
│  │  │     ├─ allegorie.json
│  │  │     ├─ alliteration.json
│  │  │     ├─ anaphore.json
│  │  │     ├─ animisme.json
│  │  │     ├─ anticlimax.json
│  │  │     ├─ antiphrase.json
│  │  │     ├─ antithese.json
│  │  │     ├─ assonance.json
│  │  │     ├─ asyndete.json
│  │  │     ├─ chiasme.json
│  │  │     ├─ climax.json
│  │  │     ├─ comparaison.json
│  │  │     ├─ ellipse.json
│  │  │     ├─ epanadiplose.json
│  │  │     ├─ epiphore.json
│  │  │     ├─ euphemisme.json
│  │  │     ├─ gradation.json
│  │  │     ├─ hypallage.json
│  │  │     ├─ hyperbate.json
│  │  │     ├─ hyperbole.json
│  │  │     ├─ ironie.json
│  │  │     ├─ litote.json
│  │  │     ├─ metaphore.json
│  │  │     ├─ metonymie.json
│  │  │     ├─ module-1.json
│  │  │     ├─ module-2.json
│  │  │     ├─ modules-config.json
│  │  │     ├─ onomatopee.json
│  │  │     ├─ oxymore.json
│  │  │     ├─ paradoxe.json
│  │  │     ├─ parallellisme.json
│  │  │     ├─ periphrase.json
│  │  │     ├─ personnification.json
│  │  │     ├─ polysyndete.json
│  │  │     ├─ synecdoque.json
│  │  │     ├─ synesthesie.json
│  │  │     └─ zeugma.json
│  │  ├─ environments
│  │  │  ├─ environment.prod.ts
│  │  │  └─ environment.ts
│  │  ├─ favicon.ico
│  │  ├─ googlea6bde28068c7e4c4.html
│  │  ├─ index.html
│  │  ├─ main.ts
│  │  ├─ manifest.json
│  │  ├─ robots.txt
│  │  ├─ sitemap.xml
│  │  └─ styles.css
│  ├─ tailwind.config.js
│  ├─ tsconfig.app.json
│  ├─ tsconfig.json
│  └─ tsconfig.spec.json
├─ flavicon
│  ├─ android-icon-144x144.png
│  ├─ android-icon-192x192.png
│  ├─ android-icon-36x36.png
│  ├─ android-icon-48x48.png
│  ├─ android-icon-72x72.png
│  ├─ android-icon-96x96.png
│  ├─ apple-icon-114x114.png
│  ├─ apple-icon-120x120.png
│  ├─ apple-icon-144x144.png
│  ├─ apple-icon-152x152.png
│  ├─ apple-icon-180x180.png
│  ├─ apple-icon-57x57.png
│  ├─ apple-icon-60x60.png
│  ├─ apple-icon-72x72.png
│  ├─ apple-icon-76x76.png
│  ├─ apple-icon-precomposed.png
│  ├─ apple-icon.png
│  ├─ browserconfig.xml
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon-96x96.png
│  ├─ favicon.ico
│  ├─ manifest.json
│  ├─ ms-icon-144x144.png
│  ├─ ms-icon-150x150.png
│  ├─ ms-icon-310x310.png
│  └─ ms-icon-70x70.png
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ railway.yml
├─ render.yaml
├─ start-all.sh
└─ vercel.json

```