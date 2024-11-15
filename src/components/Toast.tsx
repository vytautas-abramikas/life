import { useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";

export const Toast: React.FC = () => {
  const { toastMessage, setToastMessage } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  }, [toastMessage]);

  return (
    <div className="fixed bottom-0 right-0 m-4 bg-red-500 text-white p-4 rounded shadow-md transition-opacity duration-300">
      {toastMessage}
    </div>
  );
};
