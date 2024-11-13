import { AppProvider } from "../context/AppContext";
import { Header } from "./Header";
import { Lattice } from "./Lattice";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="font-sans flex flex-col w-full h-screen overflow-hidden bg-black">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <Lattice />
        </div>
      </div>
    </AppProvider>
  );
};
