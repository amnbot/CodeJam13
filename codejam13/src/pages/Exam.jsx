import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getExam } from "../utils/firestoreFunctions";
import QuestionCard from "../components/Question";

export default function Exam() {
  let { id } = useParams();

  const [exam, setExam] = useState(null);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getExam(id)
      .then((res) => setExam(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (exam) {
      setAnswers(Array(exam.multipleChoice.length).fill(0));
      const newOptions = exam.multipleChoice.map((question) => {
        const { choices, answer } = question;
        return [...choices, answer];
      });
      setOptions(newOptions);
    }
  }, [exam]);

  const handleSubmit = () => {
    console.log(answers);
  }

  console.log(exam);
  if (exam && options.length > 0) {
    return (
      <div className="mx-64">
        <h1 className="m-4">{exam.name}</h1>
        <div className="grid grid-cols-5 text-left">
          <div className="col-span-1">
            <div className="grid grid-cols-3 gap-y-4 text-left">
              {exam.multipleChoice.map((question, index) => (
                <div key={index}>
                  <button onClick={() => setCurrQuestionIndex(index)}>
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4">
            <QuestionCard
              questionData={exam.multipleChoice[currQuestionIndex]}
              options={options[currQuestionIndex]}
              setAnswers={setAnswers}
              answers={answers}
              questionIndex={currQuestionIndex}
            />
          </div>
        </div>
        <div className="m-5">
          <button onClick={handleSubmit} className="bg-gray-700">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
