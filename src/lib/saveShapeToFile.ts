import { saveAs } from "file-saver";
import { TShape } from "../types/types";

export const saveShapeToFile = (lattice: boolean[][]) => {
  let minY = lattice.length;
  let minX = lattice[0].length;
  let maxY = 0;
  let maxX = 0;

  // Find the bounds of the live cells
  lattice.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    });
  });

  const trimmedHeight = maxY - minY + 1;
  const trimmedWidth = maxX - minX + 1;
  const trimmedLattice: number[][] = [];

  // Create trimmed lattice
  for (let y = minY; y <= maxY; y++) {
    const row: number[] = [];
    for (let x = minX; x <= maxX; x++) {
      row.push(lattice[y][x] ? 1 : 0);
    }
    trimmedLattice.push(row);
  }

  const shape: TShape = {
    width: trimmedWidth,
    height: trimmedHeight,
    lattice: trimmedLattice,
  };

  const json = JSON.stringify(shape, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  saveAs(blob, "shape.json");
};
