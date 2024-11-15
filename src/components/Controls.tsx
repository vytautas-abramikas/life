import { useAppContext } from "../hooks/useAppContext";
import { LatticeSizeControls } from "./LatticeSizeControls";
import { LatticeSettings } from "./LatticeSettings";
import { ShapeManager } from "./ShapeManager";
import { useEffect } from "react";
import { Toast } from "./Toast";

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
    toastMessage,
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
      () => Array.from({ length: latticeWidth }, () => Math.random() > 0.5)
    );
    setCurrentLattice(randomLattice);
  };

  return (
    <>
      {isLatticeSizeControlsVisible && <LatticeSizeControls />}
      {isLatticeSettingsVisible && <LatticeSettings />}
      {isShapeManagerVisible && <ShapeManager />}
      {toastMessage && <Toast />}
      <div className="flex items-center justify-start text-white w-[100%] h-full">
        {!isRunning && generation === 0 && (
          <button
            title="Create lattice"
            onClick={() => setIsLatticeSizeControlsVisible(true)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            &#x26F6;
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            title="Run"
            onClick={handleStartRunning}
            className="rounded ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ▶️
          </button>
        )}
        {isRunning && (
          <button
            title="Pause"
            onClick={() => setIsRunning(false)}
            className="rounded ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ⏸️
          </button>
        )}
        {generation > 0 && !isRunning && (
          <button
            title="Jump to start"
            onClick={handleJumpToStart}
            className="rounded ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ⏪
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            title="Lattice Settings"
            onClick={() => setIsLatticeSettingsVisible(true)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            ⚙️
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            title="Shape Manager"
            onClick={() => setIsShapeManagerVisible(true)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            📚
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            title="Clear lattice"
            onClick={handleClearLattice}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            🧹
          </button>
        )}
        {!isRunning && currentLattice && (
          <button
            title="Randomize lattice"
            onClick={handleRandomizeLattice}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            🎲
          </button>
        )}
        {currentLattice && (
          <button
            title="Toggle borders"
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
