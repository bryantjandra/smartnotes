import React, { useRef, useEffect } from "react";

function FileDisplay(props) {
  const { handleAudioReset, file, audioStream, handleFormSubmission } = props;

  const audioRef = useRef();

  useEffect(() => {
    if (!file && !audioStream) {
      return;
    }
    if (file) {
      audioRef.current.src = URL.createObjectURL(file);
    } else {
      audioRef.current.src = URL.createObjectURL(audioStream);
    }
  }, [audioStream, file]);

  return (
    <main className="flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4 pb-20 w-full max-w-prose mx-auto ">
      <h1 className="font-semibold text-center text-5xl sm:text-6xl md:text-7xl text-white">
        Your&nbsp;<span className="text-indigo-400 font-bold">File</span>
      </h1>
      <div className="flex flex-col text-left mb-4 my-4">
        <h3 className="font-semibold text-white">Name:</h3>
        <p className="text-slate-400 ">{file ? file?.name : "Custom Audio"}</p>
      </div>
      <div className="flex flex-col mb-2">
        <audio ref={audioRef} className="w-full" controls>
          Your browser does not support the audio element
        </audio>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            handleAudioReset();
          }}
          className="text-indigo-300 hover:text-indigo-200 duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="flex items-center gap-2 font-medium specialBtn px-3 py-2 rounded-lg text-indigo-400"
        >
          <p className="text-white">Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}

export default FileDisplay;
