import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Lattice } from "./Lattice";
import { TAppState, TLatticeType } from "../types/types";
import { getNextGeneration } from "../lib/getNextGeneration";

export const App: React.FC = () => {
  const [appState, setAppState] = useState<TAppState>("initial");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [latticeType, setLatticeType] = useState<TLatticeType>("toroidal");
  const [latticeWidth, setLatticeWidth] = useState<number>(100);
  const [latticeHeight, setLatticeHeight] = useState<number>(50);
  const [delay, setDelay] = useState<number>(0);
  const [currentLattice, setCurrentLattice] = useState<boolean[][] | null>(
    null
  );

  useEffect(() => {
    const initialLattice: boolean[][] = Array.from(
      { length: latticeHeight },
      () => Array.from({ length: latticeWidth }, () => Math.random() > 0.9)
    );
    setCurrentLattice(initialLattice);

    setTimeout(() => {
      setIsRunning(true);
    }, delay * 5);
  }, []);

  useEffect(() => {
    if (isRunning && currentLattice) {
      const nextLattice = getNextGeneration(currentLattice, latticeType);
      setTimeout(() => {
        setCurrentLattice(nextLattice);
        setGeneration((prev) => prev + 1);
      }, delay);
    }
  }, [isRunning, generation]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex justify-center items-center bg-black">
        {currentLattice && (
          <Lattice
            latticeWidth={latticeWidth}
            latticeHeight={latticeHeight}
            currentLattice={currentLattice}
            latticeType={latticeType}
          />
        )}
      </div>
    </div>
  );
};
