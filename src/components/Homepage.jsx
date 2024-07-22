function Homepage() {
  return (
    <main className="flex-1  text-center p-4 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5 pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        transla<span className="text-blue-400 bold">scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record {""}
        <span className="text-blue-400">
          &rarr; Transcribe <span className="text-blue-400">&rarr;</span>
          <span className="text-blue-400">Translate</span>
        </span>
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4">
        <p>Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base">
        Or {""}
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          upload <input className="hidden" type="file" accept=".mp3,.wave" />
        </label>
        a mp3 file
      </p>
      <p className="italic text-slate-500">Speak. Transcribe. Translate.</p>
    </main>
  );
}

export default Homepage;
