# 🔗 Comment trouver votre Connection String Supabase

## Étape 1 : Créer un compte Supabase

1. Allez sur **https://supabase.com**
2. Cliquez sur **"Start your project"**
3. Connectez-vous avec GitHub (ou créez un compte)

## Étape 2 : Créer un projet

1. Cliquez sur **"New Project"**
2. Remplissez :
   - **Name** : `figures-de-style`
   - **Database Password** : Choisissez un mot de passe (NOTEZ-LE !)
   - **Region** : Frankfurt (le plus proche)
   - **Pricing Plan** : Free (gratuit)
3. Cliquez sur **"Create new project"**
4. ⏳ Attendez 2-3 minutes (création du projet)

## Étape 3 : Trouver la Connection String

1. Une fois le projet créé, cliquez sur **"Settings"** (⚙️ en bas à gauche)
2. Cliquez sur **"Database"** dans le menu de gauche
3. Scrollez jusqu'à **"Connection string"**
4. Sélectionnez l'onglet **"URI"**
5. Cochez **"Use connection pooling"**
6. Vous verrez quelque chose comme :

```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

7. **IMPORTANT** : Remplacez `[YOUR-PASSWORD]` par le mot de passe que vous avez choisi à l'étape 2

## Étape 4 : Copier dans votre .env

Remplacez cette ligne dans `backend/.env` :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/figures_db?schema=public"
```

Par votre connection string Supabase :

```env
DATABASE_URL="postgresql://postgres.xxxxxxxxxxxxx:VOTRE_MOT_DE_PASSE@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## Étape 5 : Tester la connexion

```bash
cd backend
npx prisma generate
npx prisma db push
```

Si tout fonctionne, vous verrez :

```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema.
```

---

## 📸 Captures d'écran du chemin

```
Supabase Dashboard
    ↓
⚙️ Settings (barre latérale gauche)
    ↓
🗄️ Database
    ↓
📋 Connection string
    ↓
URI (onglet)
    ↓
☑️ Use connection pooling
    ↓
📋 Copier la string
```

---

## ❓ Problèmes courants

**Je ne vois pas "Connection string"**
→ Votre projet n'est pas encore créé, attendez 2-3 minutes

**Erreur "password authentication failed"**
→ Vous n'avez pas remplacé `[YOUR-PASSWORD]` par votre vrai mot de passe

**Erreur de connexion**
→ Vérifiez que vous avez bien coché "Use connection pooling"

---

## 💡 Alternative : PostgreSQL local avec apt

Si vous préférez ne pas utiliser Supabase :

```bash
# Installer PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Démarrer
sudo service postgresql start

# Créer la base
sudo -u postgres psql -c "CREATE DATABASE figures_db;"
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"

# Votre DATABASE_URL reste :
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/figures_db?schema=public"
```

Puis :

```bash
npx prisma generate
npx prisma db push
```

---

Dites-moi si vous avez besoin d'aide à une étape particulière ! 🚀
