function Homepage() {
  return (
    <main className="flex-1  text-center p-4 flex flex-col justify-center gap-3 sm:gap-4 md:gap-5">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        transla<span className="text-blue-400 bold">scribe</span>
      </h1>
      <h3 className="font-medium">
        Record
        <span className="text-blue-400">
          &rarr; Transcribe <span className="text-blue-400">&rarr;</span>
          <span className="text-blue-400">&rarr;Translate</span>
        </span>
      </h3>
    </main>
  );
}

export default Homepage;
