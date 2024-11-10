import { TLatticeType } from "../types/types";

export const getCellColor = (
  yIndex: number,
  xIndex: number,
  lattice: boolean[][],
  latticeType: TLatticeType
): string => {
  if (!lattice[yIndex][xIndex]) {
    return "bg-black"; // Cell is not alive
  }
  const height = lattice.length;
  const width = lattice[0].length;

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
    let newY = yIndex + dy;
    let newX = xIndex + dx;

    if (latticeType === "toroidal") {
      // Wrap around for toroidal edges
      newY = (newY + height) % height;
      newX = (newX + width) % width;
    } else if (latticeType === "bounded") {
      // Skip out-of-bounds for finite edges
      if (newY < 0 || newY >= height || newX < 0 || newX >= width) {
        return;
      }
    }

    if (lattice[newY][newX]) {
      liveNeighbors++;
    }
  });

  switch (liveNeighbors) {
    case 0:
    case 1:
      return "bg-red-500";
    case 2:
    case 3:
      return "bg-green-500";
    default:
      return "bg-blue-500";
  }
};
