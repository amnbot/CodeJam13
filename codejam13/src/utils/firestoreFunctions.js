import {db} from "../firestoreConfigSetter.js";
import { collection, addDoc, getDoc, updateDoc, query, where, arrayUnion, arrayRemove} from "firebase/firestore";

const addExam = async (exam) =>{
    const examRef = await addDoc(collection(db, "exams"), exam);
    return examRef.id;

}

const getExam = async (id) =>{
  const examRef = collection(db, "exams");
  const q = query(examRef, where("id", "==", id));
  const doc = await getDoc(q);

  return doc.data();
}

const updateExamName = async(id, newName) => {
    const examRef = collection(db, "exams");
    const q = query(examRef, where("id", "==", id));
    const doc = await getDoc(q);

    await updateDoc(doc, {name : newName });
}

const addExamQuestions = async(id, newQ) => {
    const examRef = collection(db, "exams");
    const q = query(examRef, where("id", "==", id));
    const doc = await getDoc(q);

    await updateDoc(doc, {questions: arrayUnion(newQ)});
}

const removeExamQuestions = async(id, oldQ) =>{
    const examRef = collection(db, "exams");
    const q = query(examRef, where("id", "==", id));
    const doc = await getDoc(q);

    await updateDoc(doc, {questions: arrayRemove(oldQ)});
}

const createUser = async(user) =>{
    const userRef = await addDoc(collection(db, "users"), user);
    return userRef.id;
}

const getUser = async (id) =>{
    const examRef = collection(db, "users");
    const q = query(examRef, where("id", "==", id));
    const doc = await getDoc(q);
  
    return doc.data();
  }