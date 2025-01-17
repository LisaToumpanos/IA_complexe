# IA_complexe

Règles et leur interprétation : 

zi=0, case vide
zi=1, foyer
zi=2, robot
zi=3, arbre
zi=4, survivant

1) Extinction d’un foyer :
Si un robot a au moins 1 foyers dans son voisinage immédiat (cases adjacentes), il peut l'éteindre. Il commence par vérifier à gauche, puis en haut, puis à droite, puis en bas.

2) Déplacement du robot :
S'il ne trouve pas de foyer autour de lui, le robot se déplace d’une case par tour selon une logique déterminée (vers un foyer).

3) Propagation du feu :
Si un foyer (zi = 1) est adjacent à un arbre (zi = 3), cet arbre s’enflamme (zi = 1) au tour suivant.

4) Explosion de feu :
Si une case est entourée par au moins 3 foyers à un instant t, cette case devient un foyer au tour t+1. Cela inclut les cases vides. (si=0 à t devient zi=1 à t+1)

5) Mouvement du survivant :
Un survivant se déplace d'une case autour de lui en direction de la base


Tour de simulation :
À chaque tour, les étapes suivantes se produisent dans l’ordre :

Propagation du feu :
Les arbres adjacents aux foyers s’enflamment.
Les cases entourées par 3 foyers ou plus s’enflamment.

Déplacement des survivants :
Les survivants se déplacent vers une case vide plus proche de la base.

Actions des robots :
S'il a un foyer à proximité, il l'éteint
S’il n’éteint pas de feu, il se déplace vers le foyer le plus proche.



Priorités du robot :
Chaque robot suit un ordre de priorité :
Éteindre le foyer le plus proche pour permettre aux survivants de rejoindre la base

Propagation du feu :
Les arbres s’enflamment en priorité s’ils sont adjacents à un foyer.
Les cases vides s’enflamment si elles sont entourées par au moins 3 foyers.

Déplacement des survivants :
Les survivants tentent de se rapprocher de la base coûte que coûte !
Si aucune case vide n’est disponible, le survivant reste sur place et meurt. --> le but des robots est de permettre que tous les survivants soient sauvés !


