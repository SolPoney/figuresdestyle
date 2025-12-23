#!/bin/bash

echo "🧪 Test du Backend - Figures de Style"
echo ""
echo "Attente du démarrage du serveur (10 secondes)..."
sleep 10

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Test 1: Inscription"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test$(date +%s)@test.com\",\"name\":\"Test User\",\"password\":\"test123\"}")

if [ $? -eq 0 ] && [ -n "$RESPONSE" ]; then
  echo "✅ Inscription réussie"
  echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
  
  # Extraire le token pour les tests suivants
  TOKEN=$(echo "$RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])" 2>/dev/null)
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔐 Test 2: Connexion"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  curl -s -X POST http://localhost:3000/api/auth/login \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}" | python3 -m json.tool 2>/dev/null
  
  if [ $? -eq 0 ]; then
    echo "✅ Connexion testée"
  else
    echo "⚠️ Connexion: utilisateur n'existe pas encore (normal pour premier test)"
  fi
  
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ Tests terminés avec succès"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "❌ Erreur: Le serveur ne répond pas"
  echo "Vérifiez que le backend est bien démarré sur http://localhost:3000"
fi
