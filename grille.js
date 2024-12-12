const grilleElement = document.getElementById('grille');

// États possibles :0 = vide, 1 = foyer, 2 = robot, 3 = arbre, 4 = survivant, 5 = base
const etats = ['vide', 'foyer', 'robot', 'arbre', 'survivant', 'base'];

// Dimensions de la grille
const taille = 10;
 
const quantite = {
    survivant: 3,
    robot: 5,
    arbre: 2,
    foyer: 7,
};

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
  
    // Mettre à jour la grille avec les foyers propagés et explosés
    grille = nouvelleGrille;
  
    // Redessiner la grille après la propagation du feu et l'explosion
    dessinerGrille();
  }
  
  //----------------------------------------------------------------------------------------------------------------------
  
  function deplacementRobot(){

  }


  function deplacementSurvivant() {
    let morts = 0; // Compteur pour les survivants morts
    let nouvelleGrille = grille.map(ligne => ligne.slice());
  
    // Parcourir la grille pour trouver les survivants
    for (let y = 0; y < taille; y++) {
      for (let x = 0; x < taille; x++) {
        if (grille[y][x] === 4) { // Si c'est un survivant
          let compteurFoyers = 0;
  
          // Compter les foyers adjacents au survivant
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
  
          // Si le survivant est entouré par 3 foyers ou plus
          if (compteurFoyers >= 3) {
            let deplace = false; // Flag pour savoir si le survivant peut se déplacer
  
            // Vérifier les cases adjacentes pour voir si un survivant peut se déplacer
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                let nx = x + dx;
                let ny = y + dy;
  
                // Vérifier si la position est valide (dans les limites de la grille)
                if (nx >= 0 && nx < taille && ny >= 0 && ny < taille) {
                  // Si la case est vide, déplacer le survivant
                  if (grille[ny][nx] === 0) {
                    nouvelleGrille[ny][nx] = 4; // Déplacer le survivant vers cette case
                    nouvelleGrille[y][x] = 0; // Libérer la case actuelle du survivant
                    deplace = true;
                    break;
                  }
                }
              }
              if (deplace) break;
            }
  
            // Si le survivant ne peut pas se déplacer, il brûle
            if (!deplace) {
              nouvelleGrille[y][x] = 1; // Marquer le survivant comme mort (ou vide)
              morts++; // Incrémenter le compteur de morts
            }
          }
        }
      }
    }
  
    // Mettre à jour la grille
    grille = nouvelleGrille;
  
    // Afficher les morts
    console.log("Nombre de survivants morts:", morts);
  
    // Redessiner la grille après les déplacements
    dessinerGrille();
  }
  
  

  //----------------------------------------------------------------------------------------------------------------------
  // Fonction de gestion du bouton T+1
  function tourSuivant() {
    deplacementSurvivant();
    // Propager le feu à chaque tour
    propagationDuFeu();
  }