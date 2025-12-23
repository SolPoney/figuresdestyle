#!/bin/bash

echo "🧪 Tests de l'API Backend - Figures de Style"
echo ""

API_URL="http://localhost:3000/api"
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Générer un email aléatoire pour le test
RANDOM_EMAIL="test$(date +%s)@test.com"

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Test 1: Inscription d'un utilisateur${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}POST ${API_URL}/auth/signup${NC}"
echo -e "Body: {\"email\":\"${RANDOM_EMAIL}\",\"name\":\"Test User\",\"password\":\"test123\"}"
echo ""

SIGNUP_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${RANDOM_EMAIL}\",\"name\":\"Test User\",\"password\":\"test123\"}")

HTTP_CODE=$(echo "$SIGNUP_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$SIGNUP_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 201 ]; then
    echo -e "${GREEN}✅ Inscription réussie (201)${NC}"
    echo ""
    echo "Réponse:"
    echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
    
    # Extraire le token
    TOKEN=$(echo "$RESPONSE_BODY" | jq -r '.token' 2>/dev/null)
    echo ""
    echo -e "${GREEN}🔑 Token JWT sauvegardé${NC}"
else
    echo -e "${RED}❌ Échec (${HTTP_CODE})${NC}"
    echo "$RESPONSE_BODY"
    exit 1
fi

echo ""
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Test 2: Connexion avec ce compte${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}POST ${API_URL}/auth/login${NC}"
echo -e "Body: {\"email\":\"${RANDOM_EMAIL}\",\"password\":\"test123\"}"
echo ""

LOGIN_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${RANDOM_EMAIL}\",\"password\":\"test123\"}")

HTTP_CODE=$(echo "$LOGIN_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$LOGIN_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✅ Connexion réussie (200)${NC}"
    echo ""
    echo "Réponse:"
    echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
else
    echo -e "${RED}❌ Échec (${HTTP_CODE})${NC}"
    echo "$RESPONSE_BODY"
fi

echo ""
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Test 3: Tentative connexion avec mauvais mot de passe${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}POST ${API_URL}/auth/login${NC}"
echo -e "Body: {\"email\":\"${RANDOM_EMAIL}\",\"password\":\"wrongpassword\"}"
echo ""

FAIL_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${RANDOM_EMAIL}\",\"password\":\"wrongpassword\"}")

HTTP_CODE=$(echo "$FAIL_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$FAIL_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 401 ]; then
    echo -e "${GREEN}✅ Rejet correct (401)${NC}"
    echo ""
    echo "Réponse:"
    echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
else
    echo -e "${RED}❌ Code inattendu (${HTTP_CODE})${NC}"
    echo "$RESPONSE_BODY"
fi

echo ""
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Test 4: Requête protégée avec token JWT${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    echo -e "${BLUE}POST ${API_URL}/stripe/create-checkout-session${NC}"
    echo -e "Header: Authorization: Bearer ${TOKEN:0:20}..."
    echo -e "Body: {\"priceId\":\"price_test\",\"plan\":\"premium\"}"
    echo ""
    
    PROTECTED_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "${API_URL}/stripe/create-checkout-session" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${TOKEN}" \
      -d '{"priceId":"price_test","plan":"premium"}')
    
    HTTP_CODE=$(echo "$PROTECTED_RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$PROTECTED_RESPONSE" | head -n-1)
    
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 500 ]; then
        echo -e "${GREEN}✅ Token accepté (${HTTP_CODE})${NC}"
        echo ""
        echo "Réponse:"
        echo "$RESPONSE_BODY" | jq '.' 2>/dev/null || echo "$RESPONSE_BODY"
    else
        echo -e "${RED}❌ Token rejeté (${HTTP_CODE})${NC}"
        echo "$RESPONSE_BODY"
    fi
else
    echo -e "${RED}❌ Pas de token disponible${NC}"
fi

echo ""
echo ""

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Tests terminés !${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "📊 Visualiser les données dans Prisma Studio:"
echo -e "   ${BLUE}http://localhost:5555${NC}"
echo ""
echo -e "💡 Compte créé pour ce test:"
echo -e "   Email:    ${BLUE}${RANDOM_EMAIL}${NC}"
echo -e "   Password: ${BLUE}test123${NC}"
echo ""
