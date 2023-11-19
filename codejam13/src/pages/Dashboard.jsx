import React, { useState, useEffect } from "react";
import { myExams } from "../utils/functions";
import { getAllExams } from "../utils/firestoreFunctions";

export default function Dashboard() {
  const [allExams, setAllExams] = useState([]);

  useEffect(() => {
    getAllExams().then((res) => {
      setAllExams(res);
    });
  }, []);

  useEffect(() => {
    console.log(allExams);
  }, [allExams]);

  return (
    <div className="text-3xl">
      Dashboard
      <button onClick={myExams(allExams)}>See all exams</button>
    </div>
  );
}
