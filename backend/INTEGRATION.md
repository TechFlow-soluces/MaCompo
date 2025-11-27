# Guide d'intégration Front-End ↔ Back-End

Ce document explique comment intégrer le back-end avec votre front-end React/Vue/Angular.

## 🔗 Configuration de base

### 1. Variables d'environnement front-end

Créer un fichier `.env` dans le front-end :

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### 2. Client HTTP (Axios ou Fetch)

#### Option A : Axios

```bash
npm install axios
```

```typescript
// src/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter automatiquement le username
apiClient.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');
  if (username) {
    config.headers['X-Username'] = username;
  }
  return config;
});

export default apiClient;
```

#### Option B : Fetch

```typescript
// src/api/client.ts
const API_URL = import.meta.env.VITE_API_URL;

const getUsername = () => localStorage.getItem('username') || '';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Username': getUsername(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Request failed');
  }

  return response.json();
};
```

## 👤 Gestion de l'utilisateur

### 1. Demander le nom au premier lancement

```typescript
// src/components/WelcomeModal.tsx
import { useState } from 'react';
import apiClient from '../api/client';

function WelcomeModal() {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enregistrer l'utilisateur
      const response = await apiClient.post('/users', { username });

      // Stocker en localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('userId', response.data.data.user.id);

      // Fermer le modal et rafraîchir
      window.location.reload();
    } catch (error) {
      console.error('Erreur création utilisateur:', error);
    }
  };

  return (
    <div className="modal">
      <h2>Bienvenue ! 👋</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre nom (ex: Jo)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Commencer</button>
      </form>
    </div>
  );
}
```

### 2. Afficher "Salut Jo" partout

```typescript
// src/components/Header.tsx
function Header() {
  const username = localStorage.getItem('username') || 'Utilisateur';

  return (
    <header>
      <h1>Tactical Football Board</h1>
      <p>Salut {username} 👋</p>
    </header>
  );
}
```

## ⚽ API des tactiques

### 1. Créer une tactique

```typescript
// src/api/tactics.ts
import apiClient from './client';

export const createTactic = async (name: string, description?: string) => {
  const response = await apiClient.post('/tactics', {
    name,
    description,
  });
  return response.data.data.tactic;
};
```

### 2. Récupérer les tactiques

```typescript
export const getTactics = async () => {
  const response = await apiClient.get('/tactics');
  return response.data.data.tactics;
};
```

### 3. Créer une formation avec joueurs

```typescript
export const createFormation = async (
  tacticId: string,
  name: string,
  players: Array<{
    numero: number;
    nom: string;
    prenom?: string;
    telephone?: string;
    couleur: string;
    positionX: number;
    positionY: number;
  }>
) => {
  const response = await apiClient.post(`/tactics/${tacticId}/formations`, {
    name,
    players,
  });
  return response.data.data.formation;
};
```

## 📱 Convocations SMS

### 1. Prévisualiser les SMS

```typescript
// src/api/convocations.ts
import apiClient from './client';

export const previewConvocations = async (
  formationId: string,
  matchData: {
    matchDate: string;
    matchTime: string;
    location: string;
    opponent?: string;
  }
) => {
  const response = await apiClient.post(
    `/convocations/formations/${formationId}/preview`,
    matchData
  );
  return response.data.data.players;
};
```

### 2. Envoyer les SMS

```typescript
export const sendConvocations = async (
  formationId: string,
  matchData: {
    matchDate: string;
    matchTime: string;
    location: string;
    opponent?: string;
  }
) => {
  const response = await apiClient.post(
    `/convocations/formations/${formationId}/send`,
    matchData
  );
  return response.data.data;
};
```

### 3. Exemple de composant

```typescript
// src/components/ConvocationForm.tsx
import { useState } from 'react';
import { previewConvocations, sendConvocations } from '../api/convocations';

function ConvocationForm({ formationId }: { formationId: string }) {
  const [matchData, setMatchData] = useState({
    matchDate: '',
    matchTime: '',
    location: '',
    opponent: '',
  });
  const [preview, setPreview] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = async () => {
    const result = await previewConvocations(formationId, matchData);
    setPreview(result);
    setShowPreview(true);
  };

  const handleSend = async () => {
    const result = await sendConvocations(formationId, matchData);
    alert(`SMS envoyés : ${result.summary.sent}/${result.summary.total}`);
  };

  return (
    <div>
      <h3>📱 Convoquer les joueurs</h3>
      <input
        type="text"
        placeholder="Date du match"
        value={matchData.matchDate}
        onChange={(e) => setMatchData({ ...matchData, matchDate: e.target.value })}
      />
      <input
        type="text"
        placeholder="Heure"
        value={matchData.matchTime}
        onChange={(e) => setMatchData({ ...matchData, matchTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="Lieu"
        value={matchData.location}
        onChange={(e) => setMatchData({ ...matchData, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Adversaire (optionnel)"
        value={matchData.opponent}
        onChange={(e) => setMatchData({ ...matchData, opponent: e.target.value })}
      />

      <button onClick={handlePreview}>👁️ Prévisualiser</button>
      <button onClick={handleSend}>📤 Envoyer les SMS</button>

      {showPreview && (
        <div>
          <h4>Aperçu des messages :</h4>
          {preview.map((player, i) => (
            <div key={i}>
              <strong>{player.nom} {player.prenom}</strong> ({player.telephone})
              <pre>{player.message}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 🎨 Exemple complet d'intégration

```typescript
// src/App.tsx
import { useEffect, useState } from 'react';
import WelcomeModal from './components/WelcomeModal';
import Header from './components/Header';
import TacticsList from './components/TacticsList';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  // Si pas de username, afficher le modal
  if (!username) {
    return <WelcomeModal />;
  }

  // Sinon, afficher l'app
  return (
    <div>
      <Header />
      <TacticsList />
    </div>
  );
}

export default App;
```

## 🔄 Gestion d'erreurs

```typescript
// src/api/client.ts
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Username invalide ou manquant
      localStorage.removeItem('username');
      window.location.reload();
    }

    if (error.response?.status === 404) {
      alert('Ressource introuvable');
    }

    if (error.response?.status === 500) {
      alert('Erreur serveur, veuillez réessayer');
    }

    return Promise.reject(error);
  }
);
```

## 📝 Types TypeScript (optionnel mais recommandé)

```typescript
// src/types/api.ts
export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface Tactic {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  id: string;
  numero: number;
  nom: string;
  prenom?: string;
  telephone?: string;
  couleur: string;
  positionX: number;
  positionY: number;
  formationId: string;
}

export interface Formation {
  id: string;
  name: string;
  tacticId: string;
  players: Player[];
  createdAt: string;
  updatedAt: string;
}

export interface ConvocationResult {
  message: string;
  summary: {
    total: number;
    sent: number;
    failed: number;
  };
  details: Array<{
    player: string;
    status: string;
    error?: string;
  }>;
}
```

## ✅ Checklist d'intégration

- [ ] Configurer `VITE_API_URL` dans `.env`
- [ ] Créer le client HTTP avec header `X-Username`
- [ ] Implémenter le modal de bienvenue
- [ ] Stocker le username dans localStorage
- [ ] Afficher "Salut {username}" dans le header
- [ ] Implémenter les appels API pour les tactiques
- [ ] Implémenter le système de convocation SMS
- [ ] Gérer les erreurs API
- [ ] Tester en local avec le back-end

## 🚀 Conseils

1. **Mode développement** : Toujours lancer le back-end AVANT le front-end
2. **CORS** : Vérifier que `CORS_ORIGIN` dans le `.env` du back correspond à l'URL du front
3. **SMS** : Commencer par tester avec `SMS_ENABLED=false` et `/preview` avant d'activer Twilio
4. **Cache** : Le username est dans localStorage, donc persiste entre rechargements
5. **Debug** : Ouvrir les DevTools > Network pour voir les requêtes API

Bon courage pour l'intégration ! 🎉
