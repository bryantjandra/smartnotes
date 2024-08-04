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
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }

    setRecordingStatus("recording");
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop Recording");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }
    const intervalId = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [recordingStatus]);

  return (
    <main className="flex-1 text-center p-4 flex flex-col justify-center gap-3 sm:gap-4 pb-20">
      <section id="hero" className="my-4">
        <h1 className="font-semibold text-5xl sm:text6xl md:text-7xl text-white">
          transla<span className="text-indigo-400 font-bold">scribe</span>
        </h1>

        <h3 className="font-normal md:text-lg text-white">
          Record <span className="text-indigo-400">&rarr; </span> Transcribe{" "}
          <span className="text-indigo-400">&rarr;</span>
          Translate
        </h3>
        <button
          onClick={
            recordingStatus === "recording" ? stopRecording : startRecording
          }
          className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full specialBtn px-4 py-2 rounded-xl my-4"
        >
          <div className="flex items-center justify-between w-full">
            <p className="text-white font-light">
              {recordingStatus === "inactive" ? "Record" : "Stop Recording"}
            </p>
            <div className="flex items-center gap-2">
              {duration !== 0 && <p className="text-sm">{duration}s</p>}
              <i
                className={
                  "fa-solid duration-200 fa-microphone " +
                  (recordingStatus === "recording" ? "text-rose-300" : "")
                }
              ></i>
            </div>
          </div>
        </button>
        <p className="text-base text-white">
          Or{" "}
          <label className="text-indigo-400 cursor-pointer hover:text-indigo-500 duration-200">
            upload{" "}
            <input
              onChange={(e) => {
                console.log(e);
                const tempFile = e.target.files[0];
                setFile(tempFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3"
            />
          </label>{" "}
          an mp3 file
        </p>
        <p className="italic text-slate-400">
          Your Words, Any Language, Instantly.
        </p>
      </section>
    </main>
  );
}

export default Homepage;
