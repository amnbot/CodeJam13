import React, { useEffect, useState } from "react";

const QuestionCard = ({
  questionData,
  setAnswers,
  questionIndex,
  answers,
  options,
}) => {
  const { answer, choices, question } = questionData;

  // Shuffle the choices array
  //   const shuffledChoices = choices.sort(() => Math.random() - 0.5);

  return (
    <div className="bg-gray-700 focus:border-blue-500 p-4 rounded-3xl">
      <div className="justify-between m-auto my-4">
        <h3 className="font-bold justify-start">
          Question {questionIndex + 1}
        </h3>
        <h3 className="italic justify-end">{question}</h3>
      </div>
      <div className="text-left">
        {options.map((choice, choiceIndex) => (
          <div key={choiceIndex}>
            <input
              className="outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="radio"
              id={`choice-${choiceIndex}`}
              name="answer"
              value={answers[questionIndex]}
              onChange={(e) => {
                setAnswers((prevAnswer) => {
                  const newAnswers = [...prevAnswer];
                  newAnswers[questionIndex] = choiceIndex;
                  return newAnswers;
                });
              }}
            />
            <label htmlFor={`choice-${choiceIndex}`}>{choice}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
