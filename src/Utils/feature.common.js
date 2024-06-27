import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async (auth, googleProvider, setMessage) => {
  try {
    await signInWithPopup(auth, googleProvider);
    setMessage("successful!");
  } catch (error) {
    console.error(error);
  }
};
