import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [numberAllow, setNumberAllow] = useState(false);
  const [specialCase, setSpecialCase] = useState(false);
  const [passLength, setpasslength] = useState(8);
  const [password, setPassword] = useState("");

  const generatePassowrd = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) {
      str += "1234567890";
    }
    if (specialCase) {
      str += "!@#$%^&*(){}><";
    }

    for (let i = 1; i <= passLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numberAllow, specialCase, passLength, setPassword]);

  //useRef 
  const passwordRef = useRef(null);

  const copyFromClipBoard = useCallback(()=>{
    passwordRef.current?.select();
      window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    generatePassowrd();
  }, [numberAllow, specialCase, generatePassowrd, passLength]);

  return (
    <>
      <div className="w-full max-w-lg rounded-lg mx-auto shadow-2x bg-gray-800 px-4 my-8">
        <h1 className="text-white text-center font-bold text-lg py-3">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden py-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyFromClipBoard}
          className=" bg-blue-800 font-semibold text-white px-5 rounded-sm  py-2">
            copy
          </button>
        </div>
        <div className="flex text-sm px-2 py-6">
          <div className="flex items-center text-orange-600 font-semibold">
            <input type="range" 
            min={8} 
            max={50} 
            value={passLength}
            className="cursor-pointer"
            onChange={(e)=>{setpasslength(e.target.value)}}
            /><label className="mr-5 ml-2"> Length: {passLength}</label>
          </div>
          <div className="flex items-center text-orange-600 font-semibold">
          <input type="checkbox"
             defaultChecked={numberAllow}
             onChange={()=>{setNumberAllow((prev) => !prev)}}

            className="rounded-lg" />
            <label className="mr-5 ml-2">: Numbers</label>
          </div>

          <div className="flex items-center text-orange-600 font-semibold">
          <input type="checkbox" 
            defaultChecked={specialCase}
            onChange={()=> {setSpecialCase((prev)=>!prev)}} />
            <label className="mr-5 ml-2">: Special Case </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
