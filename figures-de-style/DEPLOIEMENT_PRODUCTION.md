# 🚀 Guide de Déploiement Production - Revenus Passifs

## Étape 1 : Configuration Stripe (CRITIQUE)

### A. Créer les produits récurrents

1. **Connectez-vous à Stripe Dashboard** : https://dashboard.stripe.com
2. **Allez dans Produits** → Créer un produit
3. **Créez 4 produits** :

```
Produit 1 : Premium Mensuel
- Nom : Premium Mensuel
- Prix : 6,99€
- Type : Récurrent
- Intervalle : Mensuel
- ID : price_premium_monthly

Produit 2 : Premium Annuel
- Nom : Premium Annuel (Économisez 29%)
- Prix : 59,99€
- Type : Récurrent
- Intervalle : Annuel
- ID : price_premium_yearly

Produit 3 : École Mensuel
- Nom : Plan École Mensuel
- Prix : 24,99€
- Type : Récurrent
- Intervalle : Mensuel
- ID : price_school_monthly

Produit 4 : École Annuel
- Nom : Plan École Annuel
- Prix : 199€
- Type : Récurrent
- Intervalle : Annuel
- ID : price_school_yearly
```

### B. Activer Stripe Billing

1. **Settings** → **Billing** → Activer
2. **Customer Portal** → Activer
   - Permettre aux clients de mettre à jour leur carte
   - Permettre annulation (avec délai fin de période)
   - Permettre téléchargement factures

### C. Configurer les webhooks

**URL webhook** : `https://votre-domaine.fr/api/webhooks/stripe`

**Événements à écouter** :

```
✓ customer.subscription.created
✓ customer.subscription.updated
✓ customer.subscription.deleted
✓ invoice.payment_succeeded
✓ invoice.payment_failed
✓ customer.subscription.trial_will_end
```

---

## Étape 2 : Base de données (Supabase - GRATUIT)

### A. Créer le projet

1. **Inscription** : https://supabase.com
2. **Nouveau projet** : "figures-de-style-prod"
3. **Région** : Frankfurt (proche de la France)

### B. Structure de la base (SQL à exécuter)

```sql
-- Table utilisateurs
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  plan VARCHAR(20) DEFAULT 'free',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  premium_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW()
);

-- Table scores
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  attempts INTEGER DEFAULT 1,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Table élèves (pour enseignants)
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP
);

-- Table messages de contact
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table codes promo
CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percent INTEGER NOT NULL,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  max_usage INTEGER,
  active BOOLEAN DEFAULT TRUE
);

-- Table affiliation
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES users(id),
  code VARCHAR(50) UNIQUE NOT NULL,
  commission_percent DECIMAL(5,2) DEFAULT 20.00,
  total_sales DECIMAL(10,2) DEFAULT 0,
  total_commission DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe ON users(stripe_customer_id);
CREATE INDEX idx_scores_user ON scores(user_id);
CREATE INDEX idx_students_teacher ON students(teacher_id);
```

### C. Copier la connection string

**Settings** → **Database** → Copier `Connection string`

---

## Étape 3 : Email Marketing (Brevo - GRATUIT)

### A. Inscription

1. **Site** : https://www.brevo.com/fr/
2. **Plan gratuit** : 300 emails/jour
3. **Vérifier domaine** : Ajouter records DNS

### B. Créer les templates d'emails

**Template 1 : Bienvenue**

```
Sujet : Bienvenue sur Figures de Style ! 🎓
Corps :
Bonjour {{PRENOM}},

Merci de votre inscription ! Vous avez accès gratuitement aux modules 1-2.

👉 Commencez maintenant : [LIEN]

À bientôt,
L'équipe Figures de Style
```

**Template 2 : Rappel J+3**

```
Sujet : Avez-vous testé vos premiers exercices ? 📚
Corps :
Bonjour {{PRENOM}},

Vous êtes inscrit depuis 3 jours. Avez-vous essayé les exercices ?

🎯 2 modules gratuits vous attendent
✨ +500 exemples de figures de style

[Continuer mon apprentissage]
```

**Template 3 : Offre Premium J+7**

```
Sujet : ⏰ Offre limitée : -20% sur Premium
Corps :
Bonjour {{PRENOM}},

Pour votre première semaine, profitez de -20% sur Premium :

✓ Accès aux 33 figures de style
✓ Exercices illimités
✓ Suivi de progression

Code : BIENVENUE20 (expire dans 48h)

[Passer Premium maintenant]
```

### C. Créer les listes de contacts

1. **Contacts** → **Listes**
2. Créer : "Utilisateurs gratuits", "Premium", "École", "Inactifs"

### D. Automatisations (Workflows)

1. **Automation** → **Créer workflow**
2. **Déclencheur** : Nouveau contact dans liste "Gratuits"
3. **Actions** :
   - J+0 : Envoyer Template 1
   - J+3 : Envoyer Template 2
   - J+7 : Envoyer Template 3

---

## Étape 4 : Backend API (Railway - 5€/mois)

### A. Préparer le backend

**Fichier** : `backend/server.js`

```javascript
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Créer session de paiement
app.post("/api/checkout", async (req, res) => {
  const { priceId, userId, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: "https://figures-de-style.fr/success",
      cancel_url: "https://figures-de-style.fr/pricing",
      customer_email: email,
      client_reference_id: userId,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook Stripe
app.post("/api/webhooks/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement
  switch (event.type) {
    case "customer.subscription.created":
    case "invoice.payment_succeeded":
      const subscription = event.data.object;
      // Mettre à jour l'utilisateur dans Supabase
      await supabase
        .from("users")
        .update({
          plan: "premium",
          stripe_subscription_id: subscription.id,
          premium_until: new Date(subscription.current_period_end * 1000),
        })
        .eq("stripe_customer_id", subscription.customer);
      break;

    case "customer.subscription.deleted":
      // Rétrograder l'utilisateur
      await supabase.from("users").update({ plan: "free", stripe_subscription_id: null }).eq("stripe_customer_id", event.data.object.customer);
      break;
  }

  res.json({ received: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

### B. Déployer sur Railway

1. **Inscription** : https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Variables d'environnement** :
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   SUPABASE_URL=https://...
   SUPABASE_KEY=eyJhbG...
   ```
4. **Deploy** → Obtenir l'URL de production

---

## Étape 5 : Monitoring (GRATUIT)

### A. UptimeRobot

1. **Inscription** : https://uptimerobot.com
2. **Add New Monitor**
   - Type : HTTP(s)
   - URL : https://figures-de-style.fr
   - Intervalle : 5 minutes
3. **Alertes** : Email + Discord webhook

### B. Google Analytics 4

1. **Créer propriété** : https://analytics.google.com
2. **Copier ID** : G-XXXXXXXXXX
3. **Ajouter dans Angular** : `src/index.html`

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

---

## Étape 6 : Déploiement Frontend (GRATUIT)

### A. Vercel (recommandé)

1. **Inscription** : https://vercel.com
2. **Import Git Repository**
3. **Configure** :
   ```
   Framework Preset: Angular
   Build Command: npm run build
   Output Directory: dist/figures-de-style/browser
   ```
4. **Environment Variables** :
   ```
   STRIPE_PUBLIC_KEY=pk_live_...
   API_URL=https://votre-backend.railway.app
   ```
5. **Deploy** → Obtenir domaine .vercel.app

### B. Domaine personnalisé (Namecheap ~10€/an)

1. **Acheter** : figures-de-style.fr
2. **Vercel** → Settings → Domains → Add
3. **Configurer DNS** :
   ```
   Type: CNAME
   Host: @
   Value: cname.vercel-dns.com
   ```

---

## Étape 7 : Codes Promo Automatiques

### Dans Stripe Dashboard

1. **Products** → **Coupons** → Create
2. **Créer 4 coupons** :

```
RENTREE2025
- Durée : Du 15 août au 30 septembre
- Réduction : 30%

BLACKFRIDAY2025
- Durée : 25-30 novembre
- Réduction : 40%

NOEL2025
- Durée : 15-31 décembre
- Réduction : 25%

BAC2025
- Durée : 1 mai - 30 juin
- Réduction : 20%
```

---

## Étape 8 : Configuration finale Angular

**Fichier** : `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: "https://votre-backend.railway.app",
  stripePublicKey: "pk_live_VOTRE_CLE",
  supabaseUrl: "https://VOTRE_PROJET.supabase.co",
  supabaseKey: "VOTRE_CLE_PUBLIQUE",
  googleAnalyticsId: "G-XXXXXXXXXX",
};
```

---

## 🎯 Checklist de mise en production

- [ ] Stripe configuré (produits + webhooks)
- [ ] Base de données Supabase créée
- [ ] Backend déployé sur Railway
- [ ] Emails Brevo configurés (templates + automatisations)
- [ ] Frontend déployé sur Vercel
- [ ] Domaine configuré
- [ ] Monitoring UptimeRobot actif
- [ ] Google Analytics installé
- [ ] Codes promo créés
- [ ] Test paiement en mode live
- [ ] Test renouvellement automatique
- [ ] Test annulation abonnement

---

## 💰 Coûts mensuels réels

```
Hébergement backend : 5€ (Railway)
Domaine : 0,80€/mois (10€/an)
Base de données : 0€ (Supabase gratuit jusqu'à 500MB)
Emails : 0€ (Brevo 300 emails/jour gratuit)
Frontend : 0€ (Vercel gratuit)
Monitoring : 0€ (UptimeRobot gratuit)
Analytics : 0€ (Google Analytics gratuit)
Stripe : 2,9% + 0,25€ par transaction

TOTAL FIXE : ~6€/mois
TOTAL VARIABLE : ~3% du CA
```

**Exemple** : Si vous faites 1000€/mois

- Frais Stripe : ~30€
- Frais fixes : 6€
- **Net** : 964€ (96,4%)

---

## 🚀 Lancement et promotion

### Jour du lancement

1. Partager sur LinkedIn / Twitter
2. Post Facebook groupes profs de français
3. Email à votre liste (si existante)
4. Publication sur forums éducatifs

### SEO (long terme passif)

1. Créer 10 articles de blog :
   - "Les 10 figures de style les plus utilisées"
   - "Comment reconnaître une métaphore"
   - etc.
2. Publier sur Medium / LinkedIn
3. Backlinks depuis forums éducatifs

---

**Temps total de setup** : 2-3 jours
**Résultat** : Site autonome qui génère des revenus 24/7 sans votre intervention ! 🎉
