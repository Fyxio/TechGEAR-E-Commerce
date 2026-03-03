# TechGear 🛒

Application e-commerce développée avec React et TypeScript dans le cadre du module React & TypeScript.

🌐 **Site en ligne : [tech-gear-e-commerce.vercel.app](https://tech-gear-e-commerce.vercel.app)**
Lien pour voir le maquettage : [Figma tech-gear](https://www.figma.com/design/j6sdTjhJ6YhECWDpCkgJrb/Site-E-commerce?node-id=0-1&t=bKdcW2ClM0EDuNH2-1)

## 📋 Présentation du projet

TechGear est une application e-commerce moderne permettant aux utilisateurs de parcourir des produits tech (laptops, claviers, tapis de souris), de les ajouter à leur panier et de gérer leur profil. L'application consomme une API REST fournie et met en place une authentification sécurisée via JWT.

## 🚀 Installation

### Prérequis

- Node.js 16+
- npm

### Lancer l'API

```bash
cd 18_06_ecom
npm install
npm run init-db
npm start
```

### Lancer le front

```bash
cd front
npm install
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🛠️ Choix techniques

| Technologie  | Raison                                     |
| ------------ | ------------------------------------------ |
| React 18     | Bibliothèque UI moderne et performante     |
| TypeScript   | Typage statique pour réduire les erreurs   |
| Vite         | Bundler rapide pour le développement       |
| Chakra UI    | Composants accessibles et personnalisables |
| React Router | Navigation entre les pages                 |
| Axios        | Appels HTTP avec gestion du token JWT      |
| Context API  | Gestion de l'état global (user, panier)    |

## 🏗️ Architecture

```
src/
├── components/     # Composants réutilisables (Navbar, Layout)
├── pages/          # Pages de l'application
├── context/        # Contextes React (Auth, Cart)
├── services/       # Appels API typés
├── types/          # Interfaces TypeScript
├── utils/          # Fonctions utilitaires
└── router/         # Configuration des routes
```

## 📄 Pages

- **Home** → Liste des produits avec filtre par catégorie et bannière
- **ProductDetail** → Détail d'un produit avec ajout au panier
- **Login / Signup** → Authentification JWT
- **Profile** → Affichage et modification du profil utilisateur
- **Cart** → Gestion du panier avec total et confirmation de commande

## 🔐 Authentification

L'authentification est gérée via JWT. Le token est stocké dans le `localStorage` et ajouté automatiquement à chaque requête API via un intercepteur Axios.

## 🌐 API

L'API REST est déployée sur Render : `https://e-commerce-api-x8cu.onrender.com`

La documentation Swagger est accessible sur `https://e-commerce-api-x8cu.onrender.com/api-docs`

Les principales routes utilisées :

- `POST /api/users/signin` → Connexion
- `POST /api/users/signup` → Inscription
- `GET /api/products` → Liste des produits
- `GET /api/products/{id}` → Détail d'un produit
- `GET /api/categories` → Liste des catégories
- `GET /api/categories/{id}/products` → Produits par catégorie
- `GET /api/carts/user/{id}` → Panier utilisateur
- `POST /api/carts/{cart_id}/products/{product_id}` → Ajouter au panier
- `DELETE /api/carts/{cart_id}/products/{product_id}` → Retirer du panier

## 🚀 Déploiement

- **Front** : déployé sur [Vercel](https://tech-gear-e-commerce.vercel.app)
- **API** : déployée sur [Render](https://e-commerce-api-x8cu.onrender.com)

## ⚠️ Difficultés rencontrées

- **Chakra UI v3** → La syntaxe a changé par rapport à la v2, notamment le `ChakraProvider` qui nécessite `defaultSystem` et certaines props comme `noOfLines` renommées en `lineClamp`
- **Persistance de l'authentification** → Le Context API ne persiste pas entre les rafraîchissements, résolu en sauvegardant le `userId` dans le `localStorage`
- **Images des produits** → L'API ne propose pas de route dédiée pour les images, résolu en modifiant directement la base de données SQLite
- **Déploiement API** → Le port devait être dynamique avec `process.env.PORT` pour fonctionner sur Render

## 👤 Compte de test

- **Email** : mathieu_sabile@hotmail.com
- **Mot de passe** : 123
