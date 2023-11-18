import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getExam } from "../utils/firestoreFunctions";
import QuestionCard from "../components/Question";

export default function Exam() {
  let { id } = useParams();

  const [exam, setExam] = useState(null);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  useEffect(() => {
    getExam(id)
      .then((res) => setExam(res))
      .catch((err) => console.log(err));
  }, []);
  console.log(exam);
  if (exam) {
    return (
      <div>
        <h1 className="m-4">{exam.name}</h1>
        <div className="grid grid-cols-3 text-left">
          <div className="col-span-1">
            <div className="grid grid-cols-2 text-left">
              {exam.multipleChoice.map((question, index) => (
                <div key={index}>
                  <button onClick={() => setCurrQuestionIndex(index)}>
                    {index + 1}
                  </button>
                  </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <QuestionCard
              questionData={exam.multipleChoice[currQuestionIndex]}
            />
          </div>
        </div>
      </div>
    );
  }
}
