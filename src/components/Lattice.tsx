import { TCell } from "../types/types";

export const Lattice: React.FC<{
  width: number;
  height: number;
  cells: TCell[][];
}> = ({ width, height, cells }) => {
  const cellSizeWidth = window.innerWidth / width;
  const cellSizeHeight = (window.innerHeight * 0.9) / height;
  const cellSizeRem = Math.min(cellSizeWidth, cellSizeHeight) / 17;

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div
        className="grid max-w-full max-h-full w-auto h-auto"
        style={{
          gridTemplateColumns: `repeat(${width}, ${cellSizeRem}rem)`,
          gridTemplateRows: `repeat(${height}, ${cellSizeRem}rem)`,
        }}
      >
        {cells.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`border border-gray-800 aspect-square ${
                cell.isAlive ? "bg-green-500" : "bg-black"
              } ${cell.isClickable ? "cursor-pointer" : ""}`}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};
