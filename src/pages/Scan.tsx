import { useEffect, useRef, useState } from "react";
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
import { Spinner } from "react-bootstrap";
import CheckinModal from "../components/CheckinModal";

const ScanPage = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("test");
  const stateRef = useRef("");
  stateRef.current = uid;
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [ispauseScan, setIsPauseScan] = useState(false);
  const onNewScanResult = async (decodedText: string) => {
    setIsShowModal(false);
    setIsLoading(true);
    setIsPauseScan(true);
    const audience = await findAudience(decodedText).catch(() => {
      return null;
    });
    if (audience?.exists()) {
      checkin(audience).then(() => {
        setModalMessage("Checkin Success!!");
        setIsLoading(false);
        setIsShowModal(true);
      });
    } else {
      setModalMessage("Not Found");
      setIsShowModal(true);
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUid(user.uid);
      } else {
        handleLogout();
      }
    });
    return () => {
      listener();
    };
  }, []);

  const findAudience = async (
    id: string
  ): Promise<DocumentSnapshot<DocumentData>> => {
    const audienceRef = doc(db, "audience", id);
    return await getDoc(audienceRef);
  };

  const checkin = (doc: DocumentSnapshot<DocumentData>) => {
    return updateDoc(doc.ref, { checkin: true, staffId: uid });
  };

  const modalCalback = () => {
    setIsPauseScan(false);
    setIsShowModal(false);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CheckinModal
          show={isShowModal}
          callback={modalCalback}
          message={modalMessage}
        />
      )}
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        pause={ispauseScan}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </>
  );
};

export default ScanPage;
