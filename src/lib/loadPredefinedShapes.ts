import { TShape } from "../types/types";

export const loadPredefinedShapes = async (): Promise<TShape[]> => {
  const files = import.meta.glob("../shapes/*.json", { eager: true }) as Record<
    string,
    {
      width: number;
      height: number;
      lattice: number[][];
    }
  >;
  const shapes: TShape[] = [];

  for (const path in files) {
    const module = files[path];
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
