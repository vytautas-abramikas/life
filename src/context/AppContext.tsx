import { createContext, useState, useEffect, ReactNode } from "react";
import { TAppState, TLatticeType, TAppContextProps } from "../types/types";
import { getNextGeneration } from "../lib/getNextGeneration";
import { getPopulation } from "../lib/getPopulation";

const AppContext = createContext<TAppContextProps | null>(null);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<TAppState>("initial");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [population, setPopulation] = useState<number>(0);
  const [latticeType, setLatticeType] = useState<TLatticeType>("toroidal");
  const [latticeWidth, setLatticeWidth] = useState<number>(100);
  const [latticeHeight, setLatticeHeight] = useState<number>(50);
  const [delay, setDelay] = useState<number>(0);
  const [currentLattice, setCurrentLattice] = useState<boolean[][] | null>(
    null
  );
  const [savedStartingLattice, setSavedStartingLattice] = useState<
    boolean[][] | null
  >(null);

  useEffect(() => {
    const initialLattice: boolean[][] = Array.from(
      { length: latticeHeight },
      () => Array.from({ length: latticeWidth }, () => Math.random() > 0.9)
    );
    setCurrentLattice(initialLattice);
    setPopulation(getPopulation(initialLattice));
    setTimeout(() => {
      setIsRunning(true);
    }, delay * 5);
  }, []);

  useEffect(() => {
    if (generation === 0) {
      if (savedStartingLattice) {
        setCurrentLattice(savedStartingLattice);
      }
      setSavedStartingLattice(currentLattice);
    }
    if (isRunning && currentLattice) {
      const nextLattice = getNextGeneration(currentLattice, latticeType);
      setTimeout(() => {
        setCurrentLattice(nextLattice);
        setPopulation(getPopulation(nextLattice));
        setGeneration((prev) => prev + 1);
      }, delay);
    }
  }, [isRunning, generation]);

  return (
    <AppContext.Provider
      value={{
        appState,
        isRunning,
        generation,
        population,
        latticeType,
        latticeWidth,
        latticeHeight,
        delay,
        currentLattice,
        setAppState,
        setIsRunning,
        setGeneration,
        setPopulation,
        setLatticeType,
        setLatticeWidth,
        setLatticeHeight,
        setDelay,
        setCurrentLattice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
