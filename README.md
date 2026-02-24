# IA_complexe – Système d’Exploration Autonome 🔥🤖

## Description
Simulation sur grille dans laquelle des robots autonomes éteignent des foyers d’incendie afin de permettre à des survivants d’atteindre une base en sécurité.

---

## Objectif
Sauver tous les survivants avant qu’ils ne soient bloqués ou brûlés par la propagation du feu.

---

## Représentation de la grille

zi = 0 : case vide  
zi = 1 : foyer (feu)  
zi = 2 : base  
zi = 3 : robot  
zi = 4 : arbre  
zi = 5 : survivant  

---

## Règles du feu
- Un arbre adjacent à un foyer s’enflamme au tour suivant
- Une case entourée par au moins 3 foyers devient un foyer

---

## Règles des robots
- Un robot éteint un foyer adjacent (priorité gauche, haut, droite, bas)
- Sinon, il se déplace vers le foyer le plus proche

---

## Règles des survivants
- Un survivant se déplace vers la base
- S’il ne peut pas se déplacer, il meurt

---

## Déroulement d’un tour
1. Propagation du feu
2. Déplacement des survivants
3. Actions des robots

---

## Fin de la partie
La partie se termine lorsqu’il ne reste plus aucun survivant.
Un message de fin s’affiche et le résultat est visible dans la console.

---

## Installation et lancement

1. Télécharger le projet
2. Ouvrir le fichier `grille_visualisation.html` dans un navigateur web

Aucune installation supplémentaire n’est nécessaire.

---

## Technologies utilisées
- HTML
- JavaScript
