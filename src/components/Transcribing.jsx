function Transcribing(props) {
  const { downloading } = props;
  return (
    <div className="flex  flex-1 items-center flex-col justify-center gap-10 md:gap-14 pb-24 p-4 text-center">
      <div className="flex flex-col gap-2 sm:gap-4">
        <h1 className="font-semibold text-center text-5xl sm:text-6xl md:text-7xl">
          <span className="text-indigo-400 font-bold">Transcribing</span>
        </h1>
        <p className="text-white">
          {!downloading
            ? "engaging intelligent transcribers"
            : "priming neural networks"}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:gap-4 max-w-[400px] mx-auto w-full">
        {[0, 1, 2].map((val) => {
          return (
            <div
              key={val}
              className={
                "rounded-full h-2 sm:h-3 bg-slate-400 loading " +
                `loading${val}`
              }
            >
              {" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transcribing;
