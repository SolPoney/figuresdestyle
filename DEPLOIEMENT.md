# 🚀 Guide de Déploiement - Netlify + Render

## 📦 Architecture de déploiement

- **Frontend** : Netlify (gratuit)
- **Backend** : Render (gratuit)
- **Base de données** : Render PostgreSQL (gratuit) ou Supabase

---

## 1️⃣ Déploiement du Frontend sur Netlify

### Étape 1 : Connecter GitHub
1. Allez sur https://app.netlify.com
2. Cliquez sur **"Add new site"** → **"Import an existing project"**
3. Choisissez **GitHub** et autorisez Netlify
4. Sélectionnez le dépôt **`SolPoney/figuresdestyle`**

### Étape 2 : Configuration du build
Netlify détectera automatiquement le fichier `netlify.toml`. Vérifiez :
- **Base directory** : `figures-de-style`
- **Build command** : `npm install && npm run build`
- **Publish directory** : `dist/figures-de-style/browser`

### Étape 3 : Variables d'environnement (optionnelles)
Si vous voulez utiliser le backend en production :
- Allez dans **Site settings** → **Environment variables**
- Ajoutez :
  - `NG_APP_API_URL` = `https://votre-backend.onrender.com/api`

### Étape 4 : Déployer
1. Cliquez sur **"Deploy site"**
2. Attendez 2-3 minutes
3. Votre site sera disponible sur `https://random-name-123.netlify.app`
4. Vous pouvez changer le nom dans **Site settings** → **Site details** → **Change site name**

---

## 2️⃣ Déploiement du Backend sur Render

### Étape 1 : Créer la base de données PostgreSQL
1. Allez sur https://dashboard.render.com
2. Cliquez sur **"New +"** → **"PostgreSQL"**
3. Configuration :
   - **Name** : `figuresdestyle-db`
   - **Database** : `figuresdestyle`
   - **User** : (généré automatiquement)
   - **Region** : Frankfurt (Europe)
   - **Plan** : Free
4. Cliquez sur **"Create Database"**
5. **Copiez l'URL de connexion interne** (Internal Database URL) - vous en aurez besoin !

### Étape 2 : Créer le service backend
1. Cliquez sur **"New +"** → **"Web Service"**
2. Connectez votre dépôt GitHub **`SolPoney/figuresdestyle`**
3. Configuration :
   - **Name** : `figuresdestyle-backend`
   - **Region** : Frankfurt (Europe)
   - **Branch** : `main`
   - **Root Directory** : `backend`
   - **Runtime** : Node
   - **Build Command** : `npm install && npx prisma generate && npm run build`
   - **Start Command** : `npx prisma migrate deploy && npm run start:prod`
   - **Plan** : Free

### Étape 3 : Variables d'environnement
Ajoutez ces variables dans **Environment** :

```
DATABASE_URL=<collez_l_url_postgresql_interne_ici>
JWT_SECRET=<générez_avec_openssl_rand_-base64_32>
STRIPE_SECRET_KEY=sk_test_votre_cle_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_secret
FRONTEND_URL=https://votre-site.netlify.app
NODE_ENV=production
PORT=3000
```

**Générer JWT_SECRET** :
```bash
openssl rand -base64 32
```

### Étape 4 : Déployer
1. Cliquez sur **"Create Web Service"**
2. Attendez 5-10 minutes pour le premier build
3. Votre backend sera disponible sur `https://figuresdestyle-backend.onrender.com`

---

## 3️⃣ Connecter Frontend et Backend

### Mettre à jour le frontend
1. Dans Netlify, allez dans **Site settings** → **Environment variables**
2. Ajoutez :
   - `NG_APP_API_URL` = `https://figuresdestyle-backend.onrender.com/api`
3. Redéployez le site : **Deploys** → **Trigger deploy** → **Deploy site**

### Mettre à jour le backend
1. Dans Render, allez dans le service backend
2. Modifiez la variable `FRONTEND_URL` :
   - `FRONTEND_URL` = `https://votre-site.netlify.app`
3. Sauvegardez (redéploiement automatique)

---

## 4️⃣ Configuration Stripe (Webhooks)

### Pour les paiements en production
1. Allez sur https://dashboard.stripe.com/webhooks
2. Cliquez sur **"Add endpoint"**
3. **URL** : `https://figuresdestyle-backend.onrender.com/api/stripe/webhook`
4. Écoutez ces événements :
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
5. Copiez le **Signing secret** (commence par `whsec_`)
6. Ajoutez-le dans Render : `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## 5️⃣ Vérification du déploiement

### Frontend
✅ Ouvrez `https://votre-site.netlify.app`
✅ Vérifiez que le site charge correctement
✅ Testez la navigation entre les pages

### Backend
✅ Testez l'API : `curl https://figuresdestyle-backend.onrender.com/api`
✅ Devrait retourner : `Hello World!`

### Base de données
✅ Dans Render PostgreSQL, vérifiez que les tables sont créées
✅ Onglet **"Info"** → Cliquez sur **"Connect"** → **"External Connection"**
✅ Utilisez un client PostgreSQL (DBeaver, pgAdmin) pour voir les tables

---

## 🎯 URLs finales

Après déploiement, vous aurez :
- 🌐 **Frontend** : `https://figuresdestyle.netlify.app`
- 🔙 **Backend** : `https://figuresdestyle-backend.onrender.com`
- 📊 **Base de données** : PostgreSQL hébergé sur Render

---

## ⚠️ Limitations du plan gratuit

### Netlify
- ✅ 100 GB de bande passante/mois
- ✅ Build illimités
- ✅ SSL automatique

### Render
- ⚠️ Le service s'endort après 15 min d'inactivité
- ⚠️ Premier appel après sommeil : 30-60 secondes
- ✅ 750h/mois (suffisant pour 1 service)
- ✅ PostgreSQL 1GB gratuit

---

## 🔄 Mises à jour automatiques

Les deux plateformes redéploient automatiquement à chaque push sur GitHub !

```bash
git add .
git commit -m "✨ Nouvelle fonctionnalité"
git push origin main
```

Netlify et Render détecteront le changement et redéploieront automatiquement. 🚀

---

## 🐛 Dépannage

### Backend ne démarre pas
1. Vérifiez les logs dans Render → **Logs**
2. Vérifiez que `DATABASE_URL` est correcte
3. Vérifiez que Prisma génère bien le client

### Frontend n'accède pas au backend
1. Vérifiez que `NG_APP_API_URL` est définie dans Netlify
2. Vérifiez le CORS dans le backend (devrait autoriser votre domaine Netlify)
3. Testez l'API directement : `curl https://votre-backend.onrender.com/api`

### Base de données vide
1. Connectez-vous au backend via Render Shell
2. Lancez manuellement : `npx prisma migrate deploy`
3. Vérifiez les logs de déploiement

---

## 📞 Support

- Netlify : https://docs.netlify.com
- Render : https://docs.render.com
- Stripe : https://stripe.com/docs

Bon déploiement ! 🎉
