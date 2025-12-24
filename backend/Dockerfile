# Étape 1 : Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Générer Prisma Client
RUN npx prisma generate

# Build l'application
RUN npm run build

# Étape 2 : Production
FROM node:20-alpine

WORKDIR /app

# Copier les dépendances de production
COPY package*.json ./
RUN npm ci --only=production

# Copier le build et Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
