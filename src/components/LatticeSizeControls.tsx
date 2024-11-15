import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const LatticeSizeControls: React.FC = () => {
  const {
    latticeWidth,
    latticeHeight,
    setLatticeWidth,
    setLatticeHeight,
    setCurrentLattice,
    setIsLatticeSizeControlsVisible,
  } = useAppContext();

  const [localWidth, setLocalWidth] = useState(latticeWidth);
  const [localHeight, setLocalHeight] = useState(latticeHeight);

  const handleSetWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setLocalWidth(Number(value));
  };

  const handleSetHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setLocalHeight(Number(value));
  };

  const handleCreateLattice = () => {
    const width = Math.max(5, Math.min(Number(localWidth), 150));
    const height = Math.max(5, Math.min(Number(localHeight), 150));
    setLatticeWidth(width);
    setLatticeHeight(height);
    const newLattice: boolean[][] = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );
    setCurrentLattice(newLattice);
    setIsLatticeSizeControlsVisible(false);
  };

  const handleCancel = () => {
    setIsLatticeSizeControlsVisible(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border border-white rounded-lg p-6 text-center">
        <h2 className="text-white font-bold text-xl mb-4">
          Lattice dimensions
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <label htmlFor="set-width" className="text-white w-20">
              Width:
            </label>
            <input
              id="set-width"
              type="text"
              value={localWidth}
              onChange={handleSetWidth}
              className="text-black p-2 rounded-md w-20"
              placeholder="Width"
            />
          </div>
          <div className="flex items-center justify-center space-x-4">
            <label htmlFor="set-height" className="text-white w-20">
              Height:
            </label>
            <input
              id="set-height"
              type="text"
              value={localHeight}
              onChange={handleSetHeight}
              className="text-black p-2 rounded-md w-20"
              placeholder="Height"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-2 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateLattice}
            className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
