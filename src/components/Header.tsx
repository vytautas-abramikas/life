import { FullScreenButton } from "./FullScreenButton";
import { Counter } from "./Counter";
import { Controls } from "./Controls";

export const Header: React.FC = () => {
  return (
    <div className="w-full min-h-[10vh] bg-black grid grid-cols-5">
      <div className="col-start-1 col-span-1">
        <FullScreenButton />
      </div>
      <div className="col-start-2 col-span-1">
        <Counter />
      </div>
      <div className="col-span-2">
        <Controls />
      </div>
    </div>
  );
};
