import { TLatticeType } from "../types/types";

export const getNextGeneration = (
  lattice: boolean[][],
  edges: TLatticeType
): boolean[][] => {
  const height = lattice.length;
  const width = lattice[0].length;
  const newLattice: boolean[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const neighbors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      let liveNeighbors = 0;

      neighbors.forEach(([dy, dx]) => {
        let newY = y + dy;
        let newX = x + dx;

        if (edges === "toroidal") {
          // Wrap around for toroidal edges
          newY = (newY + height) % height;
          newX = (newX + width) % width;
        } else if (edges === "bounded") {
          // Skip out-of-bounds for finite edges
          if (newY < 0 || newY >= height || newX < 0 || newX >= width) {
            return;
          }
        }

        liveNeighbors += lattice[newY][newX] ? 1 : 0;
      });

      if (lattice[y][x]) {
        newLattice[y][x] = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        newLattice[y][x] = liveNeighbors === 3;
      }
    }
  }

  return newLattice;
};
