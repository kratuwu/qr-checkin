import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseInit";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const handleGoogle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        navigate("/");
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <>
      <main>
        <h1> QR Checkin </h1>
        <div className="g_body">
          <button type="button" className="login-with-google-btn" onClick={handleGoogle}>
            Sign in with Google
          </button>
        </div>
      </main>
    </>
  );
};

export default Login;
