import { Counter } from "./Counter";
import { Controls } from "./Controls";

export const Header: React.FC = () => {
  return (
    <div className="w-full min-h-[10vh] bg-black grid grid-cols-2">
      <Counter />
      <Controls />
    </div>
  );
};
