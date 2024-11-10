import { useAppContext } from "../hooks/useAppContext";

const Counter: React.FC = () => {
  const { generation, population } = useAppContext();

  return (
    <div className="flex flex-col items-start justify-center bg-black text-white p-2 rounded w-[20%] h-full">
      <div className="flex items-start justify-start w-full">
        <div className="flex-1 text-right mr-1">Generation:</div>
        <div className="flex-1 text-yellow-200">{generation}</div>
      </div>
      <div className="flex items-start justify-start w-full">
        <div className="flex-1 text-right mr-1">Population:</div>
        <div className="flex-1 text-green-200">{population}</div>
      </div>
    </div>
  );
};

export { Counter };