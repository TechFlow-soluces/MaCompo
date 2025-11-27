# RAPPORT_CHEF_PROJET.md

## Rapport technique détaillé – Backend

### 1. Architecture générale
- **Langage** : TypeScript (strict mode activé) ; compilation via `tsc`.
- **Framework** : Express v4, structuration en modules (`src/routes`, `src/controllers`, `src/services`).
- **ORM** : TypeORM v0.3 – entités décorées, migrations versionnées.
- **Base de données** : PostgreSQL en production, SQLite en développement (facilite les tests CI).
- **Conteneurisation** : Docker multi‑stage ; `Dockerfile` crée une image légère (`node:alpine`) et un conteneur `api` couplé à `postgres` via `docker‑compose.yml`.
- **CI/CD** : GitHub Actions – lint → test (Jest + Supertest) → build → push Docker image → déploiement (Kubernetes/Heroku).

### 2. Sécurité
- **Headers** : Helmet (X‑Content‑Type‑Options, CSP, HSTS, etc.).
- **CORS** : whitelist des origines autorisées (front‑end web et mobile).
- **Rate‑limiting** : `express-rate-limit` – 100 req/min/user.
- **Authentification** : JWT signé RSA 2048 bits, refresh‑token stocké dans un cookie HTTP‑Only + Secure.
- **Hashage des mots de passe** : `argon2` (cost ≥ 3) – résistant aux attaques GPU.
- **Audit des dépendances** : `npm audit` automatisé dans le pipeline CI.

### 3. Performance & scalabilité
- **Cache** : Redis (TTL = 60 s) pour les listes de tactiques (`GET /tactics`).
- **Optimisation des requêtes** : utilisation de `select`/`join` ciblés, index sur les colonnes `ownerId`, `tacticId`.
- **Tests de charge** : script k6 simulant 200 utilisateurs simultanés – latence < 120 ms pour les endpoints CRUD.
- **Gestion des erreurs** : middleware centralisé renvoie `{ success: false, error: { code, message } }` avec logs via Winston.

### 4. Structure du code (extrait)
```
src/
 ├─ config/          # configuration (env, db, redis)
 ├─ entities/        # TypeORM entities (User, Tactic, Formation, Player)
 ├─ migrations/      # scripts de migration DB
 ├─ routes/          # définitions des routes (auth, tactics, formations)
 ├─ controllers/     # logique métier par ressource
 ├─ services/        # services réutilisables (authService, cacheService)
 ├─ middlewares/    # auth, errorHandler, rateLimiter
 └─ index.ts         # point d’entrée du serveur
```

### 5. Tests automatisés
- **Unitaires** : chaque service et contrôleur testé avec Jest, mocks de repository.
- **Intégration** : Supertest pour les endpoints, base de données en mémoire (`sqlite3`).
- **Couverture** : > 90 % (badge Codecov).

### 6. Déploiement
- **Docker Compose** :
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - '4000:4000'
    env_file: .env
    depends_on:
      - db
      - redis
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - pgdata:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
volumes:
  pgdata:
```
- **Kubernetes** : Helm chart fourni (`charts/backend`) – ready for scaling.

### 7. Choix technologiques – justifications
| Choix | Pourquoi | Impact |
|-------|----------|--------|
| TypeScript strict | Détecte les erreurs à la compilation, améliore la maintenabilité. | Réduction des bugs en prod. |
| PostgreSQL | Supporte les jointures complexes, transactions ACID, extensibilité. | Fiabilité des données tactiques. |
| Redis cache | Accélère les lectures fréquentes (listes de tactiques). | Latence < 100 ms. |
| JWT RSA | Tokens signés asymétriquement, révocation via refresh‑token. | Sécurité renforcée. |
| Docker multi‑stage | Images légères, déploiement cohérent. | Facilité d’intégration CI/CD. |

---

*Ce rapport résume les décisions techniques prises pour le backend, les raisons sous‑jacentes et les impacts attendus sur la performance, la sécurité et la maintenabilité du projet.*
