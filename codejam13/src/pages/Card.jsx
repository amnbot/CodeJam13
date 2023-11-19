import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate } from "react-router-dom";

const Card = ({ title, onToggle, isGraphShown, grades, examId }) => {
  const navigate = useNavigate();
  // Replace with your actual data fetching logic
  // Sample data - replace with your actual data
  const [examData, setExamData] = useState({
    title: title,
    grades: grades,
  });

  const goToExam = () => {
    navigate(`/exam/${examId}`);
  };

  console.log(grades);

  function separateGradesAndDates(gradesArray) {
    const gradesArr = gradesArray.map((item) => item.grade);
    const gradesList = gradesArr.map((item) => {
      return { data: [item] };
    });
    const datesList = gradesArray.map((item) => item.date);

    return { gradesList, datesList };
  }

  // State to control the visibility of the graph

  function getColorForGrade(grade) {
    console.log(grade)
    if (grade > 90) {
      return "#00FF00"; // Green for high grades
    } else if (grade > 50) {
      return "#FFA500"; // Orange for medium grades
    } else {
      return "#FF0000"; // Red for low grades
    }
  }
  // Calculate the most recent grade and average grade
  let mostRecentGrade = NaN;
  let averageGrade = NaN;
  let gradesList = [];
  let datesList = [];
  let coloredGrades = [];
  if (grades !== undefined) {
    if (grades.length > 0) {
      gradesList, (datesList = separateGradesAndDates(examData.grades));
      mostRecentGrade = examData.grades[examData.grades.length - 1].grade;
      averageGrade =
        examData.grades.reduce((acc, curr) => acc + curr.grade, 0) /
        examData.grades.length;
      console.log(grades);
      coloredGrades = datesList.gradesList.map((item) => ({
        ...item, 
        color: getColorForGrade(item.data[0]),
      }));
      console.log(coloredGrades)
    }
  }

  console.log(datesList);
  return (
    <div
      style={{
        background: "gray",
        margin: "1rem",
        padding: "1rem",
        borderRadius: "0.5rem",
        minHeight: "250px", // Set a minimum height
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1>{title}</h1>
      <button
        onClick={onToggle}
        className="hover:cursor-pointer hover:scale-110 ease-in-out transition-all duration-300"
      >
        {isGraphShown ? "Hide Graph" : "Show Graph"}
      </button>
      {isGraphShown && grades.length > 0 ? (
        <BarChart
          xAxis={[{ scaleType: "band", data: datesList.datesList }]}
          series={coloredGrades}
          width={500}
          height={300}
          yAxis={[{ min: 0, max: 100 }]}
        />
      ) : (
        <div>
          <p>
            Most Recent Grade:{" "}
            {mostRecentGrade ? mostRecentGrade : "No results to show"}
          </p>
          <p>
            Average Grade:{" "}
            {averageGrade ? averageGrade.toFixed(2) : "No results to show"}
          </p>{" "}
        </div>
      )}
      <button
        onClick={goToExam}
        className="hover:cursor-pointer hover:scale-110 ease-in-out transition-all duration-300"
      >
        Attempt Exam
      </button>
      <button
        onClick={() => navigate(`/my-exams/${examId}`)}
        className="hover:cursor-pointer hover:scale-110 ease-in-out transition-all duration-300"
      >
        Details
      </button>
    </div>
  );
};

export default Card;
