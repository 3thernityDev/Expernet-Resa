# 🚀 Expernet-Resa [![🧪 Tests Backend](https://github.com/3thernityDev/Expernet-Resa/actions/workflows/test.yml/badge.svg)](https://github.com/3thernityDev/Expernet-Resa/actions/workflows/test.yml) [![🐳 Build Docker Images](https://github.com/3thernityDev/Expernet-Resa/actions/workflows/docker-build.yml/badge.svg)](https://github.com/3thernityDev/Expernet-Resa/actions/workflows/docker-build.yml)

Un petit projet de formation pour apprendre Docker en environnement multi-conteneurs : un frontend statique servi par Nginx, une API Node.js/Express et une base MariaDB gérée via Sequelize.

---

## 🎯 Objectif

Fournir un exemple simple d'application de réservation de salles avec :

-   un backend REST (Node.js + Express + Sequelize)
-   une base de données MariaDB
-   un frontend statique (HTML/CSS/JS) servi par Nginx

Le tout orchestré avec Docker Compose pour un environnement de développement reproductible.

---

## ⚙️ Stack technique

-   Backend : Node.js, Express, Sequelize
-   Base : MariaDB
-   Frontend : HTML / CSS / JavaScript (Axios)
-   Web : Nginx (frontend statique)

---

## 🧩 Structure du projet

Racine du projet :

```
.
├── backend/
│   ├── Dockerfile
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controller/   # contrôleurs Express
│   └── config/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── docker-compose.yml
└── readme.md
```

---

## ✅ Prérequis

-   Docker & Docker Compose installés
-   Git (pour cloner le repo)

---

## 🔧 Installation & lancement (développeur)

1. Cloner le dépôt :

```powershell
git clone https://github.com/ton-pseudo/expernet-resa.git ; cd expernet-resa
```

2. Créer un fichier `.env` à la racine (exemple) :

```
MYSQL_ROOT_PASSWORD=changeme
MYSQL_USER=user
MYSQL_PASSWORD=pass
MYSQL_DATABASE=reservations
API_PORT=3000
```

3. Lancer l'environnement :

```powershell
docker-compose up -d --build
```

Services accessibles :

-   Frontend : http://localhost:8080
-   API : http://localhost:3000/api/reservations

Notes :

-   Si vous modifiez le code backend/localement, montez le dossier `./backend` en volume dans `docker-compose.yml` pour éviter de rebuild l'image à chaque changement (utile avec nodemon).

---

## 🧭 Endpoints principaux

-   GET /api/reservations — liste toutes les réservations
-   POST /api/reservations — crée une réservation

Payload attendu (exemple POST) :

```json
{
    "room": "Salle A",
    "user": "Julie",
    "startTime": "2025-10-14T09:00:00.000Z",
    "endTime": "2025-10-14T10:00:00.000Z",
    "comment": "Réunion équipe"
}
```

---

## 🧰 Commandes utiles

```powershell
# Lancer les conteneurs (build si nécessaire)
docker-compose up -d --build

# Lancer sans rebuild (rapide)
docker-compose up -d

# Voir les logs d'un service
docker-compose logs -f api
docker-compose logs -f frontend

# Arrêter
docker-compose down

# Supprimer aussi les volumes (perd les données)
docker-compose down -v
```

---
