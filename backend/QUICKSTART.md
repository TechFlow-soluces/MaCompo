# 🚀 Quick Start - Démarrage en 5 minutes

Guide ultra-rapide pour lancer l'API et faire un premier test.

## ⚡ Installation express

```bash
# 1. Aller dans le dossier backend
cd backend

# 2. Installer les dépendances
npm install

# 3. Générer Prisma et créer la DB
npx prisma generate
npx prisma db push

# 4. Lancer le serveur
npm run dev
```

✅ **Le serveur est lancé !** → `http://localhost:3000`

---

## 🧪 Test rapide avec curl

### 1️⃣ Health check

```bash
curl http://localhost:3000/api/v1/health
```

**Réponse attendue :**
```json
{
  "status": "ok",
  "timestamp": "2025-11-26T...",
  "version": "v1"
}
```

### 2️⃣ Créer un utilisateur

```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"Jo\"}"
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-123",
      "username": "Jo",
      "createdAt": "..."
    }
  }
}
```

### 3️⃣ Créer une tactique

```bash
curl -X POST http://localhost:3000/api/v1/tactics \
  -H "Content-Type: application/json" \
  -H "X-Username: Jo" \
  -d "{\"name\":\"4-3-3\",\"description\":\"Formation offensive\"}"
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "tactic": {
      "id": "uuid-456",
      "name": "4-3-3",
      "description": "Formation offensive",
      "userId": "uuid-123",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
}
```

### 4️⃣ Créer une formation avec joueurs

```bash
curl -X POST http://localhost:3000/api/v1/tactics/uuid-456/formations \
  -H "Content-Type: application/json" \
  -H "X-Username: Jo" \
  -d '{
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
    ]
  }'
```

### 5️⃣ Prévisualiser un SMS de convocation

```bash
curl -X POST http://localhost:3000/api/v1/convocations/formations/uuid-789/preview \
  -H "Content-Type: application/json" \
  -H "X-Username: Jo" \
  -d '{
    "matchDate": "Samedi 30 Novembre 2025",
    "matchTime": "15h00",
    "location": "Stade Municipal",
    "opponent": "AS Lyon"
  }'
```

**Réponse :** Messages SMS prévisualisés pour chaque joueur

---

## 🔍 Explorer la base de données

Ouvrir une interface graphique pour voir les données :

```bash
npm run db:studio
```

➡️ Ouvre `http://localhost:5555` dans le navigateur

---

## 🐛 Problèmes courants

### Port 3000 déjà utilisé

**Windows :**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Linux/Mac :**
```bash
lsof -ti:3000 | xargs kill
```

### Erreur Prisma

```bash
npx prisma generate
npx prisma db push --force-reset
```

### SMS ne marchent pas

➡️ **C'est normal !** Par défaut `SMS_ENABLED=false`

Pour tester les SMS sans les envoyer, utilisez `/preview` au lieu de `/send`

---

## 📱 Activer les SMS (optionnel)

1. Créer un compte sur [Twilio](https://www.twilio.com/try-twilio)
2. Récupérer :
   - Account SID
   - Auth Token
   - Acheter un numéro de téléphone
3. Modifier `.env` :

```env
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+33123456789
```

4. Relancer le serveur :

```bash
npm run dev
```

---

## ✅ Vous êtes prêt !

L'API fonctionne. Maintenant :

1. **Front-end ?** → Lire `INTEGRATION.md`
2. **Documentation complète ?** → Lire `README.md`
3. **Rapport pour le chef ?** → `RAPPORT_CHEF_PROJET.md`

---

🎉 **Bon développement !**
