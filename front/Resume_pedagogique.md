# Explications des concepts techniques

## 1. CSR vs SSR

### Client-Side Rendering (CSR)

- **Définition** : Le rendu du contenu est effectué côté client (dans le navigateur) à l'aide de JavaScript.
- **Fonctionnement** :
  - Le serveur envoie une page HTML minimale avec un fichier JavaScript.
  - Le navigateur exécute le JavaScript pour récupérer les données (via des API) et générer le contenu.
- **Avantages** :
  - Expérience utilisateur fluide (pas de rechargement de page).
  - Idéal pour les applications dynamiques (ex : réseaux sociaux, tableaux de bord).
- **Inconvénients** :
  - SEO moins efficace (les moteurs de recherche voient une page vide initialement).
    (SEO : Search Engine Optimization ou optimisation pour les moteurs de recherches)
  - Temps de chargement initial plus long (le JavaScript doit être téléchargé et exécuté).
- **Exemple** : React, Vue.js, Angular.

### Server-Side Rendering (SSR)

- **Définition** : Le rendu du contenu est effectué côté serveur, qui envoie une page HTML complète au navigateur.
- **Fonctionnement** :
  - Le serveur génère le HTML complet pour chaque requête.
  - Le navigateur reçoit une page prête à être affichée.
- **Avantages** :
  - Meilleur SEO (les moteurs de recherche voient le contenu complet).
  - Temps de chargement initial plus rapide.
- **Inconvénients** :
  - Charge plus importante sur le serveur.
  - Moins réactif pour les interactions dynamiques.

### Cas d'utilisation

- **CSR** : Applications web dynamiques (ex : Trello, Gmail, Instagram).
- **SSR** : Sites statiques ou blogs (ex : sites d'actualités).

---

## 2. Les verbes HTTP

Les verbes HTTP (ou méthodes HTTP) définissent les actions que le client peut effectuer sur une ressource.

| Verbe    | Description                                                | Exemple               |
| -------- | ---------------------------------------------------------- | --------------------- |
| `GET`    | Récupère une ressource.                                    | `GET /api/users`      |
| `POST`   | Crée une nouvelle ressource.                               | `POST /api/users`     |
| `PUT`    | Met à jour une ressource existante (remplace entièrement). | `PUT /api/users/1`    |
| `PATCH`  | Met à jour partiellement une ressource.                    | `PATCH /api/users/1`  |
| `DELETE` | Supprime une ressource.                                    | `DELETE /api/users/1` |

### Bonnes pratiques

- **Idempotence** : `GET`, `PUT`, `DELETE` sont idempotents (le résultat est le même après plusieurs appels identiques).
- **Utilisation** :
  - `GET` pour récupérer des données.
  - `POST` pour créer des ressources.
  - `PUT`/`PATCH` pour mettre à jour.
  - `DELETE` pour supprimer.

---

## 3. DNS et fonctionnement d’un nom de domaine

### DNS (Domain Name System)

- **Définition** : Système qui traduit les noms de domaine (ex : `google.com`) en adresses IP (ex : `172.217.16.46`).
- **Fonctionnement** :
  1. L'utilisateur saisit un nom de domaine (ex : `example.com`).
  2. Le navigateur interroge un **résolveur DNS** (généralement fourni par l'FAI (Fournisseur d'accès à Internet)).
  3. Le résolveur DNS contacte les **serveurs DNS racine**, qui redirigent vers les **serveurs TLD** (Top-Level Domain, comme `.com`).
  4. Les serveurs TLD redirigent vers les **serveurs DNS propriétaires** du domaine.
  5. Les serveurs propriétaires retournent l’adresse IP associée au nom de domaine.
  6. Le navigateur se connecte à l’adresse IP pour récupérer le site web.

### Structure d'un nom de domaine

Un nom de domaine est composé de plusieurs parties :

- **Sous-domaine** : `blog.example.com` (`blog` est le sous-domaine).
- **Domaine de second niveau** : `example.com` (`example`).
- **Domaine de premier niveau (TLD)** : `example.com` (`.com`).

---

## 4. Architecture microservices vs monolithique

### Architecture Monolithique

- **Définition** : Toute l'application est développée comme une seule unité.
- **Avantages** :
  - Simplicité de développement et de déploiement (tout est au même endroit).
  - Facile à tester en local.
- **Inconvénients** :
  - Difficile à faire évoluer (toute modification nécessite un redéploiement complet).
  - Peu scalable (toute l'application doit être mise à l'échelle, même si seule une partie est sollicitée).
  - Risque élevé de dépendances entre modules.
- **Exemple** : Applications traditionnelles (ex : WordPress, applications PHP classiques).

### Architecture Microservices

- **Définition** : L'application est divisée en petits services indépendants, chacun avec sa propre base de données et son API.
- **Avantages** :
  - Scalabilité : chaque service peut être mis à l'échelle indépendamment.
  - Flexibilité : les services peuvent être développés avec des technologies différentes.
  - Résilience : une panne dans un service n'affecte pas les autres.
  - Déploiement indépendant : chaque service peut être déployé séparément.
- **Inconvénients** :
  - Complexité accrue (gestion des communications inter-services, orchestration).
  - Coûts opérationnels plus élevés (plusieurs bases de données, serveurs, etc.).
- **Exemple** : Netflix, Uber, Amazon.

### Comparaison

| Critère      | Monolithique | Microservices |
| ------------ | ------------ | ------------- |
| Complexité   | Faible       | Élevée        |
| Scalabilité  | Limitée      | Excellente    |
| Déploiement  | Simple       | Complexe      |
| Technologie  | Unique       | Multiple      |
| Résilience   | Faible       | Élevée        |
| Coût initial | Faible       | Élevé         |

### Quand choisir quoi ?

- **Monolithique** : Projets simples, petites équipes, budgets limités.
- **Microservices** : Projets complexes, grandes équipes, besoin de scalabilité.

---

## 5. Semver et Git

### Git

- **Définition** : Système de contrôle de version distribué.

#### Commandes essentielles

| Commande                   | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `git init`                 | Initialise un nouveau dépôt Git.                                 |
| `git clone <url>`          | Clone un dépôt distant.                                          |
| `git add <file>`           | Ajoute un fichier à l’index (staging area).                      |
| `git commit -m "message"`  | Valide les changements dans l’index avec un message.             |
| `git push`                 | Envoie les commits locaux vers le dépôt distant.                 |
| `git pull`                 | Récupère les changements du dépôt distant.                       |
| `git branch`               | Liste les branches locales.                                      |
| `git checkout -b <branch>` | Crée et bascule vers une nouvelle branche.                       |
| `git merge <branch>`       | Fusionne une branche dans la branche actuelle.                   |
| `git rebase <branch>`      | Rejoue les commits de la branche actuelle sur une autre branche. |

#### Bonnes pratiques

- **Commits atomiques** : Un commit = une seule fonctionnalité/bugfix.
- **Messages clairs** : Utiliser des messages descriptifs (ex : `fix: correct login bug`).
- **Branches** : Utiliser des branches pour les nouvelles fonctionnalités (`feature/login`) ou corrections (`fix/header-bug`).
- **Pull Requests** : Toujours revuer le code via des PR avant de merger dans `main`.
