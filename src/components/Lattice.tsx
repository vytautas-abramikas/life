import { getCellColor } from "../lib/getCellColor";
import { TLatticeType } from "../types/types";

export const Lattice: React.FC<{
  latticeWidth: number;
  latticeHeight: number;
  currentLattice: boolean[][];
  latticeType: TLatticeType;
}> = ({ latticeWidth, latticeHeight, currentLattice, latticeType }) => {
  const cellSizeWidth = window.innerWidth / latticeWidth;
  const cellSizeHeight = (window.innerHeight * 0.9) / latticeHeight;
  const cellSizeRem = Math.min(cellSizeWidth, cellSizeHeight) / 17;

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
            ></div>
          ))
        )}
      </div>
    </div>
  );
};
