import { useState, useEffect, useRef } from "react";
import FileDisplay from "./components/FileDisplay";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      (worker.current = new Worker(
        new URL("./utils/whisper.worker.js"),
        import.meta.url
      )),
        {
          type: "module",
        };
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("Downloading");
          break;
        case "LOADING":
          setLoading(true);
          console.log("Loading");
          break;
        case "RESULT":
          setOutput(e.data.result);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("Done");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  }, []);

  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) {
      return;
    }
    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = `openai/whisper-tiny.en`;

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  const isAudioAvailable = file || audioStream;
  return (
    <>
      <div className="flex flex-col p-4 max-w-[1000px] mx-auto w-full">
        <section className="min-h-screen flex flex-col">
          <Header />
          {output ? (
            <Information />
          ) : loading ? (
            <Transcribing />
          ) : isAudioAvailable ? (
            <FileDisplay
              file={file}
              audioStream={audioStream}
              handleAudioReset={handleAudioReset}
            />
          ) : (
            <Homepage setFile={setFile} setAudioStream={setAudioStream} />
          )}
        </section>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
