import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  reload,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, googleProvider, imageDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

export const signInWithGoogleAuth = async () => {
  await setPersistence(auth, browserSessionPersistence);
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

export const signInEmailAndPassAPI = async (email, password) => {
  await setPersistence(auth, browserSessionPersistence);
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res;
};

export const createAccountByEmailAndPassAPI = async (email, password) => {
  const userInfo = await createUserWithEmailAndPassword(auth, email, password);
  const user = userInfo.user;
  await setDoc(doc(db, "Roles", user.uid), { role: "user" });
  return user;
};

export const updateProfileUserAPI = async ({ name, photo }) => {
  if (!auth.currentUser) return Promise.reject("No user logged in");

  let photoURL = auth.currentUser.photoURL;

  if (photo) {
    const storageRef = ref(imageDB, `avatars/${auth.currentUser.uid}`);
    await uploadBytes(storageRef, photo);
    photoURL = await getDownloadURL(storageRef);
  }

  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photoURL,
  });

  await reload(auth.currentUser);

  return {
    id: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    photo: auth.currentUser.photoURL,
  };
};
