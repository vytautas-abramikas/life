import { TCell } from "../types/types";

export const getNextGeneration = (
  cells: TCell[][],
  edges: "toroidal" | "finite"
): TCell[][] => {
  const height = cells.length;
  const width = cells[0].length;
  const newCells: TCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ isAlive: false, isClickable: true }))
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
        } else if (edges === "finite") {
          // Skip out-of-bounds for finite edges
          if (newY < 0 || newY >= height || newX < 0 || newX >= width) {
            return;
          }
        }

        liveNeighbors += cells[newY][newX].isAlive ? 1 : 0;
      });

      if (cells[y][x].isAlive) {
        newCells[y][x].isAlive = liveNeighbors === 2 || liveNeighbors === 3;
      } else {
        newCells[y][x].isAlive = liveNeighbors === 3;
      }
    }
  }

  return newCells;
};
