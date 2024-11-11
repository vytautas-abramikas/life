export type TLatticeType = "toroidal" | "bounded";

export type TAppContextProps = {
  colorScheme: TColorScheme;
  isShowBorder: boolean;
  isRunning: boolean;
  generation: number;
  population: number;
  latticeType: TLatticeType;
  latticeWidth: number;
  latticeHeight: number;
  delay: number;
  currentLattice: boolean[][] | null;
  setColorScheme: React.Dispatch<React.SetStateAction<TColorScheme>>;
  setIsShowBorder: React.Dispatch<React.SetStateAction<boolean>>;
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

export type TColorScheme = "ordinary" | "rgb" | "grayscale" | "rainbow";
