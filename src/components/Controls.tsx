import { useRef } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { LatticeSizeControls } from "./LatticeSizeControls";
import { LatticeSettings } from "./LatticeSettings";
import { saveShapeToFile } from "../lib/saveShapeToFile";
import { TShape } from "../types/types";

export const Controls: React.FC = () => {
  const {
    currentLattice,
    latticeWidth,
    latticeHeight,
    isRunning,
    generation,
    isLatticeSizeControlsVisible,
    isLatticeSettingsVisible,
    setCurrentLattice,
    setSavedStartingLattice,
    setIsRunning,
    setGeneration,
    setIsShowBorder,
    setIsLatticeSizeControlsVisible,
    setIsLatticeSettingsVisible,
  } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const shape = JSON.parse(e.target.result as string) as TShape;
            if (
              typeof shape.width === "number" &&
              typeof shape.height === "number" &&
              Array.isArray(shape.lattice) &&
              shape.lattice.every(
                (row) =>
                  Array.isArray(row) &&
                  row.every((cell) => typeof cell === "number")
              )
            ) {
              loadShapeIntoLattice(shape);
            } else {
              alert("Invalid file format. Please provide a valid shape file.");
            }
          } catch (error) {
            alert("Error parsing file. Please provide a valid JSON file.");
          } finally {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const loadShapeIntoLattice = (shape: TShape) => {
    if (shape.width > latticeWidth || shape.height > latticeHeight) {
      alert(
        `Shape does not fit into the current lattice. The shape requires lattice width of ${shape.width} and height of ${shape.height}.`
      );
      return;
    }
    const booleanLattice = shape.lattice.map((row) =>
      row.map((cell) => cell === 1)
    );
    const newLattice: boolean[][] = Array.from({ length: latticeHeight }, () =>
      Array.from({ length: latticeWidth }, () => false)
    );
    const startX = Math.floor((latticeWidth - shape.width) / 2);
    const startY = Math.floor((latticeHeight - shape.height) / 2);
    for (let y = 0; y < shape.height; y++) {
      for (let x = 0; x < shape.width; x++) {
        newLattice[startY + y][startX + x] = booleanLattice[y][x];
      }
    }
    setCurrentLattice(newLattice);
  };

  return (
    <>
      {isLatticeSizeControlsVisible && <LatticeSizeControls />}
      {isLatticeSettingsVisible && <LatticeSettings />}
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
        {generation === 0 && currentLattice && (
          <button
            onClick={handleClearLattice}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            🧹
          </button>
        )}
        {generation === 0 && currentLattice && (
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
        {currentLattice && !isRunning && (
          <button
            onClick={() => saveShapeToFile(currentLattice)}
            className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
            style={{ fontSize: "min(4vh, 4vw)" }}
          >
            💾
          </button>
        )}
        {currentLattice && !isRunning && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
              style={{ fontSize: "min(4vh, 4vw)" }}
            >
              📂
            </button>
          </>
        )}
      </div>
    </>
  );
};
