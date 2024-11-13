import React from "react";

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else {
      console.error("Method to enter full screen mode not found");
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      console.error("Method to exit full screen mode not found");
    }
  }
};

export const FullScreenButton: React.FC = React.memo(() => {
  return (
    <button
      className="fixed top-0 left-0 flex items-center justify-center hover:scale-110 hover:opacity-50 transition duration-500 ease-out bg-black opacity-25 rounded-xl text-4xl text-white h-16 w-16"
      style={{
        fontSize: "min(4vh, 4vw)",
        marginTop: "0.2em",
        marginLeft: "0.2em",
      }}
      onClick={toggleFullscreen}
    >
      🔳
    </button>
  );
});
