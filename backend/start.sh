#!/bin/bash

echo "🚀 Démarrage du backend Figures de Style"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Vérifier PostgreSQL
echo -e "${BLUE}1. Vérification PostgreSQL...${NC}"
if docker ps | grep -q postgres-figures; then
    echo -e "${GREEN}✅ PostgreSQL déjà en cours d'exécution${NC}"
else
    echo "⏳ Démarrage de PostgreSQL..."
    docker run --name postgres-figures \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=figures_db \
        -p 5432:5432 \
        -d postgres:16
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ PostgreSQL démarré${NC}"
        sleep 3
    else
        # Essayer de le redémarrer s'il existe déjà
        docker start postgres-figures 2>/dev/null
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✅ PostgreSQL redémarré${NC}"
            sleep 3
        else
            echo -e "${RED}❌ Erreur lors du démarrage de PostgreSQL${NC}"
            exit 1
        fi
    fi
fi

echo ""

# 2. Générer Prisma
echo -e "${BLUE}2. Génération du client Prisma...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Client Prisma généré${NC}"
else
    echo -e "${RED}❌ Erreur génération Prisma${NC}"
    exit 1
fi

echo ""

# 3. Créer/Mettre à jour les tables
echo -e "${BLUE}3. Création des tables dans PostgreSQL...${NC}"
npx prisma db push
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Tables créées${NC}"
else
    echo -e "${RED}❌ Erreur création des tables${NC}"
    exit 1
fi

echo ""

# 4. Lancer Prisma Studio en arrière-plan
echo -e "${BLUE}4. Lancement de Prisma Studio...${NC}"
npx prisma studio &
STUDIO_PID=$!
echo -e "${GREEN}✅ Prisma Studio disponible sur http://localhost:5555${NC}"

echo ""

# 5. Démarrer le serveur
echo -e "${BLUE}5. Démarrage du serveur NestJS...${NC}"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Backend prêt !${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "📊 Prisma Studio: ${BLUE}http://localhost:5555${NC}"
echo -e "🚀 API Backend:   ${BLUE}http://localhost:3000/api${NC}"
echo ""
echo -e "Pour tester l'API, utilisez:"
echo -e "  ${BLUE}curl http://localhost:3000/api/auth/signup -X POST -H 'Content-Type: application/json' -d '{\"email\":\"test@test.com\",\"name\":\"Test\",\"password\":\"test123\"}'${NC}"
echo ""

npm run start:dev
