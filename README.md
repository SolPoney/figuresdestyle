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
