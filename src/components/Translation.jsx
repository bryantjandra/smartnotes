import { LANGUAGES } from "../utils/presets.js";

function Translation(props) {
  const {
    textElement,
    toLanguage,
    translating,
    setTranslation,
    setTranslating,
    setToLanguage,
    generateTranslation,
  } = props;

  return (
    <div className="flex flex-col gap-2 max-w-[800px] w-full mx-auto">
      {!translating && (
        <div className="flex flex-col gap-1">
          <div className="flex items-stretch gap-2">
            <select
              value={toLanguage}
              className="flex-1 outline-none bg-stone-900 focus:outline-none text-white border-solid border-transparent hover:border-blue-300 duration-200 p-2 rounded opacity-50"
              onChange={(e) => {
                setToLanguage(e.target.value);
              }}
            >
              <option value="Select language">Select language</option>
              {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <option value={value} key={key}>
                    {key}
                  </option>
                );
              })}
            </select>
            <button
              onClick={generateTranslation}
              className="specialBtn px-3 py-2 rounded-lg text-indigo-400  duration:200"
            >
              Translate
            </button>
          </div>
        </div>
      )}

      {textElement && !translating && (
        <p className="text-white text-lg mx-auto mt-5">{textElement}</p>
      )}

      {translating && (
        <div className="grid place-items-center text-white">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
    </div>
  );
}

export default Translation;
