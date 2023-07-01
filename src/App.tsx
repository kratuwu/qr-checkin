import { useState } from "react";
import "./App.css";
import { Html5QrcodeResult } from "html5-qrcode";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

function App() {
  const [found, setFound] = useState("nothing");
  const onNewScanResult = (decodedText: string, result: Html5QrcodeResult) => {
    setFound(decodedText);
    // handle decoded results here
  };

  return (
    <>
      <h1>found {found}</h1>
      <div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      </div>
    </>
  );
}

export default App;
