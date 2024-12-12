# IA_complexe

Règles et leur interprétation : 

zi=0, case vide
zi=1, foyer
zi=2, robot
zi=3, arbre
zi=4, survivant

1) Extinction d’un foyer :
Si un robot a au moins 3 foyers dans son voisinage immédiat (cases adjacentes), il peut éteindre un foyer au choix parmi ces trois.
Cela simule une priorité sur les zones très enflammées.

2) Survivant :
Si un robot est adjacent à un survivant, il peut le prendre en charge. Une fois qu’il transporte un survivant, il ne peut plus éteindre de foyer tant qu’il n’a pas ramené le survivant à la base.

3) Déplacement du robot :
Le robot se déplace d’une case par tour selon une logique déterminée (ordre de priorité : vers un survivant, un foyer, ou en retour à la base s'il a déjà pris un survivant à sa charge).

4) Propagation du feu :
Si un foyer (zi = 1) est adjacent à un arbre (zi = 3), cet arbre s’enflamme (zi = 1) au tour suivant.

5) Explosion de feu :
Si une case est entourée par au moins 3 foyers à un instant t, cette case devient un foyer au tour t+1. Cela inclut les cases vides. (si=0 à t devient zi=1 à t+1)

6) Mouvement du survivant :
Si un survivant est sur une case qui s’enflammera au tour suivant, il se déplace vers une case adjacente vide pour ne pas brûler.


Dynamique globale

Tour de simulation :
À chaque tour, les étapes suivantes se produisent dans l’ordre :

Propagation du feu :
Les arbres adjacents aux foyers s’enflamment.
Les cases entourées par 3 foyers ou plus s’enflamment.

Déplacement des survivants :
Les survivants adjacents à une case qui deviendra un foyer se déplacent vers une case vide proche.

Actions des robots :
Si un robot transporte un survivant, il se dirige vers la base.
Sinon, il tente d’éteindre un foyer si les conditions de la règle 1 sont remplies.
S’il n’éteint pas de feu, il se déplace vers la cible prioritaire (un foyer ou un survivant).

Récupération des survivants :
Si un robot est adjacent à un survivant, il le prend en charge.


Modèle conceptuel

Priorités du robot :
Chaque robot suit un ordre de priorité :
Transporter un survivant à la base (si en cours de transport).
Éteindre un foyer si 3 foyers ou plus sont présents dans le voisinage.
Se déplacer vers la cible la plus proche :
Un survivant non pris en charge.
Un foyer isolé.

Propagation du feu :
Les arbres s’enflamment en priorité s’ils sont adjacents à un foyer.
Les cases vides s’enflamment si elles sont entourées par au moins 3 foyers.

Déplacement des survivants :
Les survivants évitent de brûler en se déplaçant vers une case adjacente vide.
Si aucune case vide n’est disponible, le survivant reste sur place et meurt. --> le but des robots est de sauver tous les survivants