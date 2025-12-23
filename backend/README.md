# Backend NestJS - Figures de Style

Backend API construit avec **NestJS** pour l'application Figures de Style.

## 🚀 Technologies

- **NestJS 10** - Framework backend TypeScript (inspiré d'Angular)
- **Prisma** - ORM pour PostgreSQL
- **Passport JWT** - Authentification
- **Stripe** - Paiements récurrents
- **bcrypt** - Hash de mots de passe
- **class-validator** - Validation des données

## 📁 Structure du projet

```
src/
├── auth/                    # Module d'authentification JWT
│   ├── dto/                 # Data Transfer Objects
│   ├── guards/              # Guards d'autorisation
│   ├── strategies/          # Stratégies Passport
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── stripe/                  # Module Stripe (paiements)
│   ├── dto/
│   ├── stripe.controller.ts
│   ├── stripe.service.ts
│   └── stripe.module.ts
├── prisma/                  # Module Prisma (BDD)
│   ├── schema.prisma        # Schéma de base de données
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts            # Module racine
└── main.ts                  # Point d'entrée
```

## 🔧 Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs
```

## 🗄️ Base de données

### Option 1 : PostgreSQL local avec Docker

```bash
# Démarrer PostgreSQL
docker run --name postgres-figures \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=figures_db \
  -p 5432:5432 \
  -d postgres:16

# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# (Optionnel) Visualiser la BDD
npx prisma studio
```

### Option 2 : Supabase (gratuit jusqu'à 500MB)

1. Créer un projet sur https://supabase.com
2. Copier la **Database URL** (Settings → Database → Connection string)
3. Mettre à jour `DATABASE_URL` dans `.env`
4. Lancer `npx prisma db push`

## ▶️ Lancement

```bash
# Mode développement (hot-reload)
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

Le serveur démarre sur **http://localhost:3000**

## 📡 API Endpoints

### Authentification

```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Stripe (Paiements)

```http
POST /api/stripe/create-checkout-session
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "priceId": "price_premium_monthly",
  "plan": "premium"
}
```

## 🔐 Authentification

Le système utilise **JWT** (JSON Web Tokens).

### Flow d'authentification

1. **Signup/Login** → Le serveur retourne un token JWT
2. **Requêtes protégées** → Envoyer le token dans le header :
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 💳 Webhooks Stripe

### Configuration

1. **Stripe Dashboard** → Developers → Webhooks
2. **Ajouter endpoint** : `https://votre-domaine.fr/api/stripe/webhook`
3. **Événements à écouter** :
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

### Tester en local

```bash
# Installer Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 📦 Déploiement Railway

```bash
railway up
railway variables set DATABASE_URL="postgresql://..."
railway variables set STRIPE_SECRET_KEY="sk_live_..."
```

## 📝 Scripts utiles

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma db push

# Visualiser la BDD
npx prisma studio
```
