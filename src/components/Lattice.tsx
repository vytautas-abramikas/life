import { useAppContext } from "../hooks/useAppContext";
import { getCellColor } from "../lib/getCellColor";

export const Lattice: React.FC = () => {
  const {
    latticeWidth,
    latticeHeight,
    latticeType,
    currentLattice,
    setCurrentLattice,
  } = useAppContext();

  if (!currentLattice) return null;

  const cellSizeWidth = window.innerWidth / latticeWidth;
  const cellSizeHeight = (window.innerHeight * 0.9) / latticeHeight;
  const cellSizeRem = Math.min(cellSizeWidth, cellSizeHeight) / 17;

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

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div
        className="grid max-w-full max-h-full w-auto h-auto"
        style={{
          gridTemplateColumns: `repeat(${latticeWidth}, ${cellSizeRem}rem)`,
          gridTemplateRows: `repeat(${latticeHeight}, ${cellSizeRem}rem)`,
        }}
      >
        {currentLattice.map((row, yIndex) =>
          row.map((_, xIndex) => (
            <div
              key={`${yIndex}-${xIndex}`}
              className={`border border-gray-800 aspect-square ${getCellColor(
                yIndex,
                xIndex,
                currentLattice,
                latticeType
              )}`}
              onClick={() => toggleCell(yIndex, xIndex)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};
