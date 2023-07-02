import { useEffect, useState } from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";
import { db, auth } from "../firebaseInit";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Html5QrcodeResult } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const [found, setFound] = useState("nothing");
  const navigate = useNavigate();
  const onNewScanResult = (decodedText: string, result: Html5QrcodeResult) => {
    setFound(decodedText);
    console.log(result)
    // handle decoded results here
  };
  useEffect(() => {
    findAudience("ZzD8nQqQJtuZqYCc3dKF");
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error)
        // An error happened.
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        handleLogout();
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);
  const findAudience = async (id: string) => {
    const audienceRef = doc(db, "audience", id);
    const docSnap = await getDoc(audienceRef);
    console.log(docSnap.data());
  };
  return (
    <div>
      <h1>found {found}</h1>
      <div>
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={onNewScanResult}
        />
      </div>
    </div>
  );
};

export default ScanPage;
