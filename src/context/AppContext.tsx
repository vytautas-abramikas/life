import { createContext, useState, useEffect, ReactNode } from "react";
import { TLatticeType, TAppContextProps, TColorScheme } from "../types/types";
import { getNextGeneration } from "../lib/getNextGeneration";
import { getPopulation } from "../lib/getPopulation";

const AppContext = createContext<TAppContextProps | null>(null);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<TColorScheme>("rainbow");
  const [isShowBorder, setIsShowBorder] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [generation, setGeneration] = useState<number>(0);
  const [population, setPopulation] = useState<number>(0);
  const [latticeType, setLatticeType] = useState<TLatticeType>("toroidal");
  const [latticeWidth, setLatticeWidth] = useState<number>(40);
  const [latticeHeight, setLatticeHeight] = useState<number>(40);
  const [delay, setDelay] = useState<number>(100);
  const [currentLattice, setCurrentLattice] = useState<boolean[][] | null>(
    null
  );
  const [savedStartingLattice, setSavedStartingLattice] = useState<
    boolean[][] | null
  >(null);
  const [isLatticeSizeControlsVisible, setIsLatticeSizeControlsVisible] =
    useState(false);
  const [isLatticeSettingsVisible, setIsLatticeSettingsVisible] =
    useState(false);
  const [isShapeManagerVisible, setIsShapeManagerVisible] = useState(false);

  useEffect(() => {
    if (currentLattice) {
      setPopulation(getPopulation(currentLattice));
    }
  }, [currentLattice]);

  useEffect(() => {
    (async () => {
      if (generation === 0 && savedStartingLattice) {
        setCurrentLattice(savedStartingLattice);
      }
      if (isRunning && currentLattice) {
        const nextLattice = getNextGeneration(currentLattice, latticeType);
        setCurrentLattice(nextLattice);
        await new Promise((resolve) => setTimeout(resolve, delay));
        setGeneration((prev) => prev + 1);
      }
    })();
  }, [isRunning, generation]);

  return (
    <AppContext.Provider
      value={{
        colorScheme,
        isShowBorder,
        isRunning,
        generation,
        population,
        latticeType,
        latticeWidth,
        latticeHeight,
        delay,
        currentLattice,
        isLatticeSizeControlsVisible,
        isLatticeSettingsVisible,
        isShapeManagerVisible,
        setColorScheme,
        setIsShowBorder,
        setIsRunning,
        setGeneration,
        setLatticeType,
        setLatticeWidth,
        setLatticeHeight,
        setDelay,
        setCurrentLattice,
        setSavedStartingLattice,
        setIsLatticeSizeControlsVisible,
        setIsLatticeSettingsVisible,
        setIsShapeManagerVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
