// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDytk5oRctMVcY9s7zlxsw6kXYDpP9ocaQ',
  authDomain: 'rbm-to-do-management.firebaseapp.com',
  projectId: 'rbm-to-do-management',
  storageBucket: 'rbm-to-do-management.appspot.com',
  messagingSenderId: '827669209015',
  appId: '1:827669209015:web:19600efc0cd35626ee5232',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
