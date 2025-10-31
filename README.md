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

## Présentation du projet

La vidéo de présentation de notre projet est disponible via le lien [suivant](https://teams.microsoft.com/l/meetingrecap?driveId=b%21G3hdvs9-pEiVjQ-WTZVi9mSmTceJaypDqQkDcXD1cQr2KQsNRe1dTbEXriI7iTfs&driveItemId=01LWCFKYWWOSE4XPJSKVBIYT4KKXFGS6RY&sitePath=https%3A%2F%2Ftestipformation-my.sharepoint.com%2F%3Av%3A%2Fg%2Fpersonal%2Fa_tissot_ecole-ipssi_net%2FEdZ0icu9MlVCjE-KVcppejgBih2NjKuRXjgo3CVMHVDl2g&fileUrl=https%3A%2F%2Ftestipformation-my.sharepoint.com%2F%3Av%3A%2Fg%2Fpersonal%2Fa_tissot_ecole-ipssi_net%2FEdZ0icu9MlVCjE-KVcppejgBih2NjKuRXjgo3CVMHVDl2g&threadId=19%3A7798663a-bd21-428e-acec-1af8b8f6831e_86e4d92b-0285-4ea1-885d-9fe03bfb7b85%40unq.gbl.spaces&callId=b703d4e1-816b-4aa0-a39d-654fa9296610&threadType=OneOnOneChat&meetingType=Unknown&subType=RecapSharingLink_RecapChiclet).
