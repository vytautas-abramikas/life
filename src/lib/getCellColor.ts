import { TColorScheme, TLatticeType } from "../types/types";

export const getCellColor = (
  yIndex: number,
  xIndex: number,
  lattice: boolean[][],
  latticeType: TLatticeType,
  colorScheme: TColorScheme
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
  switch (colorScheme) {
    case "rgb":
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
    case "grayscale":
      switch (liveNeighbors) {
        case 0:
          return "bg-[#333333]";
        case 1:
          return "bg-[#4c4c4c]";
        case 2:
          return "bg-[#666666]";
        case 3:
          return "bg-[#7f7f7f]";
        case 4:
          return "bg-[#999999]";
        case 5:
          return "bg-[#b2b2b2]";
        case 6:
          return "bg-[#cccccc]";
        case 7:
          return "bg-[#e5e5e5]";
        default:
          return "bg-[#ffffff]";
      }
    default:
      switch (liveNeighbors) {
        case 0:
          return "bg-[#8B0000]";
        case 1:
          return "bg-[#FF0000]";
        case 2:
          return "bg-[#FF7F00]";
        case 3:
          return "bg-[#FFFF00]";
        case 4:
          return "bg-[#00FF00]";
        case 5:
          return "bg-[#00FFFF]";
        case 6:
          return "bg-[#0000FF]";
        case 7:
          return "bg-[#0000FF]";
        default:
          return "bg-[#9400D3]";
      }
  }
};
