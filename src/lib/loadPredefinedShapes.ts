import { TShape } from "../types/types";

export const loadPredefinedShapes = async (): Promise<TShape[]> => {
  const files = import.meta.glob("../shapes/*.json");
  const shapes: TShape[] = [];

  for (const path in files) {
    const module = (await files[path]()) as {
      width: number;
      height: number;
      lattice: number[][];
    };
    const name = path
      .replace("../shapes/", "")
      .replace(".json", "")
      .replace(/_/g, " ");
    shapes.push({
      name,
      width: module.width,
      height: module.height,
      lattice: module.lattice,
    });
  }

  return shapes;
};
