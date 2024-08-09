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
    <main className="flex-1 text-center p-4 flex flex-col">
      <section
        id="hero"
        className="flex flex-col justify-center gap-3 pb-20 h-screen"
      >
        <h1 className="font-semibold text-5xl sm:text6xl md:text-7xl text-white">
          smart
          <span className="text-indigo-400 font-bold">notes</span>
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
          to get started
        </p>
        <p className="italic text-slate-400">
          Your Notes, Your Language, Enhanced by AI.
        </p>
      </section>

      <section id="about" className="p-4 flex flex-col gap-10 mb-60">
        <div className="flex flex-col gap-10 max-w-[800px] w-full mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold text-white">
            smart
            <span className=" font-sans text-indigo-400 font-bold">notes </span>
            {""}
            simplifies your workflow in <b className="text-indigo-400">
              2
            </b>{" "}
            <span className="font-sans font-bold underline-effect">
              smart steps
            </span>
          </h1>

          <p className="text-white font-normal">
            Transform your voice into organized notes within seconds. Seamlessly
            <b className="text-indigo-400"> transcribe </b>
            your thoughts and <b className="text-indigo-400">translate</b> them
            into any language, making your ideas instantly accessible and easy
            to share.
          </p>
        </div>
        <div class="flex flex-col flex-wrap sm:flex-row gap-4 md:gap-6 max-w-[800px] w-full mx-auto px-8">
          <div class="flex flex-col gap-4 p-4 relative rounded-lg border flex-1 bg-slate-950 shadow-lg min-w-[180px] border-solid  overflow-hidden specialShadow text-white ">
            <div class="hidden sm:flex flex-col gap-4">
              <div class="flex items-center justify-between gap-2  z-10">
                <h3 class="text-2xl sm:text-3xl md:text-4xl  font-semibold">
                  01{" "}
                </h3>
                <div class="text-xl sm:text-2xl md:text-3xl">
                  <i class="fa-solid fa-pen-clip"></i>
                </div>
              </div>
              <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-left">
                Transcribe
              </h3>
            </div>
            <div class="flex sm:hidden flex-col gap-4">
              <div class="flex items-center justify-between gap-2  z-10">
                <h3 class="text-2xl sm:text-3xl md:text-4xl  font-semibold">
                  01{" "}
                </h3>
                <h3 class="text-lg sm:text-xl md:text-2xl font-semibold">
                  Transcribe
                </h3>
                <div class="text-xl sm:text-2xl md:text-3xl">
                  <i class="fa-solid fa-pen-clip"></i>
                </div>
              </div>
            </div>
            <p class="z-10 text-center sm:text-left">
              Convert your voice or lectures into notes with AI-driven accuracy.
            </p>
          </div>

          <div class="flex flex-col gap-4 p-4 relative rounded-lg border flex-1 bg-slate-950 shadow-lg min-w-[180px] border-solid specialShadow overflow-hidden text-white ">
            <div class="hidden sm:flex flex-col gap-4">
              <div class="flex items-center justify-between gap-2  z-10">
                <h3 class="text-2xl sm:text-3xl md:text-4xl  font-semibold">
                  02{" "}
                </h3>
                <div class="text-xl sm:text-2xl md:text-3xl">
                  <i class="fa-solid fa-earth-americas"></i>
                </div>
              </div>
              <h3 class="text-lg sm:text-xl md:text-2xl font-semibold text-left ">
                Translate
              </h3>
            </div>
            <div class="flex sm:hidden flex-col gap-4">
              <div class="flex items-center justify-between gap-2  z-10">
                <h3 class="text-2xl sm:text-3xl md:text-4xl  font-semibold">
                  02{" "}
                </h3>
                <h3 class="text-lg sm:text-xl md:text-2xl font-semibold">
                  Translate
                </h3>
                <div class="text-xl sm:text-2xl md:text-3xl">
                  <i class="fa-solid fa-earth-americas"></i>
                </div>
              </div>
            </div>
            <p class="z-10 text-center sm:text-left">
              Break language barriers by translating notes into your preferred
              language.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
