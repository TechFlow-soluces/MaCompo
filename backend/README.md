# Tactical Football Board - API Backend

API REST ultra-simple pour gérer les tactiques de football et envoyer des convocations SMS automatiques.

## 🎯 Fonctionnalités

- **Gestion d'utilisateurs simple** : Pas d'authentification complexe, juste un nom d'utilisateur
- **Tactiques et formations** : Créer, modifier, supprimer des tactiques avec leurs formations
- **Joueurs** : Gérer les joueurs avec numéro, nom, prénom, téléphone, position
- **Convocations SMS** : Envoyer automatiquement des SMS à 14 joueurs sélectionnés (via Twilio)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+
- npm 10+

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier .env
cp .env.example .env

# 3. Configurer la base de données
npx prisma generate
npx prisma db push

# 4. Lancer en développement
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## 🔧 Configuration (.env)

```env
# Application
NODE_ENV=development
PORT=3000

# Database (SQLite par défaut)
DATABASE_URL="file:./dev.db"

# CORS (URL du front-end)
CORS_ORIGIN=http://localhost:5173

# SMS (optionnel - Twilio)
SMS_ENABLED=false
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+33123456789
```

### Configuration SMS (Twilio)

Pour activer l'envoi de SMS :

1. Créer un compte sur [Twilio](https://www.twilio.com/)
2. Récupérer le `Account SID` et `Auth Token`
3. Acheter un numéro de téléphone Twilio
4. Mettre à jour le `.env` :

```env
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+33123456789
```

## 📡 API Endpoints

### Base URL
`http://localhost:3000/api/v1`

### Health Check
```http
GET /health
```

### 1. Utilisateurs

#### Créer/Récupérer un utilisateur
```http
POST /users
Content-Type: application/json

{
  "username": "Jo"
}
```

### 2. Tactiques

**⚠️ Important** : Toutes les routes tactiques nécessitent le header `X-Username`

#### Créer une tactique
```http
POST /tactics
X-Username: Jo
Content-Type: application/json

{
  "name": "4-3-3 Offensive",
  "description": "Formation offensive avec ailiers rapides"
}
```

#### Récupérer toutes les tactiques
```http
GET /tactics
X-Username: Jo
```

#### Récupérer une tactique
```http
GET /tactics/:id
X-Username: Jo
```

#### Modifier une tactique
```http
PUT /tactics/:id
X-Username: Jo
Content-Type: application/json

{
  "name": "4-4-2 Défensif",
  "description": "Formation défensive"
}
```

#### Supprimer une tactique
```http
DELETE /tactics/:id
X-Username: Jo
```

### 3. Formations

#### Créer une formation avec joueurs
```http
POST /tactics/:tacticId/formations
X-Username: Jo
Content-Type: application/json

{
  "name": "Équipe A",
  "players": [
    {
      "numero": 1,
      "nom": "Dupont",
      "prenom": "Jean",
      "telephone": "+33612345678",
      "couleur": "#FF0000",
      "positionX": 50,
      "positionY": 10
    },
    {
      "numero": 2,
      "nom": "Martin",
      "prenom": "Pierre",
      "telephone": "+33687654321",
      "couleur": "#0000FF",
      "positionX": 30,
      "positionY": 30
    }
    // ... jusqu'à 14 joueurs
  ]
}
```

### 4. Convocations SMS

#### Prévisualiser les SMS (sans envoyer)
```http
POST /convocations/formations/:formationId/preview
X-Username: Jo
Content-Type: application/json

{
  "matchDate": "Samedi 30 Novembre 2025",
  "matchTime": "15h00",
  "location": "Stade Municipal",
  "opponent": "AS Lyon"
}
```

**Réponse exemple :**
```json
{
  "success": true,
  "data": {
    "players": [
      {
        "nom": "Dupont",
        "prenom": "Jean",
        "telephone": "+33612345678",
        "message": "⚽ CONVOCATION\n\nBonjour Jean Dupont,\n\nVous êtes convoqué(e) pour le match :\n\n📅 Date : Samedi 30 Novembre 2025\n🕐 Heure : 15h00\n📍 Lieu : Stade Municipal\n🆚 Adversaire : AS Lyon\n\nMerci de confirmer votre présence..."
      }
    ]
  }
}
```

#### Envoyer les SMS de convocation
```http
POST /convocations/formations/:formationId/send
X-Username: Jo
Content-Type: application/json

{
  "matchDate": "Samedi 30 Novembre 2025",
  "matchTime": "15h00",
  "location": "Stade Municipal",
  "opponent": "AS Lyon"
}
```

**Réponse exemple :**
```json
{
  "success": true,
  "data": {
    "message": "Convocations sent",
    "summary": {
      "total": 14,
      "sent": 14,
      "failed": 0
    },
    "details": [
      {
        "player": "Jean Dupont",
        "status": "sent"
      }
    ]
  }
}
```

## 🐳 Docker

### Build et lancement
```bash
# Avec Docker Compose
docker-compose up -d

# Build manuel
docker build -t tactical-football-api .
docker run -p 3000:3000 tactical-football-api
```

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Avec couverture
npm test -- --coverage
```

## 📝 Scripts disponibles

```bash
npm run dev          # Développement avec hot-reload
npm run build        # Build production
npm start            # Lancer en production
npm test             # Tests Jest
npm run lint         # ESLint
npm run format       # Prettier
npm run db:push      # Synchro DB sans migration
npm run db:migrate   # Créer une migration
npm run db:studio    # Ouvrir Prisma Studio
```

## 🏗️ Architecture

```
backend/
├── src/
│   ├── config/          # Configuration (env, database)
│   ├── controllers/     # Contrôleurs (logique HTTP)
│   ├── middlewares/     # Middlewares Express
│   ├── routes/          # Définition des routes
│   ├── services/        # Logique métier
│   ├── types/           # Types TypeScript
│   ├── utils/           # Utilitaires
│   ├── app.ts           # Configuration Express
│   └── server.ts        # Point d'entrée
├── prisma/
│   └── schema.prisma    # Schéma de base de données
└── tests/               # Tests unitaires et d'intégration
```

## 🔒 Sécurité

- **Helmet** : Protection des headers HTTP
- **CORS** : Configuration stricte
- **Rate Limiting** : 100 req/min par IP
- **Validation** : Zod pour valider toutes les entrées
- **SQLite** : Pas d'injection SQL grâce à Prisma

## 📊 Base de données

### Modèle

- **User** : id, username
- **Tactic** : id, name, description, userId
- **Formation** : id, name, tacticId
- **Player** : id, numero, nom, prenom, telephone, couleur, positionX, positionY, formationId

### Prisma Studio

Pour explorer visuellement la base de données :
```bash
npm run db:studio
```

## 🚨 Troubleshooting

### Erreur "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Erreur Prisma
```bash
# Régénérer le client
npx prisma generate

# Reset la DB
npx prisma db push --force-reset
```

### SMS ne s'envoient pas
- Vérifier que `SMS_ENABLED=true`
- Vérifier les credentials Twilio
- Vérifier le format des numéros (+33...)
- Regarder les logs serveur

## 📞 Support

Pour toute question technique, consulter :
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Express](https://expressjs.com/)
- [Documentation Twilio](https://www.twilio.com/docs)

## 📄 Licence

MIT
