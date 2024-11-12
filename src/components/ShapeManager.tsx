import { useRef } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { saveShapeToFile } from "../lib/saveShapeToFile";
import { TShape } from "../types/types";

export const ShapeManager: React.FC = () => {
  const {
    currentLattice,
    latticeWidth,
    latticeHeight,
    setCurrentLattice,
    setIsShapeManagerVisible,
  } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
          <select className="text-black p-2 rounded-md">
            <option value="">Select a predefined shape to load</option>
            {/* Add more options as needed */}
          </select>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
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
