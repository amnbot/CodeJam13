import React, { useState } from 'react';

const CreateExam = () => {
  const [input, setInput] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [trueOrFalseQuestions, setTrueOrFalseQuestions] = useState(0);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState(0);
  const [numericalQuestions, setNumericalQuestions] = useState(0);
  const [fillInTheBlankQuestions, setFillInTheBlankQuestions] = useState(0);

const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = {
        input,
        numberOfQuestions,
        trueOrFalseQuestions,
        multipleChoiceQuestions,
        numericalQuestions,
        fillInTheBlankQuestions
    };

    fetch('http://127.0.0.1:3000/create-exam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data)
        })
        .catch(error => {
            // Handle the error
            console.log(error)
        });
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={2000}
          />
        </label>
        <br />
        <label>
          Number of questions:
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
            min={5}
            max={20}
          />
        </label>
        <br />
        <label>
          True or False:
          <input
            type="number"
            value={trueOrFalseQuestions}
            onChange={(e) => setTrueOrFalseQuestions(e.target.value)}
          />
        </label>
        <br />
        <label>
          Multiple Choice:
          <input
            type="number"
            value={multipleChoiceQuestions}
            onChange={(e) => setMultipleChoiceQuestions(e.target.value)}
          />
        </label>
        <br />
        <label>
          Numerical:
          <input
            type="number"
            value={numericalQuestions}
            onChange={(e) => setNumericalQuestions(e.target.value)}
          />
        </label>
        <br />
        <label>
          Fill in the blank:
          <input
            type="number"
            value={fillInTheBlankQuestions}
            onChange={(e) => setFillInTheBlankQuestions(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateExam;
