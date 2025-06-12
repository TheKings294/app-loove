# 🧠 Documentation technique – Clink

## 📐 Architecture du projet

L'application Clink est découpée en deux grandes parties distinctes :

```
clink/
├── api/
│ ├── Controller/
│ ├── Model/
│ ├── Repository/
│ └── index.php
├── interface-client/
│ ├── assets/
│ ├── controllers/
│ ├── model/
│ ├── views/
│ └── index.html
│── interface-admin/
│ ├── assets/
│ ├── controllers/
│ ├── model/
│ ├── views/
│ └── index.html
└── README.md
```

---

## 🖥️ Back-end

- **Langage** : PHP 8+
- **Paradigme** : Programmation orientée objet
- **Structure MVC simplifiée** :
  - `Controller/` : traite les requêtes HTTP, appelle les repositories
  - `Model/` : représente les entités (User, Admin, Conversation, etc.)
  - `Repository/` : gère les interactions avec MySQL
- **Sécurité** :
  - Hashages des mot de passe en `Bcrypt`
  - Requêtes préparées via `PDO` pour éviter les injections SQL

---

## 🌐 Front-end

- **Langage** : JavaScript (sans framework)
- **Paradigme** : Programmation orientée objet (chaque composant est une classe)
- **Fonctionnalités clés** :
  - Appels API vers le back-end en `fetch`
  - Affichage conditionnel (connexion, erreurs, match)

---

## Les Domaines

A ajouté au hosts de votre machine pour que le projet marche

```txt
1270.0.0.1 clink.test
1270.0.0.1 admin.clink.test
1270.0.0.1 api.clink.test
```

Tous les dommaines sont en https pour plus de sécurité, et pour permettre l'utilisation de pusher et de paypal pour le paiment

### clink.test 

Cet URL contient le front utilisateur

**Code de la vhosts apache**

```txt
```

### admin.clink.test

Cet URL contient la partie administrateur de Clink

**Code de la vhosts apache**

```txt
```

### api.clink.test

Cet URL est l'api qui permte d'alimenté en donnée les deux front

**Code de la vhosts apache**

```txt
```

## Les Variablesd d'environement

Vous devez crée un fichier `.env` dans le dossier `app-loove/api`

```bash
touch ./api/.env
```

```txt
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_URL=
JWT_PRIVATE_KEY=
PUSHER_API_KEY=
PUSHER_SECRET=
PUSHER_APP_ID=
PUSHER_CLUSTER=
```