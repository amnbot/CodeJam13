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
  const examRef = collection(db, "exams");
  const q = query(examRef, where("id", "==", id));
  const doc = await getDoc(q);

  await updateDoc(doc, { name: newName });
};

export const addExamQuestions = async (id, newQ) => {
  const examRef = collection(db, "exams");
  const q = query(examRef, where("id", "==", id));
  const doc = await getDoc(q);

  await updateDoc(doc, { questions: arrayUnion(newQ) });
};

export const removeExamQuestions = async (id, oldQ) => {
  const examRef = collection(db, "exams");
  const q = query(examRef, where("id", "==", id));
  const doc = await getDoc(q);

  await updateDoc(doc, { questions: arrayRemove(oldQ) });
};

export const createUser = async (user) => {
  const userRef = await addDoc(collection(db, "users"), user);
  return userRef.id;
};

export const getUser = async (id) => {
  const examRef = collection(db, "users");
  const q = query(examRef, where("id", "==", id));
  const doc = await getDoc(q);

  return doc.data();
};

const addSummary = async (summary) => {
  const summaryRef = await addDoc(collection(db, "summaries"), summary);
  return summaryRef.id;
};

const getSummary = async (id) => {
  const summaryRef = collection(db, "summaries");
  const q = query(summaryRef, where("id", "==", id));
  const doc = await getDoc(q);

  return doc.data();
};
