function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4 absolute top-0 left-10 right-10">
      <a href="/">
        <h1 className="font-semibold text-white underline-effect-header">
          smart
          <span className="text-indigo-400 font-bold">
            notes<span className="font-semibold text-white">.ai</span>
          </span>
        </h1>
      </a>
      <a href="/">
        <button className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-white text-sm">
          <p className="text-white">New</p>
          <i className="fa-solid fa-plus"></i>
        </button>
      </a>
    </header>
  );
}

export default Header;
