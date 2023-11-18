import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addExamResult, getExam } from "../utils/firestoreFunctions";
import QuestionCard from "../components/Question";
import CardSingle from "./CardSingle";
import {useNavigate} from 'react-router-dom';

export default function Exam() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [exam, setExam] = useState(null);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [options, setOptions] = useState([]);
  const [grade, setGrade] = useState(-1);

  useEffect(() => {
    getExam(id)
      .then((res) => setExam(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (exam) {
      setAnswers(Array(exam.multipleChoice.length).fill(-1));
      const newOptions = exam.multipleChoice.map((question) => {
        const { choices, answer } = question;
        return [...choices, answer];
      });
      setOptions(newOptions);
      console.log('results: ', exam.results)
    }
  }, [exam]);

  const handleSubmit = async () => {
    console.log(answers);
    const grade = computeGrade();
    setGrade(grade);
    addExamResult(id, grade);
  };

  const computeGrade = () => {
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
      if (options[i][answers[i]] === exam.multipleChoice[i].answer) {
        correct++;
      }
    }
    return (100 * correct) / answers.length;
  };

  const examUI = () => {
    return (
      <div>
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
          <button
            disabled={answers.includes(-1)}
            onClick={handleSubmit}
            className="bg-gray-700"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  const resultUI = () => {
    return (
      <div>
        <h2 className="text-3xl">Grade: {grade}%</h2>
        <CardSingle alwaysShow={true} grades={exam.results} title={"Your grades"} />
        <button onClick={() => {
          navigate(`/exam/${id}`)
          }}>Retry</button>
      </div>
    )
  }

  console.log(exam);
  if (exam && options.length > 0) {
    return (
      <div className="mx-64">
        <h1 className="m-4">{exam.name}</h1>
        {grade === -1 ? examUI() : resultUI()}
      </div>
    );
  }
}
