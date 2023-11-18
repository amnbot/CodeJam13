import { db } from "./firestoreConfigSetter.js";
import {
  collection,
  addDoc,
  getDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
  arrayRemove,
  doc,
  Timestamp,
} from "firebase/firestore";

export const addExam = async (exam) => {
  const examRef = await addDoc(collection(db, "exams"), exam);
  return examRef.id;
};

export const getExam = async (id) => {
  const docRef = doc(db, "exams", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const updateExamName = async (id, newName) => {
  const docRef = doc(db, "exams", id);

  await updateDoc(docRef, { name: newName });
};

export const addExamResult = async (id, grade) => {
  const docRef = doc(db, "exams", id);
  // const docSnap = await getDoc(docRef);
  const result = { grade, date: Timestamp.now().toDate().toLocaleDateString() };
  await updateDoc(docRef, { results: arrayUnion(result) });
};

export const addExamQuestions = async (id, newQ) => {
  const docRef = doc(db, "exams", id);

  await updateDoc(docRef, { questions: arrayUnion(newQ) });
};

export const removeExamQuestions = async (id, oldQ) => {
  const docRef = doc(db, "exams", id);
  

  await updateDoc(docRef, { questions: arrayRemove(oldQ) });
};

export const createUser = async (user) => {
  const userRef = await addDoc(collection(db, "users"), user);
  return userRef.id;
};

export const getUser = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const addSummary = async (summary) => {
  const summaryRef = await addDoc(collection(db, "summaries"), summary);
  return summaryRef.id;
};

const getSummary = async (id) => {
  const docRef = doc(db, "summaries", id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};
