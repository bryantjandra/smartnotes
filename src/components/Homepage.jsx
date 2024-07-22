import React, { useState, useEffect, useRef } from "react";

function Homepage(props) {
  const { setAudioStream, setFile } = props;
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;
    console.log("Start Recording");

    try {
      const streamData = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data === "undefined") {
        return;
      }
      if (e.data.size === 0) {
        return;
      }
      setAudioChunks((audioChunk) => [...audioChunk, e.data]);
    };
  }

  return (
    <main className="flex-1 text-center p-4 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        transla<span className="text-blue-400 font-bold">scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr; </span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span>
        Translate
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full specialBtn px-4 py-2 rounded-xl my-4">
        <p className="text-blue-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          upload{" "}
          <input
            onChange={(e) => {
              console.log(e);
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            className="hidden"
            type="file"
            accept=".mp3,.wav"
          />
        </label>{" "}
        a mp3 or wav file
      </p>
      <p className="italic text-slate-400">
        Your Words, Any Language, Instantly.
      </p>
    </main>
  );
}

export default Homepage;
