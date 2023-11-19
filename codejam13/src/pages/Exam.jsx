import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addExamResult, getExam } from "../utils/firestoreFunctions";
import QuestionCard from "../components/Question";
import CardSingle from "./CardSingle";
import { useNavigate } from "react-router-dom";
import { ArrowRightRounded, ArrowLeftRounded } from "@mui/icons-material";
import { getGradeEmoji } from "../utils/utils";

export default function Exam() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [exam, setExam] = useState(null);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [options, setOptions] = useState([]);
  const [grade, setGrade] = useState(-1);

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      getExam(id)
        .then((res) => {
          setExam(res);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  useEffect(() => {
    if (exam) {
      setAnswers(Array(exam.multipleChoice.length).fill(-1));
      const newOptions = exam.multipleChoice.map((question) => {
        const { choices, answer } = question;
        return [...choices, answer];
      });
      setOptions(newOptions);
    }
  }, [exam]);

  const handleSubmit = async () => {
    console.log(answers);
    const grade = computeGrade();
    setGrade(grade);
    console.log('adding exam')
    const res = await addExamResult(id, grade);
    // setExam({
    //   ...exam,
    //   results: [...exam.results, res],
    // });
  };

  useEffect(() => {
    if (grade !== -1) {
      setShowResult(true);
    }
  }, [grade]);

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
            <div className="text-left">
              {exam.multipleChoice.map((question, index) => (
                <div key={index}>
                  <button onClick={() => setCurrQuestionIndex(index)}>
                    {index + 1}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-around my-16">
              <button
                disabled={currQuestionIndex === 0}
                onClick={() => setCurrQuestionIndex(currQuestionIndex - 1)}
              >
                <ArrowLeftRounded />
              </button>
              <button
                disabled={currQuestionIndex === exam.multipleChoice.length - 1}
                onClick={() => setCurrQuestionIndex(currQuestionIndex + 1)}
              >
                <ArrowRightRounded />
              </button>
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
            <div className="m-5 space-x-5 justify-evenly flex">
              <button
                className="bg-gray-800"
                onClick={() => navigate("/my-exams")}
              >
                Quit
              </button>
              <button
                disabled={answers.includes(-1)}
                onClick={handleSubmit}
                className="bg-gray-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const resultUI = () => {
    return (
      <div className="m-4">
        <h2 className="text-3xl my-4">Grade: {grade}% {getGradeEmoji(grade)}</h2>
        <CardSingle
          alwaysShow={true}
          grades={exam.results}
          title={"Your grades"}
        />
        <div className="my-5 space-x-4">
          <button className="bg-gray-800" onClick={() => navigate("/my-exams")}>
            Quit
          </button>
          <button
            className="bg-gray-800"
            onClick={() => {
              navigate(0);
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  };

  if (exam && options.length > 0) {
    return (
      <div className="mx-64">
        <h1 className="m-4 font-bold ">{exam.name}</h1>
        {!showResult ? examUI() : resultUI()}
      </div>
    );
  }
}
