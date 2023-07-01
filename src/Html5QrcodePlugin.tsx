// file = Html5QrcodePlugin.jsx
import {
  QrcodeSuccessCallback,
  QrcodeErrorCallback,
  Html5QrcodeScanner,
} from "html5-qrcode";
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
} from "html5-qrcode/esm/html5-qrcode";
import { useEffect, useRef } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

type Props = {
  fps: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
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
//   const previewRef = useRef<HTMLDivElement>(null);
//   const memoizedResultHandler = useRef(props.qrCodeSuccessCallback);
//   const memoizedErrorHandler = useRef(props.qrCodeErrorCallback);

//   useEffect(() => {
//     memoizedResultHandler.current = props.qrCodeSuccessCallback;
//   }, [props.qrCodeSuccessCallback]);

//   useEffect(() => {
//     memoizedErrorHandler.current = props.qrCodeErrorCallback;
//   }, [props.qrCodeErrorCallback]);
  useEffect(() => {
    // if (!previewRef.current) return;
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
//     const html5QrcodeScanner = new Html5Qrcode(previewRef.current.id);
//     const didStart = html5QrcodeScanner
//       .start(
//         { facingMode: "environment" },
//         config,
//         memoizedResultHandler.current,
//         memoizedErrorHandler.current
//       )
//       .then(() => true);
//     return () => {
//       didStart
//         .then(() => html5QrcodeScanner.stop())
//         .catch(() => {
//           console.log("Error stopping scanner");
//         });
//     };
//   }, [previewRef, memoizedResultHandler, memoizedErrorHandler]);
  },[]);

  return <div id={qrcodeRegionId}/>;
};

export default Html5QrcodePlugin;
