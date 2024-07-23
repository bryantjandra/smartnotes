import React, { useState } from "react";
import Transcription from "./Transcription.jsx";
import Translation from "./Translation.jsx";

function Information(props) {
  const { output } = props;
  console.log(output);
  const [tab, setTab] = useState("transcription");
  return (
    <main className="flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4  pb-20  max-w-prose w-full mx-auto ">
      <h1 className="font-semibold text-center text-5xl sm:text-6xl md:text-7xl whitespace-nowrap">
        Your <span className="text-blue-400 font-bold">Transcription</span>
      </h1>{" "}
      <div className="grid grid-cols-2 mx-auto bg-white  shadow rounded-full overflow-hidden items-center ">
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-2 duration-200 " +
            (tab === "transcription"
              ? "bg-blue-300 text-white"
              : "text-blue-400 hover:text-blue-500")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => {
            setTab("translation");
          }}
          className={
            "px-4 py-2  duration-200 " +
            (tab === "translation"
              ? "bg-blue-300 text-white"
              : "text-blue-400 hover:text-blue-500")
          }
        >
          Translation
        </button>
      </div>
      {tab === "transcription" ? (
        <Transcription {...props} />
      ) : (
        <Translation {...props} />
      )}
    </main>
  );
}

export default Information;
