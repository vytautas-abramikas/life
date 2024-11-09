import { useState } from "react";
import { Header } from "./Header";
import { Lattice } from "./Lattice";
import { TCell } from "../types/types";

export const App: React.FC = () => {
  const width = 100; // example width
  const height = 50; // example height
  const initialCells: TCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({
      isAlive: Math.random() > 0.5,
      isClickable: true,
    }))
  );

  const [cells, setCells] = useState<TCell[][]>(initialCells);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex justify-center items-center bg-black">
        <Lattice width={width} height={height} cells={cells} />
      </div>
    </div>
  );
};
