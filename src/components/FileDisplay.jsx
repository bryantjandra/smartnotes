function FileDisplay(props) {
  const { handleAudioReset, file, audioStream } = props;

  return (
    <main className="flex-1 p-4 flex flex-col justify-center gap-3 sm:gap-4  pb-20 w-72 max-w-full sm:w-96 mx-auto ">
      <h1 className="font-semibold text-center text-5xl sm:text-6xl md:text-7xl">
        Your<span className="text-blue-400 font-bold">File</span>
      </h1>
      <div className="flex flex-col text-left mb-4 my-4">
        <h3 className="font-semibold">Name:</h3>
        <p>{file ? file?.name : "Custom Audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            handleAudioReset();
          }}
          className="text-slate-400 hover:text-blue-600 duration-200"
        >
          Reset
        </button>
        <button className="flex items-center gap-2 font-medium specialBtn px-3 py-2 rounded-lg text-blue-400">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}

export default FileDisplay;
