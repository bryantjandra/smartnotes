import React, { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription.jsx";
import Translation from "./Translation.jsx";

function Information(props) {
  const { output } = props;
  console.log(output);
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");
  const [translating, setTranslating] = useState(null);

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          console.log("LOADING");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text).join(" ")
      : translation || "";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `translascribe_${new Date().toDateString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLanguage === "Select language") {
      return;
    }

    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text).join(" "),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  return (
    <main className="flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4 pb-20 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-center text-5xl sm:text-6xl md:text-7xl whitespace-nowrap text-white">
        Your{" "}
        <span className="text-indigo-400 font-bold">
          {tab === "transcription" ? "Transcription" : "Translation"}
        </span>
      </h1>
      <div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
        <button
          onClick={() => {
            setTab("transcription");
          }}
          className={
            "px-4 py-2 duration-200 " +
            (tab === "transcription"
              ? "bg-indigo-500 text-white"
              : "text-indigo-400 hover:text-indigo-500 hover:bg-indigo-200 ")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => {
            setTab("translation");
          }}
          className={
            "px-4 py-2 duration-200 " +
            (tab === "translation"
              ? "bg-indigo-500 text-white"
              : "text-indigo-400 hover:text-indigo-500 hover:bg-indigo-100")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            textElement={textElement}
            toLanguage={toLanguage}
            translating={translating}
            setTranslation={setTranslation}
            setTranslating={setTranslating}
            setToLanguage={setToLanguage}
            generateTranslation={generateTranslation}
          />
        )}
      </div>
      <p className="text-slate-400 italic text-center">
        {tab === "transcription"
          ? ""
          : "Seamlessly translate your notes into any language."}
      </p>
      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          onClick={handleCopy}
          title="Copy"
          className="bg-white specialBtn text-blue-300 px-2 aspect-square grid place-items-center rounded hover:text-blue-500 duration-200"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="bg-white specialBtn text-blue-300 px-2 aspect-square grid place-items-center rounded hover:text-blue-500 duration-200"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}

export default Information;
