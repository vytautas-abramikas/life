import { useState, useRef } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { saveShapeToFile } from "../lib/saveShapeToFile";
import { TShape } from "../types/types";

export const Controls: React.FC = () => {
  const {
    colorScheme,
    currentLattice,
    latticeWidth,
    latticeHeight,
    delay,
    isRunning,
    generation,
    latticeType,
    setColorScheme,
    setCurrentLattice,
    setSavedStartingLattice,
    setDelay,
    setIsRunning,
    setLatticeWidth,
    setLatticeHeight,
    setGeneration,
    setLatticeType,
    setIsShowBorder,
  } = useAppContext();

  const [localWidth, setLocalWidth] = useState(latticeWidth);
  const [localHeight, setLocalHeight] = useState(latticeHeight);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSetLocalWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 1) {
      value = 1;
    } else if (value > 150) {
      value = 150;
    }
    setLocalWidth(value);
  };
  const handleSetLocalHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 1) {
      value = 1;
    } else if (value > 150) {
      value = 150;
    }
    setLocalHeight(value);
  };
  const handleSetDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 0) {
      value = 0;
    } else if (value > 1000) {
      value = 1000;
    }
    setDelay(value);
  };

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
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const loadShapeIntoLattice = (shape: TShape) => {
    if (shape.width > latticeWidth || shape.height > latticeHeight) {
      alert("Shape does not fit into the current lattice.");
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
    <div className="flex flex-row items-center justify-start text-white w-[80%] h-full">
      <label className="">Width:</label>
      <input
        type="number"
        value={localWidth}
        onChange={handleSetLocalWidth}
        disabled={isRunning || generation !== 0}
        className="text-black w-[6%] p-1 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      />
      <label className="">Height:</label>
      <input
        type="number"
        value={localHeight}
        onChange={handleSetLocalHeight}
        disabled={isRunning || generation !== 0}
        className="text-black w-[6%] p-1 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      />
      <label className="">Delay:</label>
      <input
        type="number"
        value={delay === 0 ? "" : delay}
        onChange={handleSetDelay}
        disabled={isRunning}
        className="text-black w-[6%] p-1 ml-2 mr-4 rounded-md disabled:bg-gray-500"
      />
      <label className="">Type:</label>
      <select
        value={latticeType}
        onChange={(e) =>
          setLatticeType(e.target.value as "toroidal" | "bounded")
        }
        disabled={isRunning}
        className="text-black w-[10%] p-2 ml-2 mr-4 rounded-md disabled:bg-gray-400"
      >
        <option value="toroidal">Toroidal</option>
        <option value="bounded">Bounded</option>
      </select>
      <label className="">Colors:</label>
      <select
        value={colorScheme}
        onChange={(e) =>
          setColorScheme(
            e.target.value as "ordinary" | "rgb" | "grayscale" | "rainbow"
          )
        }
        className="text-black w-[10%] p-2 ml-2 mr-4 rounded-md disabled:bg-gray-400"
      >
        <option value="ordinary">Ordinary</option>
        <option value="rgb">RGB</option>
        <option value="grayscale">Grayscale</option>
        <option value="rainbow">Rainbow</option>
      </select>
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
      {generation === 0 && (
        <button
          onClick={handleCreateLattice}
          className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
          style={{ fontSize: "min(4vh, 4vw)" }}
        >
          ⚒️
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
  );
};
