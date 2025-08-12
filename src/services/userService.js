import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.config";

export const signInWithGoogleAuth = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(res);
  const accessToken = credential.accessToken;
  const userId = res.user.uid;
  return {
    name: res.user.displayName,
    email: res.user.email,
    photo: res.user.photoURL,
    accessToken: accessToken,
    id: userId,
  };
};

export const getProfileUser = async () => {
  // const res = await
};
