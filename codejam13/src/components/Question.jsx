import React, { useState } from "react";

const QuestionCard = ({ questionData }) => {
  const { answer, choices, question } = questionData;

  const [answers, setAnswers] = useState([]);

  // Shuffle the choices array
  const shuffledChoices = choices.sort(() => Math.random() - 0.5);

  return (
    <div className="bg-gray-700 focus:border-blue-500 p-4 rounded-3xl">
      <h3>{question}</h3>
      <div className="text-left">
        {shuffledChoices.map((choice, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`choice-${index}`}
              name="answer"
              value={choice}
              onChange={(e) => {
                setAnswers([...answers, e.target.value]);
              }}
            />
            <label htmlFor={`choice-${index}`}>{choice}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
