import React, { useState, useEffect } from "react";
import { addExam } from "../utils/firestoreFunctions";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import { getGroup } from "../utils/firestoreFunctions";
import { getCurrentUser } from "../services/AuthContext";
import { Typography } from "@mui/material";

const CreateExam = () => {
  const navigate = useNavigate();

  const [examName, setExamName] = useState("");
  const [input, setInput] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [trueOrFalseQuestions, setTrueOrFalseQuestions] = useState(0);
  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState(0);
  const [numericalQuestions, setNumericalQuestions] = useState(0);
  const [fillInTheBlankQuestions, setFillInTheBlankQuestions] = useState(0);
  // const [groups, setGroups] = useState([]);
  const [selectedGroup, setGroup] = useState(null);

  useEffect(() => {
    // getCurrentUser().then((user) => {
    //   const list = [];
    //   for (var index in user?.groups ?? []) {
    //     getGroup(user.groups[index]).then((group) => {
    //       list.push(group);
    //       setGroups(list);
    //     });
    //   }
    // });
  }, []);

  useEffect(() => {
    console.log(examName);
  }, [examName]);

  // useEffect(() => {
  //   console.log(groups);
  // }, [groups]);

  // const handleChange = (event) => {
  //   setGroup(event.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name: examName,
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
        addExam({ ...data, name: examName })
          .then((res) => {
            console.log(res);
            navigate(`/exam/${res}`);
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
      <Typography variant="h3" className="mt-4" sx={{ marginTop: "20px" }}>
        Create Exam
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="m-5 col"
        style={{ padding: "0px 40px" }}
      >
        <div
          className="grid grid-cols-5 gap-y-4 gap-4 text-left"
          style={{
            padding: "25px 30px",
            boxShadow: "0rem .125rem 1rem 0rem rgba(25,25,25,.15)",
            height: "80vh",
            borderRadius: "8px",
          }}
        >
          <div className="col-span-3">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Exam name
            </label>
            <input
              type="text"
              value={examName}
              placeholder="Exam name"
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setExamName(e.target.value)}
            />
            <label
              style={{ marginTop: "10px" }}
              className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Input
            </label>
            <textarea
              style={{ height: "300px" }}
              id="message"
              rows="4"
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your input here (lecture notes, lecture transcript, ...)"
            ></textarea>
            {/* <FormControl fullWidth sx={{ marginTop: "30px" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ fontSize: "20px" }}
              >
                Group (optional)
              </InputLabel>
              <Select
                sx={{ marginTop: "10px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedGroup ?? "New Group"}
                label="Group"
                onChange={handleChange}
              >
                {groups.map((group, index) => (
                  <MenuItem key={index} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </div>

          <div className="col-span-2 my-4 space-y-4 text-left">
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
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
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                True or False:
              </label>
              <input
                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={trueOrFalseQuestions}
                onChange={(e) => setTrueOrFalseQuestions(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                Multiple Choice:
              </label>
              <input
                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={multipleChoiceQuestions}
                onChange={(e) => setMultipleChoiceQuestions(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                Numerical:
              </label>
              <input
                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={numericalQuestions}
                onChange={(e) => setNumericalQuestions(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                Fill in the blank:
              </label>
              <input
                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                value={fillInTheBlankQuestions}
                onChange={(e) => setFillInTheBlankQuestions(e.target.value)}
              />
            </div>
            <div style={{ display: "grid", marginTop: "40px" }}>
              <button
                style={{ justifySelf: "center", width: "70%" }}
                type="submit"
                className="bg-gray-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
