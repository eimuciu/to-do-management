import { db } from './config';
import {
  getDoc,
  doc,
  setDoc,
  onSnapshot,
  arrayUnion,
  updateDoc,
} from 'firebase/firestore';
import type { TodoObj } from '../types/types';

export async function getData(uid: string) {
  try {
    const querySnapshot = await getDoc(doc(db, 'todos', uid));
    return querySnapshot.data();
  } catch (err) {
    console.log('getData error', err);
  }
}

export async function setData(
  uid: string,
  data: TodoObj,
  cb: (a: any) => void,
) {
  try {
    await updateDoc(doc(db, 'todos', uid), {
      data: arrayUnion(data),
    });
    onSnapshot(doc(db, 'todos', uid), (doc) => {
      cb(doc.data());
    });
  } catch (err) {
    console.log('setData error', err);
  }
}

export async function updateData(
  uid: string,
  data: TodoObj[],
  cb: (a: any) => void,
) {
  try {
    await setDoc(doc(db, 'todos', uid), {
      data,
    });
    onSnapshot(doc(db, 'todos', uid), (doc) => {
      cb(doc.data());
    });
  } catch (err) {
    console.log('setData error', err);
  }
}
