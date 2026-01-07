# Pollen – Login EcoleDirecte

Interface de connexion (sans signup) au style clair et moderne, inspiré du miel (jaune doux) + un proxy serveur pour se connecter à EcoleDirecte.

## Démarrer

```bash
npm install
cp .env.example .env
npm run dev
```

Puis ouvre http://localhost:3000

## Notes techniques

- La connexion se fait côté serveur via `POST /api/ecoledirecte/login` pour éviter les problèmes de CORS et pour pouvoir stocker le token dans un cookie **httpOnly**.
- Le formulaire attend `identifiant` + `motdepasse` (EcoleDirecte).

