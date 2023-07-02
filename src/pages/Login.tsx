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
        <section>
          <div>
            <p> FocusApp </p>

            <form>
              <a
                className="btn btn-block btn-social btn-google"
                onClick={handleGoogle}
              >
                <span className="fa fa-google"></span>
                Sign in with Google
              </a>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
