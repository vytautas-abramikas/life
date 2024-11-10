import { Counter } from "./Counter";
import { Controls } from "./Controls";

export const Header: React.FC = () => {
  return (
    <div
      className="w-full min-h-[10vh] bg-black flex items-center justify-start"
      style={{ fontSize: "min(2vh, 2vw)" }}
    >
      <Counter />
      <Controls />
    </div>
  );
};
