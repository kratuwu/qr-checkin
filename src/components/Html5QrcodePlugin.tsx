// file = Html5QrcodePlugin.jsx
import { QrcodeErrorCallback, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeCameraScanConfig } from "html5-qrcode/esm/html5-qrcode";
import { useEffect, useState } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

type Props = {
  fps: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (text: string) => void;
  qrCodeErrorCallback?: QrcodeErrorCallback;
};
// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Props): Html5QrcodeCameraScanConfig => {
  const config: Html5QrcodeCameraScanConfig = {
    fps: undefined,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: Props) => {
  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5QrcodeScanner | null>(null);
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    setHtml5QrcodeScanner(
      new Html5QrcodeScanner(qrcodeRegionId, config, verbose)
    );
  }, []);

  const onSuccuccess = (decodedText: string): void => {
    console.log(decodedText)
    props.qrCodeSuccessCallback(decodedText);
    html5QrcodeScanner?.pause(isPause);
  };

  useEffect(() => {
    html5QrcodeScanner?.render(onSuccuccess, props.qrCodeErrorCallback);
    return () => {
      html5QrcodeScanner?.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [html5QrcodeScanner]);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
