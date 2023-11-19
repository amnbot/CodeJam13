import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addExamResult, getExam } from "../utils/firestoreFunctions";
import QuestionCardMCQ from "../components/QuestionCardMCQ";
import CardSingle from "./CardSingle";
import { useNavigate } from "react-router-dom";
import { ArrowRightRounded, ArrowLeftRounded } from "@mui/icons-material";
import { getGradeEmoji } from "../utils/utils";
import QuestionCardTF from "../components/QuestionCardTF";

export default function Exam() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [exam, setExam] = useState(null);
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [options, setOptions] = useState([]);
  const [grade, setGrade] = useState(-1);

  const [showResult, setShowResult] = useState(false);

  const [questions, setQuestions] = useState([]);

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
      // setAnswers(Array(exam.multipleChoice.length).fill(-1));
      // const newOptions = exam.multipleChoice.map((question) => {
      //   const { choices, answer } = question;
      //   return [...choices, answer];
      // });
      // setOptions(newOptions);

      const newQuestions = [];

      if (exam.multipleChoice) {
        for (let i = 0; i < exam.multipleChoice.length; i++) {
          newQuestions.push({ ...exam.multipleChoice[i], type: "mcq" });
        }
      }
      if (exam.trueOrFalse) {
        for (let i = 0; i < exam.trueOrFalse.length; i++) {
          newQuestions.push({
            ...exam.trueOrFalse[i],
            choices: [
              exam.trueOrFalse[i].answer.toLowerCase() === "true"
                ? "False"
                : "True",
            ],
            type: "tf",
          });
        }
      }

      setQuestions(newQuestions);
    }
  }, [exam]);

  useEffect(() => {
    if (questions.length > 0) {
      console.log(questions);
      setAnswers(Array(questions.length).fill(-1));
      const newOptions = questions.map((question) => {
        const { choices, answer } = question;
        return [...choices, answer];
      });
      setOptions(newOptions);
    }
  }, [questions]);

  const handleSubmit = async () => {
    console.log(answers);
    const grade = computeGrade();
    setGrade(grade);
    console.log("adding exam");
    const res = await addExamResult(id, grade);
    // setExam({
    //   ...exam,
    //   results: [...exam.results, res],
    // });
  };

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  useEffect(() => {
    if (grade !== -1) {
      setShowResult(true);
    }
  }, [grade]);

  const computeGrade = () => {
    let correct = 0;
    for (let i = 0; i < answers.length; i++) {
      if (options[i][answers[i]] === questions[i].answer) {
        correct++;
      }
    }
    return (100 * correct) / answers.length;
  };

  const examUI = () => {
    return (
      <div>
        <div className="grid grid-cols-5 text-left gap-x-4">
          <div className="col-span-1">
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
              {questions.map((question, index) => (
                <button
                  className={`${
                    currQuestionIndex === index
                      ? "bg-gray-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  } ${
                    answers[index] < 0
                      ? "outline outline-1 outline-red-400"
                      : "outline-none"
                  } p-3 rounded-xl`}
                  onClick={() => setCurrQuestionIndex(index)}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="flex justify-around my-16">
              <button
                className="bg-gray-900"
                disabled={currQuestionIndex === 0}
                onClick={() => setCurrQuestionIndex(currQuestionIndex - 1)}
              >
                <ArrowLeftRounded />
              </button>
              <button
                className="bg-gray-900"
                disabled={currQuestionIndex === questions.length - 1}
                onClick={() => setCurrQuestionIndex(currQuestionIndex + 1)}
              >
                <ArrowRightRounded />
              </button>
            </div>
          </div>
          <div className="col-span-4">
            <QuestionCardMCQ
              questionData={questions[currQuestionIndex]}
              options={options[currQuestionIndex]}
              setAnswers={setAnswers}
              answers={answers}
              questionIndex={currQuestionIndex}
            />
            {/* {currQuestionIndex < exam.multipleChoice.length ? (
              <QuestionCardMCQ
                questionData={exam.multipleChoice[currQuestionIndex]}
                options={options[currQuestionIndex]}
                setAnswers={setAnswers}
                answers={answers}
                questionIndex={currQuestionIndex}
              />
            ) : (
              <QuestionCardTF
                answers={answers}
                setAnswers={setAnswers}
                questionIndex={currQuestionIndex}
                questionData={exam.trueOrFalse[currQuestionIndex]}
              />
            )} */}
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
        <h2 className="text-3xl my-4">
          Grade: {grade}% {getGradeEmoji(grade)}
        </h2>
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
