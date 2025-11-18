# Dernier Métro

Petit projet d'API pour récupérer des infos sur le métro (dernier métro et prochain).

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

Il y a un peu de seed SQL dans le dossier db.
