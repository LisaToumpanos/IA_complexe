const grilleElement = document.getElementById('grille');

// États possibles :0 = vide, 1 = foyer, 2 = robot, 3 = arbre, 4 = survivant, 5 = base
const etats = ['vide', 'foyer', 'robot', 'arbre', 'survivant', 'base']; // la base ne peut pas brûler

// Dimensions de la grille
const taille = 10;
 
const quantite = {
    survivant: 5,
    robot: 5,
    arbre: 5,
    foyer: 11,
};

let personnesSauvées = 0;
//-------------------------------------------------------------------------------------------------------------------

// Initialiser la grille
let grille = Array.from({ length: taille }, () =>  Array(taille).fill(0));

// Générer toutes les positions possibles
let positions = [];
for (let y = 0; y < taille; y++) {
  for (let x = 0; x < taille; x++) {
    positions.push([x, y]);
  }
}

//--------------------------------------------------------------------------------------------------------------------

// Définir la base fixe
const basePositions = [
    [0, 8], // x=1, y=9 (indexés à partir de 0)
    [0, 9], // x=1, y=10
    [1, 8], // x=2, y=9
    [1, 9], // x=2, y=10
  ];
  
  // Marquer la base dans la grille
  basePositions.forEach(([x, y]) => {
    grille[y][x] = 5; // Marque la base
  });
  
  // Filtrer les positions pour exclure la base
  positions = positions.filter(([x, y]) => {
    return !basePositions.some(basePos => basePos[0] === x && basePos[1] === y);
  });


// Mélanger les positions
positions = positions.sort(() => Math.random() - 0.5);

// Remplir la grille avec les quantités spécifiées
let index = 0;
for (let [etat, quantites] of Object.entries(quantite)) {
  for (let i = 0; i < quantites; i++) {
    const [x, y] = positions[index++];
    grille[y][x] = etats.indexOf(etat); // Convertir l'état en son index
  }
}

//-------------------------------------------------------------------------------------------------------------------

// Créer la grille visuelle
function dessinerGrille() {
  grilleElement.innerHTML = ''; // Réinitialiser l'affichage

  grille.forEach((ligne, y) => {
    ligne.forEach((etat, x) => {
      const cellule = document.createElement('div');
      cellule.classList.add('cellule', etats[etat]); // Appliquer les classes
      cellule.dataset.x = x;
      cellule.dataset.y = y;
      grilleElement.appendChild(cellule);
    });
  });
}

// Dessiner la grille initiale
dessinerGrille();

//---------------------------------------------------------------------------------------------------------------------

function propagationDuFeu() {
    // Créer une copie de la grille pour éviter de modifier la grille en cours pendant le calcul
    let nouvelleGrille = grille.map(ligne => ligne.slice());
  
    // Étape 1 : Propagation du feu (brûler les arbres adjacents aux foyers)
    for (let y = 0; y < taille; y++) {
      for (let x = 0; x < taille; x++) {
        if (grille[y][x] === 1) { // Si c'est un foyer
          // Vérifier les cases adjacentes pour allumer des arbres
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              let nx = x + dx;
              let ny = y + dy;
  
              // Vérifier si la position est valide (dans les limites de la grille)
              if (nx >= 0 && nx < taille && ny >= 0 && ny < taille) {
                // Si l'élément adjacent est un arbre (3), le transformer en foyer (1)
                if (grille[ny][nx] === 3) {
                  nouvelleGrille[ny][nx] = 1; // Brûler l'arbre
                }
              }
            }
          }
        }
      }
    }
  
    // Étape 2 : Explosion du feu (cases vides entourées de 3 foyers ou plus deviennent des foyers)
    for (let y = 0; y < taille; y++) {
      for (let x = 0; x < taille; x++) {
        if (grille[y][x] === 0) { // Si c'est une case vide
          let compteurFoyers = 0;
  
          // Compter les foyers adjacents
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              let nx = x + dx;
              let ny = y + dy;
  
              // Vérifier si la position est valide (dans les limites de la grille)
              if (nx >= 0 && nx < taille && ny >= 0 && ny < taille) {
                // Si l'élément adjacent est un foyer (1)
                if (grille[ny][nx] === 1) {
                  compteurFoyers++;
                }
              }
            }
          }
  
          // Si la case est entourée par au moins 3 foyers, elle devient un foyer
          if (compteurFoyers >= 3) {
            nouvelleGrille[y][x] = 1;
          }
        }
      }
    }
  
    // Mettre à jour la grille avec les foyers propagés sur les arbres et par explosion
    grille = nouvelleGrille;
  
    // Redessiner la grille
    dessinerGrille();
  }
  
  //----------------------------------------------------------------------------------------------------------------------
  let morts = 0;  // Initialiser le compteur des morts
  function estAdjacentBase(x, y) {
    // Vérifie si la case est adjacente à la base
    for (let i = 0; i < basePositions.length; i++) {
      let [bx, by] = basePositions[i];
      if (Math.abs(bx - x) <= 1 && Math.abs(by - y) <= 1) {
        return true;
      }
    }
    return false;
  }
  
  function distanceEuclidienne(x1, y1, x2, y2) {
    // Calcule la distance Euclidienne entre deux points (x1, y1) et (x2, y2) ici un survivant et la base
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  function deplacementSurvivant() {
    let nouvelleGrille = grille.map(ligne => ligne.slice()); // Créer une copie de la grille pour éviter des conflits de modification
    let casesOccupees = []; // Tableau pour suivre les cases déjà occupées par un survivant

    // Parcourir la grille pour trouver les survivants
    for (let y = 0; y < taille; y++) {
      for (let x = 0; x < taille; x++) {
        if (grille[y][x] === 4) { // Si c'est un survivant
          // Si le survivant est adjacent à la base, il va dans la base et disparaît
          if (estAdjacentBase(x, y)) {
            nouvelleGrille[y][x] = 0; // Libérer la case actuelle du survivant
            personnesSauvées++; // Incrémenter le nombre de personnes sauvées
            console.log("Personne sauvée ! Total:", personnesSauvées); // Afficher dans la console
          } else {
            let deplace = false; // le survivant ne sera pas dans la base après son déplacement
  
            // Calculer les cases adjacentes possibles pour se déplacer
            let deplacementValide = [];
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                let nx = x + dx;
                let ny = y + dy;
  
                // Vérifier si la position est valide (dans les limites de la grille)
                if (nx >= 0 && nx < taille && ny >= 0 && ny < taille) {
                  // Si la case est vide (pas d'obstacle ou survivant ou robot), ajouter la case à la liste des possibilités
                  if (grille[ny][nx] === 0 && !casesOccupees.some(caseOccupee => caseOccupee.x === nx && caseOccupee.y === ny)) {
                    let distBase = Infinity;
  
                    // Calculer la distance minimale à la base parmi toutes les bases
                    for (let i = 0; i < basePositions.length; i++) {
                      let [bx, by] = basePositions[i];
                      distBase = Math.min(distBase, distanceEuclidienne(nx, ny, bx, by));
                    }
  
                    // Ajouter la case avec sa distance à la base
                    deplacementValide.push({ x: nx, y: ny, distBase });
                  }
                }
              }
            }
  
            // Si des cases possibles ont été trouvées, déplacer vers la plus proche de la base
            if (deplacementValide.length > 0) {
              // Trier les cases possibles par distance à la base
              deplacementValide.sort((a, b) => a.distBase - b.distBase);
              let caseChoisie = deplacementValide[0]; //la case choisie sera celle dont la distance à la base est la plus petite
  
              // Déplacer le survivant vers la case choisie, si elle est libre et non occupée par un autre survivant
              if (grille[caseChoisie.y][caseChoisie.x] === 0 && !casesOccupees.some(caseOccupee => caseOccupee.x === caseChoisie.x && caseOccupee.y === caseChoisie.y)) {
                // Déplacer le survivant vers cette case
                nouvelleGrille[caseChoisie.y][caseChoisie.x] = 4; // Déplacer le survivant vers cette case
                nouvelleGrille[y][x] = 0; // Libérer la case actuelle du survivant
                deplace = true;

                // Ajouter cette case aux cases occupées
                casesOccupees.push({ x: caseChoisie.x, y: caseChoisie.y });
              }
            }
  
            // Si le survivant ne peut pas se déplacer, il brûle
            if (!deplace) {
              nouvelleGrille[y][x] = 1; // Marquer le survivant comme mort (ou vide)
              morts++; // Incrémenter le nombre de morts
              console.log("Nombre de morts:", morts); // Afficher dans la console
            }
          }
        }
      }
    }
  
    // Mettre à jour la grille
    grille = nouvelleGrille;
  
    // Redessiner la grille après les déplacements
    dessinerGrille();
}

  
  function actionRobot(){

  }

  //----------------------------------------------------------------------------------------------------------------------
  // Fonction de gestion du bouton T+1
  function tourSuivant() {
    deplacementSurvivant();
    actionRobot();
    // Propager le feu à chaque tour
    propagationDuFeu();
  }