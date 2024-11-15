import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { saveShapeToFile } from "../lib/saveShapeToFile";
import { loadPredefinedShapes } from "../lib/loadPredefinedShapes";
import { TJSONShape, TShape } from "../types/types";

export const ShapeManager: React.FC = () => {
  const {
    currentLattice,
    latticeWidth,
    latticeHeight,
    setCurrentLattice,
    setIsShapeManagerVisible,
  } = useAppContext();

  const [predefinedShapes, setPredefinedShapes] = useState<TShape[]>([]);
  const [selectedPredefinedShape, setSelectedPredefinedShape] =
    useState<TShape | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const loadedShapes = await loadPredefinedShapes();
      setPredefinedShapes(loadedShapes);
    })();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const shape = JSON.parse(e.target.result as string) as TJSONShape;
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
            console.error(error);
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

  const loadShapeIntoLattice = (shape: TJSONShape) => {
    if (shape.width > latticeWidth || shape.height > latticeHeight) {
      alert(
        `The shape does not fit into the current lattice. The shape requires lattice width of ${shape.width} and height of ${shape.height}.`
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

  const handleLoadPredefinedShape = () => {
    if (selectedPredefinedShape) {
      loadShapeIntoLattice(selectedPredefinedShape);
    }
    setIsShapeManagerVisible(false);
  };

  const handleClose = () => {
    setIsShapeManagerVisible(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border border-white rounded-lg p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-4">Shape Manager</h2>
        <div className="flex justify-center space-x-4 mb-4">
          {currentLattice && (
            <>
              <button
                onClick={() => saveShapeToFile(currentLattice)}
                className="rounded p-1 ml-1 hover:scale-110 transition duration-300"
                style={{ fontSize: "min(4vh, 4vw)" }}
              >
                💾
              </button>

              <input
                id="file-input"
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
        <div className="flex justify-center items-center space-x-4 mb-4">
          <select
            id="predefined-shape-select"
            className="text-black p-2 rounded-md"
            onChange={(e) => {
              const selected = predefinedShapes.find(
                (shape) => shape.name === e.target.value
              );
              setSelectedPredefinedShape(selected || null);
            }}
          >
            <option value="">Select a predefined shape</option>{" "}
            {predefinedShapes.map((shape) => (
              <option
                key={shape.name}
                value={shape.name}
                disabled={
                  shape.width > latticeWidth || shape.height > latticeHeight
                }
                className={
                  shape.width > latticeWidth || shape.height > latticeHeight
                    ? "option-disabled"
                    : ""
                }
              >
                {shape.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleLoadPredefinedShape}
            disabled={!selectedPredefinedShape}
            className="bg-blue-500 disabled:bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Load
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
