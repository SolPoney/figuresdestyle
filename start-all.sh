#!/bin/bash

echo "🚀 Démarrage de l'application Figures de Style"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Tuer les processus existants sur les ports
echo "🧹 Nettoyage des processus existants..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:4200 | xargs kill -9 2>/dev/null
lsof -ti:5555 | xargs kill -9 2>/dev/null
sleep 2

# Créer le dossier pour les logs
mkdir -p /tmp/figures-logs

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📦 Démarrage du Backend NestJS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "backend"
npm run start:dev > /tmp/figures-logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "PID: $BACKEND_PID"
sleep 15

# Vérifier que le backend démarre
if curl -s http://localhost:3000/api > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Backend démarré sur http://localhost:3000/api${NC}"
else
  echo -e "${RED}❌ Erreur: Backend ne répond pas${NC}"
  echo "Logs: tail -f /tmp/figures-logs/backend.log"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🎨 Démarrage du Frontend Angular${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "../figures-de-style"
npm start > /tmp/figures-logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "PID: $FRONTEND_PID"
sleep 15

# Vérifier que le frontend démarre
if curl -s http://localhost:4200 > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Frontend démarré sur http://localhost:4200${NC}"
else
  echo -e "${RED}❌ Erreur: Frontend ne répond pas${NC}"
  echo "Logs: tail -f /tmp/figures-logs/frontend.log"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Démarrage de Prisma Studio${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "../backend"
npx prisma studio > /tmp/figures-logs/prisma.log 2>&1 &
PRISMA_PID=$!
echo "PID: $PRISMA_PID"
sleep 5

# Vérifier que Prisma Studio démarre
if curl -s http://localhost:5555 > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Prisma Studio démarré sur http://localhost:5555${NC}"
else
  echo -e "${RED}❌ Erreur: Prisma Studio ne répond pas${NC}"
  echo "Logs: tail -f /tmp/figures-logs/prisma.log"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Tous les serveurs sont démarrés !${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 URLs disponibles :"
echo "   🔙 Backend:       http://localhost:3000/api"
echo "   🎨 Frontend:      http://localhost:4200"
echo "   📊 Prisma Studio: http://localhost:5555"
echo ""
echo "📝 Logs disponibles :"
echo "   Backend:  tail -f /tmp/figures-logs/backend.log"
echo "   Frontend: tail -f /tmp/figures-logs/frontend.log"
echo "   Prisma:   tail -f /tmp/figures-logs/prisma.log"
echo ""
echo "🛑 Pour arrêter tous les serveurs :"
echo "   kill $BACKEND_PID $FRONTEND_PID $PRISMA_PID"
echo ""
echo "💡 Ouvrez votre navigateur sur http://localhost:4200"
echo ""

# Garder le script actif
echo "Appuyez sur Ctrl+C pour arrêter tous les serveurs..."
trap "kill $BACKEND_PID $FRONTEND_PID $PRISMA_PID 2>/dev/null; echo 'Serveurs arrêtés'; exit" INT TERM

# Attendre indéfiniment
wait
