import React, { useEffect, useState } from "react";

const QuestionCardTF = ({
  questionData,
  setAnswers,
  questionIndex,
  answers
}) => {
  const { answer, question } = questionData;

  // Shuffle the choices array
  //   const shuffledChoices = choices.sort(() => Math.random() - 0.5);

  return (
    <div className="bg-gray-900 focus:border-blue-500 p-4 rounded-3xl">
      <div className="justify-between m-auto my-4">
        <h3 className="font-bold justify-start">
          Question {questionIndex + 1}
        </h3>
        <h3 className="italic justify-end">{question}</h3>
      </div>
      <div className="text-left">
        <label htmlFor={`choice-${questionIndex}`}>True</label>
        <input type="radio" />
        <label htmlFor={`choice-${questionIndex}`}>False</label>
        <input type="radio" />
      </div>
    </div>
  );
};

export default QuestionCardTF;
