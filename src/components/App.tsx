import { AppProvider } from "../context/AppContext";
import { Header } from "./Header";
import { Lattice } from "./Lattice";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-1 flex justify-center items-center bg-black">
          <Lattice />
        </div>
      </div>
    </AppProvider>
  );
};
