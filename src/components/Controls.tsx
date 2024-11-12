import { useAppContext } from "../hooks/useAppContext";
import { LatticeSizeControls } from "./LatticeSizeControls";
import { LatticeSettings } from "./LatticeSettings";
import { ShapeManager } from "./ShapeManager";
import { useEffect } from "react";

export const Controls: React.FC = () => {
  const {
    currentLattice,
    latticeWidth,
    latticeHeight,
    isRunning,
    generation,
    isLatticeSizeControlsVisible,
    isLatticeSettingsVisible,
    isShapeManagerVisible,
    setCurrentLattice,
    setSavedStartingLattice,
    setIsRunning,
    setGeneration,
    setIsShowBorder,
    setIsLatticeSizeControlsVisible,
    setIsLatticeSettingsVisible,
    setIsShapeManagerVisible,
  } = useAppContext();

  useEffect(() => {
    if (!currentLattice) {
      setIsLatticeSizeControlsVisible(true);
    }
  }, []);

  const handleJumpToStart = () => {
    setIsRunning(false);
    setGeneration(0);
  };

  const handleStartRunning = () => {
    if (generation === 0) {
      setSavedStartingLattice(currentLattice);
    }
    setIsRunning(true);
  };

  const handleClearLattice = () => {
    const emptyLattice: boolean[][] = Array.from(
      { length: latticeHeight },
      () => Array.from({ length: latticeWidth }, () => false)
    );
    setCurrentLattice(emptyLattice);
  };

  const handleRandomizeLattice = () => {
    const randomLattice: boolean[][] = Array.from(
      { length: latticeHeight },
      () => Array.from({ length: latticeWidth }, () => Math.random() > 0.9)
    );
    setCurrentLattice(randomLattice);
  };

  return (
    <>
      {isLatticeSizeControlsVisible && <LatticeSizeControls />}
      {isLatticeSettingsVisible && <LatticeSettings />}
      {isShapeManagerVisible && <ShapeManager />}
      <div className="flex items-center justify-start text-white w-[100%] h-full">
        {!isRunning && generation === 0 && (
          <button
            onClick={() => setIsLatticeSizeControlsVisible(true)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            &#x26F6;
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            onClick={handleStartRunning}
            className="rounded ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ▶️
          </button>
        )}
        {isRunning && (
          <button
            onClick={() => setIsRunning(false)}
            className="rounded ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ⏸️
          </button>
        )}
        {generation > 0 && !isRunning && (
          <button
            onClick={handleJumpToStart}
            className="rounded ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ⏪
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            onClick={() => setIsLatticeSettingsVisible(true)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ⚙️
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            onClick={() => setIsShapeManagerVisible(true)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            📃
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            onClick={handleClearLattice}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            🧹
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            onClick={handleRandomizeLattice}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            🎲
          </button>
        )}
        {currentLattice && (
          <button
            onClick={() => setIsShowBorder((prev) => !prev)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            🏁
          </button>
        )}
      </div>
    </>
  );
};
