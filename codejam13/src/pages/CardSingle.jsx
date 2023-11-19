import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const Card = ({ title, grades, alwaysShow = false }) => {
  // Replace with your actual data fetching logic
  // Sample data - replace with your actual data
  const [examData, setExamData] = useState({
    title: title,
    grades: grades,
  });

  function separateGradesAndDates(gradesArray) {
    const gradesArr = gradesArray.map((item) => item.grade);
    const gradesList = gradesArr.map((item) => {
      return { data: [item] };
    });
    console.log(gradesList);
    const datesList = gradesArray.map((item) => item.date);

    return { gradesList, datesList };
  }

  // State to control the visibility of the graph
  const [showGraph, setShowGraph] = useState(alwaysShow);
  function getColorForGrade(grade) {
    console.log(grade);
    if (grade > 80) {
      return "#79cc41"; // Green for high grades
    } else if (grade > 55) {
      return "#cc8441"; // Orange for medium grades
    } else {
      return "#cc5641"; // Red for low grades
    }
  }

  let mostRecentGrade = NaN;
  let averageGrade = NaN;
  let gradesList = [];
  let datesList = [];
  let coloredGrades = [];
  if (grades !== undefined) {
    if (grades.length > 0) {
      gradesList, (datesList = separateGradesAndDates(examData.grades));
      // Calculate the most recent grade and average grade
      mostRecentGrade = examData.grades[examData.grades.length - 1].grade;
      averageGrade =
        examData.grades.reduce((acc, curr) => acc + curr.grade, 0) /
        examData.grades.length;
      coloredGrades = datesList.gradesList.map((item) => ({
        ...item,
        color: getColorForGrade(item.data[0]),
      }));
    }
  }

  console.log(gradesList, datesList);

  if (grades) {
    if (grades.length > 0) {
      return (
        <div
          style={{ display: "inline-block", margin: "auto" }}
          className="bg-gray-700 m-4 rounded-3xl p-4"
        >
          <h1 className="text-3xl italic">{examData.title}</h1>
          {!alwaysShow ? (
            <button onClick={() => setShowGraph(!showGraph)}>
              {showGraph ? "Hide Graph" : "Show Graph"}
            </button>
          ) : null}
          {showGraph && grades.length > 0 ? (
            <BarChart
              xAxis={[{ scaleType: "band", data: datesList.datesList }]}
              series={coloredGrades}
              width={500}
              height={300}
              yAxis={[{ min: 0, max: 100 }]}
            />
          ) : (
            <div>
              <p>Most Recent Grade: {mostRecentGrade}</p>
              <p>Average Grade: {averageGrade.toFixed(2)}</p>{" "}
            </div>
          )}
        </div>
      );
    }
  }
};

export default Card;
