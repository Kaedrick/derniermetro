# Dernier Métro

Petit projet API de récup des infos sur le dernier / prochain métro.

## Lancer le projet

```bash
docker compose up -d
```

API sur http://localhost:5000

## Routes

- GET /health
- GET /db-health
- GET /last-metro?station=...
- GET /next-metro?station=...

J’ai mis quelques données de test dans les fichiers SQL du dossier db/ pour remplir la base au démarrage.

Routes utiles :
- `/health`
- `/db-health`
- `/last-metro?station=République`
- `/next-metro?station=République`

---

## Base de données

La base tourne avec PostgreSQL dans Docker.  
Au 1er démarrage, Postgres exécute automatiquement les fichiers SQL du dossier `db/`.

Contenu du dossier `db/` :
- `01_schema.sql` : crée les tables (`stations`, `headways`, `last_metro`)
- `02_seed.sql` : insère quelques stations + fréquences + heures du dernier métro

La seed est assez simple, juste pour tester les routes.

---

## API

L’API est faite en Node.js + Express.  
Le fichier principal est `api/src/index.js`.  
Il y a un petit pool PostgreSQL dans `api/src/db.js`.

### Routes principales

**GET /last-metro?station=Nom**
- renvoie l’heure du dernier métro pour la station

**GET /next-metro?station=Nom**
- calcule l’heure du prochain métro en ajoutant la fréquence (headway)

Si la station n’existe pas : 404.  
Si la base ne répond pas : 500.

---

## Documentation OpenAPI

Le fichier `openapi.yaml` contient une doc basique pour les différentes routes, suffisant pour test sur Swagger;

---

## Tests

Il y a deux petits dossiers de tests :
- `tests/time.test.js` → tests unitaires sur le calcul des heures
- `tests/api.test.js` → test API un peu minimal

Pour lancer les tests :
`cd api
npm install
npm test`

## 🛠️ Mode staging

Il y a un fichier :

docker-compose.staging.yml


Ça lance l’API en mode staging sur le port 5001 :

docker compose -f docker-compose.staging.yml up -d


---

## Production (blue/green)

Le fichier :

docker-compose.prod.yml


lance deux versions de l’API :
- blue → port 5002
- green → port 5003

---

## CI/CD

`.gitlab-ci.yml` avec deux étapes :
- tests
- build Docker


---


