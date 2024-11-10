export const getPopulation = (lattice: boolean[][]): number => {
  let count = 0;
  for (let i = 0; i < lattice.length; i++) {
    for (let j = 0; j < lattice[i].length; j++) {
      if (lattice[i][j]) {
        count++;
      }
    }
  }
  return count;
};
