# IA_complexe – Système d’Exploration Autonome 🔥🤖

Ce projet met en œuvre une simulation sur grille dans laquelle des robots autonomes doivent éteindre des foyers d’incendie afin de permettre à des survivants de rejoindre une base en sécurité.

Le système repose sur des règles déterministes, une propagation dynamique du feu et des priorités d’agents, typiques d’un système d’exploration autonome ou d’une simulation multi-agents.

---

## 🎯 Objectif du projet

Permettre à tous les survivants d’atteindre la base avant d’être piégés par le feu, grâce aux actions coordonnées des robots.

---

## 🗺️ Représentation de la grille

Chaque case de la grille possède un état `zi` :

- `zi = 0` : Case vide  
- `zi = 1` : Foyer (feu)  
- `zi = 2` : Robot  
- `zi = 3` : Arbre  
- `zi = 4` : Survivant  
- `zi = 5` : Base  

---

## 🔥 Règles du feu

### Propagation du feu
- Un arbre (`zi = 3`) adjacent à un foyer (`zi = 1`) s’enflamme au tour suivant.
- Une case (même vide) entourée par au moins 3 foyers à l’instant `t` devient un foyer à `t+1`.

La propagation du feu est calculée avant toute autre action à chaque tour.

---

## 🤖 Règles des robots

### Extinction d’un foyer
Si un robot possède au moins un foyer adjacent, il peut l’éteindre.

Ordre de vérification des cases adjacentes :
1. Gauche  
2. Haut  
3. Droite  
4. Bas  

Le premier foyer trouvé selon cet ordre est éteint.

---

### Déplacement du robot
- Si aucun foyer n’est adjacent, le robot se déplace d’une case par tour.
- Il se dirige vers le foyer le plus proche selon une logique de distance.

---

### Priorité du robot
La priorité principale d’un robot est d’éteindre les foyers qui empêchent les survivants d’atteindre la base.

---

## 🧍 Règles des survivants

### Déplacement
- À chaque tour, un survivant se déplace d’une case adjacente vers une case vide plus proche de la base.
- Les survivants tentent de se rapprocher de la base coûte que coûte.

---

### Mort d’un survivant
- Si aucune case vide n’est disponible, le survivant reste sur place et meurt.

---

## ⏱️ Déroulement d’un tour de simulation

Chaque tour se déroule strictement dans l’ordre suivant :

1. Propagation du feu  
2. Déplacement des survivants  
3. Actions des robots  

---

## 🏁 Fin de la partie

Lorsqu’il ne reste plus aucun survivant sur la grille :
- Un message « Partie terminée, bravo ! » s’affiche
- Le résultat final est visible dans la console

---

## 🚀 Installation & Lancement

### Prérequis
- Un navigateur web moderne
- Aucune installation requise

---

### Lancement

1. Télécharger ou cloner le projet
2. Ouvrir le fichier `grille_visualisation.html` dans un navigateur web

La simulation s’exécute localement.

---

## 🛠️ Technologies utilisées

- HTML
- JavaScript

---

## 📚 Contexte

Ce projet s’inscrit dans le cadre d’un cours d’IA complexe et illustre les principes de simulation multi-agents et de systèmes réactifs.
