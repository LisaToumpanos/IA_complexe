const grilleElement = document.getElementById('grille');

// États possibles :0 = vide, 1 = foyer, 2 = robot, 3 = arbre, 4 = survivant
const etats = ['vide', 'foyer', 'robot', 'arbre', 'survivant'];

// Dimensions de la grille
const taille = 10;

const quantite = {
    survivant: 3,
    robot: 5,
    arbre: 10,
    foyer: 10,
};

// Initialiser la grille
let grille = Array.from({ length: taille }, () =>  Array(taille).fill(0));

// Générer toutes les positions possibles
let positions = [];
for (let y = 0; y < taille; y++) {
  for (let x = 0; x < taille; x++) {
    positions.push([x, y]);
  }
}

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