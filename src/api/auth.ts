import { auth, db } from './config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';

import { getDoc, doc, setDoc } from 'firebase/firestore';

async function createdDoc(uid: string) {
  const querySnapshot = await getDoc(doc(db, 'todos', uid));
  if (!querySnapshot.data()) {
    await setDoc(doc(db, 'todos', uid), {
      data: [],
    });
  }
}

interface SigninType {
  token: string;
  user: { email: string; uid: string };
}

export function signin(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user as any;
      const token = user.accessToken;
      await createdDoc(user.uid);
      return { token, user: { email: user.email, uid: user.uid } };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function signup(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user as any;
      const token = user.accessToken;
      return { token, user: { email: user.email, uid: user.uid } };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export function googlesignin() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      await createdDoc(user.uid);

      return { token, user: { email: user.email, uid: user.uid } };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
