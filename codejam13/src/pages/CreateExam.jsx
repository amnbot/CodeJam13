import React, { useState } from "react";
import { addExam } from "../utils/firestoreFunctions";

const CreateExam = () => {
  const [input, setInput] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [trueOrFalseQuestions, setTrueOrFalseQuestions] = useState(0);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState(0);
  const [numericalQuestions, setNumericalQuestions] = useState(0);
  const [fillInTheBlankQuestions, setFillInTheBlankQuestions] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      input,
      // numberOfQuestions,
      trueOrFalseQuestions,
      multipleChoiceQuestions,
      numericalQuestions,
      fillInTheBlankQuestions,
    };

    fetch("http://127.0.0.1:3000/create-exam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        addExam(data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        console.log(data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  return (
    <div className="space-x-4 space-y-4">
      <form onSubmit={handleSubmit} className="m-5 col">
        <div className="grid grid-cols-3 gap-y-4 gap-4">
          <div className="col-span-2">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Input
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your input here (lecture notes, lecture transcript, ...)"
            ></textarea>
          </div>
          <div className="flex-col my-4 space-y-4 text-left">
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of questions:
              </label>
              {/* <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
            min={5}
            max={20}
          /> */}
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                True or False:
              </label>
              <input
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={trueOrFalseQuestions}
                onChange={(e) => setTrueOrFalseQuestions(e.target.value)}
              />
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Multiple Choice:
              </label>
              <input
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={multipleChoiceQuestions}
                onChange={(e) => setMultipleChoiceQuestions(e.target.value)}
              />
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Numerical:
              </label>
              <input
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={numericalQuestions}
                onChange={(e) => setNumericalQuestions(e.target.value)}
              />
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fill in the blank:
              </label>
              <input
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={fillInTheBlankQuestions}
                onChange={(e) => setFillInTheBlankQuestions(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="m-5">
          <button type="submit" className="bg-gray-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
