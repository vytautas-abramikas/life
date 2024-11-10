import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const Controls: React.FC = () => {
  const {
    currentLattice,
    latticeWidth,
    latticeHeight,
    delay,
    isRunning,
    generation,
    latticeType,
    setCurrentLattice,
    setSavedStartingLattice,
    setDelay,
    setIsRunning,
    setLatticeWidth,
    setLatticeHeight,
    setGeneration,
    setLatticeType,
  } = useAppContext();

  const [localWidth, setLocalWidth] = useState(latticeWidth);
  const [localHeight, setLocalHeight] = useState(latticeHeight);

  const handleCreateLattice = () => {
    setLatticeWidth(localWidth);
    setLatticeHeight(localHeight);
    const newLattice: boolean[][] = Array.from({ length: localHeight }, () =>
      Array.from({ length: localWidth }, () => false)
    );
    setCurrentLattice(newLattice);
  };

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
    <div className="flex flex-row items-center justify-start text-white w-[80%] h-full">
      <label className="">Width:</label>
      <input
        type="number"
        value={localWidth}
        onChange={(e) => setLocalWidth(Number(e.target.value))}
        disabled={isRunning || generation !== 0}
        className="text-black w-[5%] p-1 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      />
      <label className="">Height:</label>
      <input
        type="number"
        value={localHeight}
        onChange={(e) => setLocalHeight(Number(e.target.value))}
        disabled={isRunning || generation !== 0}
        className="text-black w-[5%] p-1 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      />
      <label className="">Delay:</label>
      <input
        type="number"
        value={delay === 0 ? "" : delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isRunning}
        className="text-black w-[5%] p-1 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      />
      <label className="">Type:</label>
      <select
        value={latticeType}
        onChange={(e) =>
          setLatticeType(e.target.value as "toroidal" | "bounded")
        }
        disabled={isRunning}
        className="text-black w-[10%] p-2 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      >
        <option value="toroidal">Toroidal</option>
        <option value="bounded">Bounded</option>
      </select>
      {!isRunning && currentLattice && (
        <button
          onClick={handleStartRunning}
          className="rounded ml-1"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          ▶️
        </button>
      )}
      {isRunning && (
        <button
          onClick={() => setIsRunning(false)}
          className="rounded ml-1"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          ⏸️
        </button>
      )}
      {generation > 0 && !isRunning && (
        <button
          onClick={handleJumpToStart}
          className="rounded ml-1"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          ⏪
        </button>
      )}
      {generation === 0 && (
        <button
          onClick={handleCreateLattice}
          className="rounded p-1 ml-1"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          ⚒️
        </button>
      )}
      {generation === 0 && currentLattice && (
        <button
          onClick={handleClearLattice}
          className="rounded p-1 ml-1"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          🧹
        </button>
      )}
      {generation === 0 && currentLattice && (
        <button
          onClick={handleRandomizeLattice}
          className="rounded p-1 ml-1"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          🎲
        </button>
      )}
    </div>
  );
};
