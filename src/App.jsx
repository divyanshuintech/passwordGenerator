import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()-_=+|{}[];',.<>/?";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-5 py-4 my-8 bg-gray-800">
      <h1 className="text-white text-center my-3 text-2xl font-semibold">
        Password Generator
      </h1>
      <div className="flex shadow h-12 rounded-lg overflow-hidden my-8">
        <input
          className="outline-none w-full py-1 px-3"
          type="text"
          value={password}
          readOnly
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none w-20 font-medium bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm mb-2 gap-x-6 text-white">
        <div className="flex items-center gap-x-3">
          <input
            type="range"
            className="cursor-pointer"
            value={length}
            min={6}
            max={30}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="select-none">Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="select-none">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            id="charInput"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput" className="select-none">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
