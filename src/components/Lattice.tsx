import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { getCellColor } from "../lib/getCellColor";

export const Lattice: React.FC = () => {
  const {
    colorScheme,
    isShowBorder,
    isRunning,
    latticeWidth,
    latticeHeight,
    latticeType,
    currentLattice,
    setCurrentLattice,
  } = useAppContext();

  const [cellSizeRem, setCellSizeRem] = useState(0);

  useEffect(() => {
    const calculateCellSize = () => {
      const cellSizeWidth = window.innerWidth / latticeWidth;
      const cellSizeHeight = (window.innerHeight * 0.9) / latticeHeight;
      setCellSizeRem(Math.min(cellSizeWidth, cellSizeHeight) / 17);
    };
    calculateCellSize();
    window.addEventListener("resize", calculateCellSize);
    return () => window.removeEventListener("resize", calculateCellSize);
  }, [latticeWidth, latticeHeight]);

  const toggleCell = (y: number, x: number) => {
    setCurrentLattice((prev) => {
      if (prev) {
        const newGrid = prev.map((row) => [...row]);
        newGrid[y][x] = !newGrid[y][x];
        return newGrid;
      }
      return prev;
    });
  };

  if (!currentLattice) return null;

  return (
    <div
      className={`flex justify-center items-center h-[90vh] ${
        isRunning ? "pointer-events-none" : ""
      }`}
    >
      <div
        className="grid max-w-full max-h-full w-auto h-auto"
        style={{
          gridTemplateColumns: `repeat(${latticeWidth}, ${cellSizeRem}rem)`,
          gridTemplateRows: `repeat(${latticeHeight}, ${cellSizeRem}rem)`,
        }}
      >
        {currentLattice.map((row, yIndex) =>
          row.map((cell, xIndex) => (
            <div
              key={`${yIndex}-${xIndex}`}
              className={`aspect-square border ${
                isShowBorder ? "border-gray-800" : "border-black"
              } ${!isRunning ? "cursor-pointer" : ""} ${
                cell
                  ? colorScheme !== "ordinary"
                    ? getCellColor(
                        yIndex,
                        xIndex,
                        currentLattice,
                        latticeType,
                        colorScheme
                      )
                    : "bg-white"
                  : "bg-black"
              }`}
              onClick={() => toggleCell(yIndex, xIndex)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};
