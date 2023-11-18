import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate } from "react-router-dom";

const Card = ({ title, onToggle, isGraphShown, grades }) => {
  const navigate = useNavigate();
  // Replace with your actual data fetching logic
  // Sample data - replace with your actual data
  const [examData, setExamData] = useState({
    title: title,
    grades: grades,
  });

  const goToExam = () => {
    navigate("/exam/aHC6uvngGJQTkyrAmbKM");
  };

  function separateGradesAndDates(gradesArray) {
    const gradesList = gradesArray.map((item) => item.grade);
    const datesList = gradesArray.map((item) => item.date);

    return { gradesList, datesList };
  }

  // State to control the visibility of the graph

  // Calculate the most recent grade and average grade
  let mostRecentGrade = NaN
  let averageGrade = NaN
  if (grades.length > 0){
    const { gradesList, datesList } = separateGradesAndDates(examData.grades);
    mostRecentGrade = examData.grades[examData.grades.length - 1].grade;
    averageGrade =
    examData.grades.reduce((acc, curr) => acc + curr.grade, 0) /
    examData.grades.length;
    console.log(grades)
  }

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
      <button onClick={onToggle}>
        {isGraphShown ? "Hide Graph" : "Show Graph"}
      </button>
      {isGraphShown && grades.length > 0 ? (
        <BarChart
          xAxis={[{ scaleType: "band", data: datesList }]}
          series={[{ data: gradesList }]}
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
      <button onClick={goToExam}>Attempt Exam</button>
    </div>
  );
};

export default Card;
