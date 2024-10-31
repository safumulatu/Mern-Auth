import { app } from "../firebase";
import google from "../image/10002.png";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(result);
    } catch (error) {
      console.log("could not log in with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-blue-900 text-white uppercase rounded-lg p-2 hover:bg-blue-800 w-70  flex gap-1 items-center justify-center mx-auto"
    >
      <span className="w-10">
        <img src={google} alt="google icon" />
      </span>
      continue with google
    </button>
  );
};
export default OAuth;
