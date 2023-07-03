import { useEffect, useState } from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin";
import { db, auth } from "../firebaseInit";
import {
  DocumentData,
  DocumentSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const onNewScanResult = async (decodedText: string) => {
    const audience = await findAudience(decodedText);
    if (audience.exists()) {
      checkin(audience);
    }
    // handle decoded results here
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
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
        setUid(uid);
      } else {
        handleLogout();
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  const findAudience = async (
    id: string
  ): Promise<DocumentSnapshot<DocumentData>> => {
    const audienceRef = doc(db, "audience", id);
    return await getDoc(audienceRef);
  };

  const checkin = async (doc: DocumentSnapshot<DocumentData>) => {
    updateDoc(doc.ref, { checkin: true, staffId: uid });
  };
  return (
    <div>
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
