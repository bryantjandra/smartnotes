function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4 absolute top-0 left-10 right-10">
      <a href="/">
        <h1 className="font-bold text-white">
          transla<span className="text-indigo-400 font-bold">scribe.ai</span>
        </h1>
      </a>
      <a href="/">
        <button className="flex items-center gap-2 specialBtn px-3 py-2 rounded-lg text-indigo-400 text-sm">
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </button>
      </a>
    </header>
  );
}

export default Header;
