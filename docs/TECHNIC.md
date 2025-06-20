# 🧠 Documentation technique – Clink

## 📐 Architecture du projet

L'application Clink est découpée en trois grandes parties distinctes :

```
.
├── api
│   ├── composer.json
│   ├── composer.lock
│   ├── fixture
│   │   ├── script.php
│   │   ├── ville-france.json
│   │   └── VilleReelleProvider.php
│   ├── index.php
│   ├── log
│   │   └── app.log
│   ├── src
│   │   ├── Constant.php
│   │   ├── Controllers
│   │   │   ├── BaseController.php
│   │   │   ├── ConvController.php
│   │   │   ├── HomeController.php
│   │   │   ├── LikeController.php
│   │   │   ├── MatchController.php
│   │   │   ├── MessageController.php
│   │   │   ├── ReportsController.php
│   │   │   ├── SkillController.php
│   │   │   ├── StatsController.php
│   │   │   ├── UsersAdminController.php
│   │   │   └── UsersController.php
│   │   ├── Core
│   │   │   ├── Request.php
│   │   │   ├── Response.php
│   │   │   ├── Route.php
│   │   │   └── Routeur.php
│   │   ├── includes
│   │   │   └── log.php
│   │   ├── Kernel.php
│   │   ├── log
│   │   │   └── app.log
│   │   ├── MailTemplate
│   │   │   └── VerifCode.php
│   │   ├── Middelware
│   │   │   ├── BaseMiddelware.php
│   │   │   └── PaypalMiddelware.php
│   │   ├── Models
│   │   │   ├── Conv.php
│   │   │   ├── Report.php
│   │   │   ├── SoftSkill.php
│   │   │   ├── User.php
│   │   │   └── UserAdmin.php
│   │   ├── Repositories
│   │   │   ├── BaseRepositories.php
│   │   │   ├── ConvRepositories.php
│   │   │   ├── LikeRepositories.php
│   │   │   ├── MatchRepositories.php
│   │   │   ├── MessageRepositories.php
│   │   │   ├── ReportsRepositories.php
│   │   │   ├── SkillRepositories.php
│   │   │   ├── StatsRepositories.php
│   │   │   ├── UserAdminRepositories.php
│   │   │   ├── UsersRepositories.php
│   │   │   └── ValidateRepositories.php
│   │   ├── Services
│   │   │   └── MailService.php
│   │   └── Utils
│   │       ├── Functions.php
│   │       ├── ImageFunctions.php
│   │       ├── JWTFunctions.php
│   │       ├── Notif.php
│   │       └── Services.php
│   └── uploads
│       └── clink_logo.webp
├── db
│   └── clink.sql
├── docs
│   ├── TECHNIC.md
│   └── USER.md
├── interface-admin
│   ├── asset
│   │   ├── Anonymous_emblem.svg.png
│   │   └── style.css
│   ├── component
│   │   ├── ListAdmin.js
│   │   ├── ListUser.js
│   │   ├── ModalComponent.js
│   │   ├── NavComponent.js
│   │   ├── ReportList.js
│   │   └── Toast.js
│   ├── Constant.js
│   ├── controlers
│   │   ├── AdminController.js
│   │   ├── authController.js
│   │   ├── loginController.js
│   │   ├── PageController.js
│   │   ├── PremiumController.js
│   │   ├── ReportControllers.js
│   │   ├── StatsController.js
│   │   └── UsersController.js
│   ├── favicon.ico
│   ├── helper
│   │   └── Paginator.js
│   ├── index.html
│   ├── model
│   │   ├── AdminModel.js
│   │   ├── ReportModel.js
│   │   ├── StatsModel.js
│   │   └── userAdminModel.js
│   └── views
│       ├── AdminViews.js
│       ├── LoginViews.js
│       ├── PremiumViews.js
│       ├── ReportViews.js
│       ├── StatsViews.js
│       └── UsersViews.js
├── interface-client
│   ├── assets
│   │   ├── clink_logo.webp
│   │   ├── img-2-removebg-preview.png
│   │   ├── img-3-removebg-preview.png
│   │   ├── img-4-removebg-preview.png
│   │   ├── img-5-removebg-preview.png
│   │   ├── img-removebg-preview.png
│   │   ├── pexels-casnafu-31203734.jpg
│   │   ├── style.css
│   │   └── wine-glass-solid.svg
│   ├── component
│   │   ├── Chat.js
│   │   ├── Dock.js
│   │   ├── Footer.js
│   │   ├── Inbox.js
│   │   ├── Modal.js
│   │   ├── Toast.js
│   │   └── User.js
│   ├── Constant.js
│   ├── controllers
│   │   ├── AuthController.js
│   │   ├── CheckoutController.js
│   │   ├── HomeController.js
│   │   ├── InboxController.js
│   │   ├── LikeController.js
│   │   ├── LoginController.js
│   │   ├── MessageController.js
│   │   ├── NotifController.js
│   │   ├── PageController.js
│   │   ├── PremiumController.js
│   │   ├── ReportController.js
│   │   ├── SettingController.js
│   │   ├── SingInController.js
│   │   └── ValidateController.js
│   ├── favicon.ico
│   ├── helper
│   │   ├── db-helper-sw.js
│   │   └── db-helper.js
│   ├── index.html
│   ├── models
│   │   ├── LikeRepo.js
│   │   ├── ReportModel.js
│   │   └── UserModel.js
│   ├── service-worker.js
│   └── views
│       ├── CheckoutViews.js
│       ├── HomeViews.js
│       ├── InboxViews.js
│       ├── LoginViews.js
│       ├── MessageViews.js
│       ├── PremiumViews.js
│       ├── SettingsViews.js
│       ├── SignInViews.js
│       └── ValidateViews.js
├── LICENSE
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
  - Hashages des mots de passe en `Bcrypt`
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

A ajouter aux hosts de votre machine pour que le projet fonctionne

```txt
1270.0.0.1 clink.test
1270.0.0.1 admin.clink.test
1270.0.0.1 api.clink.test
```

Tous les domaines sont en https pour plus de sécurité, et pour permettre l'utilisation de pusher et de paypal pour le paiment

### clink.test 

Cette URL contient le front utilisateur

**Code de la vhosts apache**

```txt
<VirtualHost *:80>
    ServerName clink.test
    Redirect permanent / https://clink.test/
</VirtualHost>

# HTTPS avec SSL
<VirtualHost *:443>
    ServerName clink.test
    DocumentRoot "/Applications/MAMP/htdocs/app-loove/interface-client"

    SSLEngine on
    SSLCertificateFile "/Applications/MAMP/certs/clink.test.pem"
    SSLCertificateKeyFile "/Applications/MAMP/certs/clink.test-key.pem"

    <Directory "/Applications/MAMP/htdocs/app-loove/interface-client">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### admin.clink.test

Cette URL contient la partie administrateur de Clink

**Code de la vhosts apache**

```txt
<VirtualHost *:80>
    ServerName admin.clink.test
    Redirect permanent / https://admin.clink.test/
</VirtualHost>

# HTTPS avec SSL
<VirtualHost *:443>
    ServerName clink.test
    DocumentRoot "root/app-loove/interface-admin"

    SSLEngine on
    SSLCertificateFile "Your key"
    SSLCertificateKeyFile "Your key"

    <Directory "root/app-loove/interface-client">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### api.clink.test

Cette URL est l'api qui perm# 🧠 Documentation technique – Clink

## 📐 Architecture du projet

L'application Clink est découpée en trois grandes parties distinctes :

```
.
├── api
│   ├── composer.json
│   ├── composer.lock
│   ├── fixture
│   │   ├── script.php
│   │   ├── ville-france.json
│   │   └── VilleReelleProvider.php
│   ├── index.php
│   ├── log
│   │   └── app.log
│   ├── src
│   │   ├── Constant.php
│   │   ├── Controllers
│   │   │   ├── BaseController.php
│   │   │   ├── ConvController.php
│   │   │   ├── HomeController.php
│   │   │   ├── LikeController.php
│   │   │   ├── MatchController.php
│   │   │   ├── MessageController.php
│   │   │   ├── ReportsController.php
│   │   │   ├── SkillController.php
│   │   │   ├── StatsController.php
│   │   │   ├── UsersAdminController.php
│   │   │   └── UsersController.php
│   │   ├── Core
│   │   │   ├── Request.php
│   │   │   ├── Response.php
│   │   │   ├── Route.php
│   │   │   └── Routeur.php
│   │   ├── includes
│   │   │   └── log.php
│   │   ├── Kernel.php
│   │   ├── log
│   │   │   └── app.log
│   │   ├── MailTemplate
│   │   │   └── VerifCode.php
│   │   ├── Middelware
│   │   │   ├── BaseMiddelware.php
│   │   │   └── PaypalMiddelware.php
│   │   ├── Models
│   │   │   ├── Conv.php
│   │   │   ├── Report.php
│   │   │   ├── SoftSkill.php
│   │   │   ├── User.php
│   │   │   └── UserAdmin.php
│   │   ├── Repositories
│   │   │   ├── BaseRepositories.php
│   │   │   ├── ConvRepositories.php
│   │   │   ├── LikeRepositories.php
│   │   │   ├── MatchRepositories.php
│   │   │   ├── MessageRepositories.php
│   │   │   ├── ReportsRepositories.php
│   │   │   ├── SkillRepositories.php
│   │   │   ├── StatsRepositories.php
│   │   │   ├── UserAdminRepositories.php
│   │   │   ├── UsersRepositories.php
│   │   │   └── ValidateRepositories.php
│   │   ├── Services
│   │   │   └── MailService.php
│   │   └── Utils
│   │       ├── Functions.php
│   │       ├── ImageFunctions.php
│   │       ├── JWTFunctions.php
│   │       ├── Notif.php
│   │       └── Services.php
│   └── uploads
│       └── clink_logo.webp
├── db
│   └── clink.sql
├── docs
│   ├── TECHNIC.md
│   └── USER.md
├── interface-admin
│   ├── asset
│   │   ├── Anonymous_emblem.svg.png
│   │   └── style.css
│   ├── component
│   │   ├── ListAdmin.js
│   │   ├── ListUser.js
│   │   ├── ModalComponent.js
│   │   ├── NavComponent.js
│   │   ├── ReportList.js
│   │   └── Toast.js
│   ├── Constant.js
│   ├── controlers
│   │   ├── AdminController.js
│   │   ├── authController.js
│   │   ├── loginController.js
│   │   ├── PageController.js
│   │   ├── PremiumController.js
│   │   ├── ReportControllers.js
│   │   ├── StatsController.js
│   │   └── UsersController.js
│   ├── favicon.ico
│   ├── helper
│   │   └── Paginator.js
│   ├── index.html
│   ├── model
│   │   ├── AdminModel.js
│   │   ├── ReportModel.js
│   │   ├── StatsModel.js
│   │   └── userAdminModel.js
│   └── views
│       ├── AdminViews.js
│       ├── LoginViews.js
│       ├── PremiumViews.js
│       ├── ReportViews.js
│       ├── StatsViews.js
│       └── UsersViews.js
├── interface-client
│   ├── assets
│   │   ├── clink_logo.webp
│   │   ├── img-2-removebg-preview.png
│   │   ├── img-3-removebg-preview.png
│   │   ├── img-4-removebg-preview.png
│   │   ├── img-5-removebg-preview.png
│   │   ├── img-removebg-preview.png
│   │   ├── pexels-casnafu-31203734.jpg
│   │   ├── style.css
│   │   └── wine-glass-solid.svg
│   ├── component
│   │   ├── Chat.js
│   │   ├── Dock.js
│   │   ├── Footer.js
│   │   ├── Inbox.js
│   │   ├── Modal.js
│   │   ├── Toast.js
│   │   └── User.js
│   ├── Constant.js
│   ├── controllers
│   │   ├── AuthController.js
│   │   ├── CheckoutController.js
│   │   ├── HomeController.js
│   │   ├── InboxController.js
│   │   ├── LikeController.js
│   │   ├── LoginController.js
│   │   ├── MessageController.js
│   │   ├── NotifController.js
│   │   ├── PageController.js
│   │   ├── PremiumController.js
│   │   ├── ReportController.js
│   │   ├── SettingController.js
│   │   ├── SingInController.js
│   │   └── ValidateController.js
│   ├── favicon.ico
│   ├── helper
│   │   ├── db-helper-sw.js
│   │   └── db-helper.js
│   ├── index.html
│   ├── models
│   │   ├── LikeRepo.js
│   │   ├── ReportModel.js
│   │   └── UserModel.js
│   ├── service-worker.js
│   └── views
│       ├── CheckoutViews.js
│       ├── HomeViews.js
│       ├── InboxViews.js
│       ├── LoginViews.js
│       ├── MessageViews.js
│       ├── PremiumViews.js
│       ├── SettingsViews.js
│       ├── SignInViews.js
│       └── ValidateViews.js
├── LICENSE
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
  - Hashages des mots de passe en `Bcrypt`
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

A ajouter aux hosts de votre machine pour que le projet fonctionne

```txt
1270.0.0.1 clink.test
1270.0.0.1 admin.clink.test
1270.0.0.1 api.clink.test
```

Tous les domaines sont en https pour plus de sécurité, et pour permettre l'utilisation de pusher et de paypal pour le paiment

### clink.test

Cette URL contient le front utilisateur

**Code de la vhosts apache**

```txt
<VirtualHost *:80>
    ServerName clink.test
    Redirect permanent / https://clink.test/
</VirtualHost>

# HTTPS avec SSL
<VirtualHost *:443>
    ServerName clink.test
    DocumentRoot "/Applications/MAMP/htdocs/app-loove/interface-client"

    SSLEngine on
    SSLCertificateFile "/Applications/MAMP/certs/clink.test.pem"
    SSLCertificateKeyFile "/Applications/MAMP/certs/clink.test-key.pem"

    <Directory "/Applications/MAMP/htdocs/app-loove/interface-client">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### admin.clink.test

Cette URL contient la partie administrateur de Clink

**Code de la vhosts apache**

```txt
<VirtualHost *:80>
    ServerName admin.clink.test
    Redirect permanent / https://admin.clink.test/
</VirtualHost>

# HTTPS avec SSL
<VirtualHost *:443>
    ServerName clink.test
    DocumentRoot "root/app-loove/interface-admin"

    SSLEngine on
    SSLCertificateFile "Your key"
    SSLCertificateKeyFile "Your key"

    <Directory "root/app-loove/interface-client">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### api.clink.test

Cette URL est l'api qui permet d'alimenter en donnée les deux fronts

**Code de la vhosts apache**

```txt
<VirtualHost *:80>
    ServerName api.clink.test
    Redirect permanent / https://api.clink.test/
</VirtualHost>

# HTTPS avec SSL
<VirtualHost *:443>
    ServerName clink.test
    DocumentRoot "root/app-loove/api"

    SSLEngine on
    SSLCertificateFile "your key"
    SSLCertificateKeyFile "Your key"

    <Directory "root/app-loove/api">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Les Variables d'environnement

Vous devez créer un fichier `.env` dans le dossier `app-loove/api`

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
PUSHER_INSTANCE=
PUSHER_PRIMARY_KEY=
MAIL_SMTP_HOST=
MAIL_SMTP_AUTH=
MAIL_SMTP_USER=
MAIL_SMTP_PASS=
MAIL_SMTP_PORT=
```

## API

✅ Route de base

| Méthode | URL | Description                          | Auth |
| ------- | --- | ------------------------------------ | ---- |
| GET     | `/` | Vérifie l'utilisateur.               | none |


👤 Utilisateurs Admin

| Méthode | URL                        | Description                                    | Auth  |
| ------- | -------------------------- | ---------------------------------------------- | ----- |
| POST    | `/login-admin`             | Connexion d’un administrateur.                 | none  |
| POST    | `/users-admin/new`         | Crée un nouvel administrateur.                 | admin |
| GET     | `/users-admin`             | Récupère la liste de tous les administrateurs. | admin |
| GET     | `/user-admin/{id}`         | Récupère les infos d’un administrateur.        | admin |
| PUT     | `/users-admin/edit/{id}`   | Modifie un administrateur existant.            | admin |
| DELETE  | `/users-admin/delete/{id}` | Supprime un administrateur.                    | admin |
| POST    | `/admin/edit/{id}`         | Modifie le mot de passe d’un administrateur.   | admin |

📝 Rapports (Reports)

| Méthode | URL                    | Description                         | Auth  |
| ------- | ---------------------- | ----------------------------------- | ----- |
| GET     | `/reports`             | Récupère tous les signalements.     | admin |
| GET     | `/reports/{id}`        | Récupère un signalement spécifique. | admin |
| POST    | `/reports/new`         | Crée un nouveau signalement.        | users |
| POST    | `/reports/finish/{id}` | Marque un signalement comme traité. | admin |

👤 Utilisateurs

| Méthode | URL                                | Description                                           | Auth  |
| ------- | ---------------------------------- | ----------------------------------------------------- | ----- |
| GET     | `/users`                           | Récupère tous les utilisateurs.                       | admin |
| GET     | `/users/{id}`                      | Récupère les infos d’un utilisateur.                  | users |
| POST    | `/users/new`                       | Inscription d’un nouvel utilisateur.                  | none  |
| PUT     | `/users/edit/{id}`                 | Met à jour les infos d’un utilisateur.                | users |
| PATCH   | `/users/edit/password/{id}`        | Met à jour le mot de passe.                           | users |
| DELETE  | `/users/delete/{id}`               | Supprime un utilisateur.                              | users |
| PATCH   | `/users/premium/{id}/{end-date}`   | Active le mode premium jusqu’à une date.              | users |
| PATCH   | `/users/ban/{id}`                  | Bannit un utilisateur.                                | admin |
| PATCH   | `/users/validate/{id}/{code}`      | Valide un compte utilisateur avec un code.            | none  |
| PATCH   | `/users/suspended/{id}/{end_date}` | Suspend un utilisateur jusqu’à une date.              | admin |
| GET     | `/users/compatible/{x}/{y}/{id}`   | Récupère les utilisateurs compatibles avec un profil. | users |
| POST    | `/users/login`                     | Connexion d’un utilisateur.                           | none  |
| GET     | `/users/stats/premium`             | Donne les statistiques des utilisateurs premium.      | admin |

❤️ Like / Unlike

| Méthode | URL                        | Description                                            | Auth  |
| ------- | -------------------------- | ------------------------------------------------------ | ----- |
| GET     | `/like/{id}/{idLiked}`     | Like un utilisateur.                                   | users |
| GET     | `/unlike/{id}/{idUnLiked}` | Supprime un like.                                      | users |
| GET     | `/like/{id}`               | Récupère les personnes qui ont liké l’utilisateur.     | users |
| GET     | `/unlike/{id}`             | Récupère les personnes qui ont "unliké" l’utilisateur. | users |

💬 Conversations & Messages

| Méthode | URL                                 | Description                                         | Auth  |
| ------- | ----------------------------------- | --------------------------------------------------- | ----- |
| GET     | `/conv/{id}`                        | Récupère toutes les conversations d’un utilisateur. | users |
| POST    | `/pusher/auth`                      | Authentifie un utilisateur pour Pusher.             | users |
| POST    | `/message/new/{idA}/{idB}/{convID}` | Envoie un message dans une conversation.            | users |
| GET     | `/messages/{convID}`                | Récupère tous les messages d’une conversation.      | users |

📊 Statistiques

| Méthode | URL             | Description                               | Auth  |
| ------- | --------------- | ----------------------------------------- | ----- |
| GET     | `/stats`        | Récupère les statistiques générales.      | admin |
| GET     | `/stats/paypal` | Récupère les statistiques liées à PayPal. | admin |
te d'alimenté en donnée les deux front

**Code de la vhosts apache**

```txt
<VirtualHost *:80>
    ServerName api.clink.test
    Redirect permanent / https://api.clink.test/
</VirtualHost>

# HTTPS avec SSL
<VirtualHost *:443>
    ServerName clink.test
    DocumentRoot "root/app-loove/api"

    SSLEngine on
    SSLCertificateFile "your key"
    SSLCertificateKeyFile "Your key"

    <Directory "root/app-loove/api">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
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
PUSHER_INSTANCE=
PUSHER_PRIMARY_KEY=
MAIL_SMTP_HOST=
MAIL_SMTP_AUTH=
MAIL_SMTP_USER=
MAIL_SMTP_PASS=
MAIL_SMTP_PORT=
```

## API

✅ Route de base

| Méthode | URL | Description                          | Auth |
| ------- | --- | ------------------------------------ | ---- |
| GET     | `/` | Vérifie l'utilisateur.               | none |


👤 Utilisateurs Admin

| Méthode | URL                        | Description                                    | Auth  |
| ------- | -------------------------- | ---------------------------------------------- | ----- |
| POST    | `/login-admin`             | Connexion d’un administrateur.                 | none  |
| POST    | `/users-admin/new`         | Crée un nouvel administrateur.                 | admin |
| GET     | `/users-admin`             | Récupère la liste de tous les administrateurs. | admin |
| GET     | `/user-admin/{id}`         | Récupère les infos d’un administrateur.        | admin |
| PUT     | `/users-admin/edit/{id}`   | Modifie un administrateur existant.            | admin |
| DELETE  | `/users-admin/delete/{id}` | Supprime un administrateur.                    | admin |
| POST    | `/admin/edit/{id}`         | Modifie le mot de passe d’un administrateur.   | admin |

📝 Rapports (Reports)

| Méthode | URL                    | Description                         | Auth  |
| ------- | ---------------------- | ----------------------------------- | ----- |
| GET     | `/reports`             | Récupère tous les signalements.     | admin |
| GET     | `/reports/{id}`        | Récupère un signalement spécifique. | admin |
| POST    | `/reports/new`         | Crée un nouveau signalement.        | users |
| POST    | `/reports/finish/{id}` | Marque un signalement comme traité. | admin |

👤 Utilisateurs

| Méthode | URL                                | Description                                           | Auth  |
| ------- | ---------------------------------- | ----------------------------------------------------- | ----- |
| GET     | `/users`                           | Récupère tous les utilisateurs.                       | admin |
| GET     | `/users/{id}`                      | Récupère les infos d’un utilisateur.                  | users |
| POST    | `/users/new`                       | Inscription d’un nouvel utilisateur.                  | none  |
| PUT     | `/users/edit/{id}`                 | Met à jour les infos d’un utilisateur.                | users |
| PATCH   | `/users/edit/password/{id}`        | Met à jour le mot de passe.                           | users |
| DELETE  | `/users/delete/{id}`               | Supprime un utilisateur.                              | users |
| PATCH   | `/users/premium/{id}/{end-date}`   | Active le mode premium jusqu’à une date.              | users |
| PATCH   | `/users/ban/{id}`                  | Bannit un utilisateur.                                | admin |
| PATCH   | `/users/validate/{id}/{code}`      | Valide un compte utilisateur avec un code.            | none  |
| PATCH   | `/users/suspended/{id}/{end_date}` | Suspend un utilisateur jusqu’à une date.              | admin |
| GET     | `/users/compatible/{x}/{y}/{id}`   | Récupère les utilisateurs compatibles avec un profil. | users |
| POST    | `/users/login`                     | Connexion d’un utilisateur.                           | none  |
| GET     | `/users/stats/premium`             | Donne les statistiques des utilisateurs premium.      | admin |

❤️ Like / Unlike

| Méthode | URL                        | Description                                            | Auth  |
| ------- | -------------------------- | ------------------------------------------------------ | ----- |
| GET     | `/like/{id}/{idLiked}`     | Like un utilisateur.                                   | users |
| GET     | `/unlike/{id}/{idUnLiked}` | Supprime un like.                                      | users |
| GET     | `/like/{id}`               | Récupère les personnes qui ont liké l’utilisateur.     | users |
| GET     | `/unlike/{id}`             | Récupère les personnes qui ont "unliké" l’utilisateur. | users |

💬 Conversations & Messages

| Méthode | URL                                 | Description                                         | Auth  |
| ------- | ----------------------------------- | --------------------------------------------------- | ----- |
| GET     | `/conv/{id}`                        | Récupère toutes les conversations d’un utilisateur. | users |
| POST    | `/pusher/auth`                      | Authentifie un utilisateur pour Pusher.             | users |
| POST    | `/message/new/{idA}/{idB}/{convID}` | Envoie un message dans une conversation.            | users |
| GET     | `/messages/{convID}`                | Récupère tous les messages d’une conversation.      | users |

📊 Statistiques

| Méthode | URL             | Description                               | Auth  |
| ------- | --------------- | ----------------------------------------- | ----- |
| GET     | `/stats`        | Récupère les statistiques générales.      | admin |
| GET     | `/stats/paypal` | Récupère les statistiques liées à PayPal. | admin |
