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
  getDocs,
  orderBy,
  limit,
  deleteDoc,
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

export const deleteExam = async(id) =>{
  const docRef = doc(db, "exams", id);
  
  await deleteDoc(docRef);
  return id;
}
export const getAllExams = async () => {
  const querySnapshot = await getDocs(collection(db, "exams"));
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });

  return docs;
};

export const updateExamName = async (id, newName) => {
  const docRef = doc(db, "exams", id);

  await updateDoc(docRef, { name: newName });
};

export const addExamResult = async (id, grade) => {
  const docRef = doc(db, "exams", id);
  // const docSnap = await getDoc(docRef);
  const date = Timestamp.now().toDate();
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timestamp = `${year}-${month}-${day}-${hours}-${minutes}`;
  const result = { grade, date: timestamp };
  await updateDoc(docRef, { results: arrayUnion(result) });
  return result;
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
  console.log("user", user);
  const userRef = await addDoc(collection(db, "users"), user);
  return userRef.id;
};

export const getUser = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log("No such document!");
    return null;
  }
  const data = docSnap.data();
  return data;
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

export const createGroup = async (group) => {
  console.log("group", group);
  const userRef = await addDoc(collection(db, "group"), group);
  // get user with group.owner as id and add group to user.groups
  const user = await getUser(group.owner);
  console.log("user", user);
  const newGroups = user?.groups ?? [];
  newGroups.push(userRef.id);
  await updateDoc(doc(db, "users", group.owner), { groups: newGroups });
  return userRef.id;
};

export const getGroup = async (id) => {
  const docRef = doc(db, "group", id);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const groupWithId = { id: docSnap.id, ...data };
      console.log("Document data:", groupWithId);
      return groupWithId;
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error getting group:", error);
    return null;
  }
};

export const addMember = async (id, memberId) => {
  const docRef = doc(db, "groups", id);
  const docSnap = await getDoc(docRef);
  const group = docSnap.data();
  const members = group?.members ?? [];
  members.push(memberId);
  await updateDoc(docRef, { members: members });
};

export const removeMember = async (id, memberId) => {
  const docRef = doc(db, "groups", id);
  const docSnap = await getDoc(docRef);
  const group = docSnap.data();
  const filteredMembers =
    group?.members.filter((member) => member.id !== memberId) ?? [];
  await updateDoc(docRef, { members: filteredMembers });
};

export const getnRecent = async (n) => {
  docs = [];
  const querySnapshot = await getDocs(collection(db, "exams"), limit(n));

  querySnapshot.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });

  return docs;
};

// given an email, return the user id
export const getUserIdByEmail = async (email) => {
  const usersCollection = collection(db, "users"); // Replace 'users' with your actual collection name

  const q = query(usersCollection, where("email", "==", email));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return null;
    }

    // Assuming you only expect one document to match the email
    const userId = querySnapshot.docs[0].id;
    return userId;
  } catch (error) {
    console.error("Error getting documents:", error);
    return null;
  }
};

export const getFirstNGroupsWithId = async (n) => {
  const collectionRef = collection(db, "groups");

  try {
    const querySnapshot = await getDocs(collectionRef.limit(n));

    const groups = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const groupWithId = { id: doc.id, ...data };
      groups.push(groupWithId);
    });
    return groups;
  } catch (error) {
    console.error("Error getting groups:", error);
    return [];
  }
};
