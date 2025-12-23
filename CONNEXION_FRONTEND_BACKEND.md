# 🔌 Connexion Frontend ↔️ Backend

## ✅ Configuration terminée

Le frontend Angular est maintenant connecté au backend NestJS !

## 📁 Fichiers créés

### 1. **Environnements**

- `src/environments/environment.ts` - Configuration développement (localhost:3000)
- `src/environments/environment.prod.ts` - Configuration production (Railway)

### 2. **Services API**

- `src/app/services/api-auth.service.ts` - Service d'authentification avec backend
- `src/app/services/api-payment.service.ts` - Service de paiement Stripe avec backend
- `src/app/interceptors/auth.interceptor.ts` - Intercepteur HTTP pour JWT

### 3. **Modifications**

- `src/app/app.config.ts` - Ajout HttpClient + Intercepteur
- `src/app/pages/auth/auth.component.ts` - Formulaire connexion/inscription
- `src/app/pages/auth/auth.component.html` - UI avec mot de passe
- `src/app/services/payment.service.ts` - Bascule simulation/API selon env

## 🔄 Comment ça marche

### Flow d'authentification

```
1. Utilisateur s'inscrit
   Frontend → POST /api/auth/signup
   Backend → Hash bcrypt + JWT token
   Frontend ← Token + User

2. Token sauvegardé dans localStorage

3. Requêtes protégées
   Frontend → GET /api/protected (+ Header: Bearer token)
   Intercepteur → Ajoute automatiquement le token
   Backend → Valide JWT
   Backend ← Données utilisateur
```

### Flow de paiement

```
1. Utilisateur clique "Passer Premium"
   Frontend → POST /api/stripe/create-checkout-session
   Backend → Crée session Stripe
   Frontend ← URL de paiement

2. Redirection vers Stripe Checkout
   Utilisateur → Paiement sur Stripe

3. Webhook Stripe
   Stripe → POST /api/stripe/webhook
   Backend → Met à jour plan utilisateur

4. Retour sur le site
   Frontend → Récupère utilisateur mis à jour
```

## 🚀 Démarrage

### 1. Backend (Terminal 1)

```bash
cd backend

# Démarrer PostgreSQL (Docker)
docker run --name postgres-figures \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=figures_db \
  -p 5432:5432 \
  -d postgres:16

# Générer Prisma et créer les tables
npx prisma generate
npx prisma db push

# Démarrer le backend
npm run start:dev
```

Backend disponible sur **http://localhost:3000/api**

### 2. Frontend (Terminal 2)

```bash
cd figures-de-style
npm start
```

Frontend disponible sur **http://localhost:4200**

## 🧪 Tester la connexion

### Test avec curl

```bash
# 1. Inscription
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "name": "Test User",
    "password": "test123"
  }'

# Réponse:
# {
#   "user": {...},
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }

# 2. Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "test123"
  }'
```

### Test dans l'application

1. Ouvrir http://localhost:4200
2. Cliquer sur "Connexion"
3. Cliquer sur "Pas de compte ? S'inscrire"
4. Remplir le formulaire :
   - Email: `test@test.com`
   - Nom: `Test User`
   - Mot de passe: `test123`
5. Cliquer sur "S'inscrire"
6. ✅ Vous êtes connecté !

## 🔐 Sécurité

- ✅ Mots de passe hashés avec bcrypt (10 rounds)
- ✅ JWT avec expiration 7 jours
- ✅ Token stocké dans localStorage
- ✅ Intercepteur HTTP ajoute automatiquement le token
- ✅ Déconnexion automatique si 401 Unauthorized
- ✅ CORS configuré (uniquement localhost:4200)
- ✅ Validation des données (class-validator)

## 📊 Base de données

Visualiser les données avec Prisma Studio :

```bash
cd backend
npx prisma studio
```

Interface web sur **http://localhost:5555**

## 🐛 Dépannage

### Backend ne démarre pas

```bash
# Vérifier PostgreSQL
docker ps | grep postgres

# Relancer si arrêté
docker start postgres-figures
```

### Erreur CORS

Vérifier dans `backend/.env` :

```
FRONTEND_URL="http://localhost:4200"
```

### Token expiré

Le token JWT expire après 7 jours. Se reconnecter pour obtenir un nouveau token.

## 🎯 Prochaines étapes

- [ ] Configurer Stripe en mode test
- [ ] Tester le flow de paiement complet
- [ ] Déployer le backend sur Railway
- [ ] Connecter Supabase PostgreSQL
- [ ] Configurer les webhooks Stripe
