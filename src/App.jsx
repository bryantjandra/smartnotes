import { useState, useEffect } from "react";
import FileDisplay from "./components/FileDisplay";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
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
