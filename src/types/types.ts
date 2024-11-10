export type TAppState = "initial" | "simulation";

export type TLatticeType = "toroidal" | "bounded";

export type TAppContextProps = {
  appState: TAppState;
  isRunning: boolean;
  generation: number;
  population: number;
  latticeType: TLatticeType;
  latticeWidth: number;
  latticeHeight: number;
  delay: number;
  currentLattice: boolean[][] | null;
  setAppState: React.Dispatch<React.SetStateAction<TAppState>>;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setGeneration: React.Dispatch<React.SetStateAction<number>>;
  setPopulation: React.Dispatch<React.SetStateAction<number>>;
  setLatticeType: React.Dispatch<React.SetStateAction<TLatticeType>>;
  setLatticeWidth: React.Dispatch<React.SetStateAction<number>>;
  setLatticeHeight: React.Dispatch<React.SetStateAction<number>>;
  setDelay: React.Dispatch<React.SetStateAction<number>>;
  setCurrentLattice: React.Dispatch<React.SetStateAction<boolean[][] | null>>;
  setSavedStartingLattice: React.Dispatch<
    React.SetStateAction<boolean[][] | null>
  >;
};
