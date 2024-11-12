import { useAppContext } from "../hooks/useAppContext";

export const LatticeSettings: React.FC = () => {
  const {
    delay,
    latticeType,
    colorScheme,
    setDelay,
    setLatticeType,
    setColorScheme,
    setIsLatticeSettingsVisible,
  } = useAppContext();

  const handleSetDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (value < 0) {
      value = 0;
    } else if (value > 1000) {
      value = 1000;
    }
    setDelay(value);
  };

  const handleClose = () => {
    setIsLatticeSettingsVisible(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black border border-white rounded-lg p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-4">Lattice Settings</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-white w-20">Delay:</label>
            <input
              type="text"
              value={delay}
              onChange={handleSetDelay}
              className="text-black p-2 rounded-md w-32"
              placeholder="Delay"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-white w-20">Type:</label>
            <select
              value={latticeType}
              onChange={(e) =>
                setLatticeType(e.target.value as "toroidal" | "bounded")
              }
              className="text-black p-2 rounded-md w-32"
            >
              <option value="toroidal">Toroidal</option>
              <option value="bounded">Bounded</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-white w-20">Colors:</label>
            <select
              value={colorScheme}
              onChange={(e) =>
                setColorScheme(
                  e.target.value as "ordinary" | "rgb" | "grayscale" | "rainbow"
                )
              }
              className="text-black p-2 rounded-md w-32"
            >
              <option value="ordinary">Ordinary</option>
              <option value="rgb">RGB</option>
              <option value="grayscale">Grayscale</option>
              <option value="rainbow">Rainbow</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleClose}
            className="bg-red-500 text-white py-2 px-2 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
