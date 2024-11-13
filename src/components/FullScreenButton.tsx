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
    <div className="flex flex-col items-start justify-start w-[100%] h-full">
      <button
        className="flex items-center justify-start hover:scale-110 hover:opacity-50 transition duration-500 ease-out bg-black opacity-25 rounded-xl text-4xl text-white p-2"
        style={{
          fontSize: "min(5vh, 5vw)",
          margin: "0.4em",
          color: "white",
        }}
        onClick={toggleFullscreen}
      >
        ↕
      </button>
    </div>
  );
});
