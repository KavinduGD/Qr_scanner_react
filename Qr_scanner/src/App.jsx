import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setResult(result);
    }
    function error(err) {
      console.log(err);
    }
  }, []);
  const config = {
    headers: { Authorization: "Bearer 46acc2d0-78f2-11ee-bc93-85031cf98e54" },
  };

  const bodyParameters = {
    colorDark: "#000",
    qrCategory: "url",
    text: text,
    logo: "https://res.cloudinary.com/dnoobzfxo/image/upload/v1698871538/1024px-Bus-logo.svg_uwvqh1.png",
  };

  const getQrCode = async () => {
    try {
      const res = await axios.post(
        "https://qrtiger.com/api/qr/static",
        bodyParameters,
        config
      );
      setResponse(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="app">
      <div className="pt-6 pb-4 text-center font-mono text-4xl font-bold bg-blue-600 text-white ">
        Qr code Scanner and Generator with react JS
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center  justify-between">
        <div className="generate  w-full flex flex-col gap-5 items-center justify-center pt-5">
          <p className="text-xl font-semibold">Input the text here</p>
          <input
            type="text"
            className="px-4 py-2 border-2 w-[250px]"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="w-[200px]">
            <img
              src={
                response
                  ? response
                  : "https://cdn3.vectorstock.com/i/1000x1000/58/87/loading-icon-load-white-background-vector-27845887.jpg"
              }
              alt=""
              className=""
            />
          </div>
          <button
            className="px-5 py-2 bg-blue-600 text-white text-xl"
            onClick={getQrCode}
          >
            Generate QR
          </button>
        </div>
        <div className="scanner w-full flex flex-col gap-5 justify-center items-center">
          <p className="text-xl font-semibold">Scan form here</p>
          <div className="w-[350px] h-[350px] ">
            <div id="reader"></div>
          </div>
          <p>{result == "" ? "Nothing detected yet" : `result - ${result}`}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
