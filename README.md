# Projet tripa_ipssi

## Description

Ce projet a été développé dans le cadre du cours : API Python, Django RESTful.
Il consiste en une application web permettant de visualiser et compiler les informations mises à dispositions par l'API : https://www.data.gouv.fr/dataservices/api-annuaire-de-ladministration-et-des-services-publics/

## Architecture du projet

Le projet est divisé en deux parties principales :

```
project-root/
│
├── backend/ # API Django REST Framework
│ ├── manage.py
│ ├── requirements.txt
│ ├── annuaire_service_public/
│ └── ...
│
└── frontend/ # Application React
├── package.json
├── src/
└── ...
```

## Technologies utilisées

### Backend (Python)

-   Django
-   Django REST Framework
-   SQLite
-   Corsheaders
-   django_filters
-   drf_yasg

### Frontend (React)

-   Bootstrap
-   Leaflet
-   React 19.1.1
-   React Bootstrap
-   React-ions
-   React-router 7.9.5

## Installation et exécution

Pour lancer le backend :

```bash
cd backend/
python manage.py runserver 8080
```

Pour lancer le frontend :

```bash
cd front/
npm run dev
```

L'application sera alors accessible sur le port : http://localhost:5173/
