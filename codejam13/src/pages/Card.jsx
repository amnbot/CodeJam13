import React, { useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate } from "react-router-dom";
import { getGradeEmoji } from "../utils/utils";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
    const gradesList = gradesArray.map((item) => item.grade);
    const datesList = gradesArray.map((item) => item.date);

    return { gradesList, datesList };
  }

  // State to control the visibility of the graph

  function getColorForGrade(grade) {
    console.log(grade)
    if (grade > 80) {
      return "#79cc41"; // Green for high grades
    } else if (grade > 55) {
      return "#cc8441"; // Orange for medium grades
    } else {
      return "#cc5641"; // Red for low grades
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
      // coloredGrades = datesList.gradesList.map((item) => ({
      //   ...item, 
      //   color: getColorForGrade(item.data[0]),
      // }));
      // console.log(coloredGrades)

    }
  }

  console.log(datesList);
  return (
    <div
      className="bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col justify-between"
    >
      <h1 className="text-3xl font-bold">{title}</h1>
      {isGraphShown && grades.length > 0 ? (
        <BarChart
          xAxis={[{ scaleType: "band", data: datesList.datesList }]}
          series={[{data: datesList.gradesList}]}
          width={500}
          height={300}
          yAxis={[{ min: 0, max: 100 }]}
        />
      ) : (
        <div className="text-xl font-semibold ">
          <p>
            Most Recent Grade:{" "}
            {mostRecentGrade ? mostRecentGrade.toFixed(2) + getGradeEmoji(mostRecentGrade) : "No results to show"}
          </p>
          <p>
            Average Grade:{" "}
            {averageGrade ? averageGrade.toFixed(2) + getGradeEmoji(averageGrade) : "No results to show"}
          </p>{" "}
          <p>Attempts: {grades.length}</p>
        </div>
      )}
      <div className="inline-flex justify-between">
        <button
          onClick={onToggle}
          className="bg-gray-900 hover:cursor-pointer hover:scale-110 ease-in-out transition-all duration-300 w-[15%]"
        >
          {isGraphShown ? <VisibilityOffIcon /> : <BarChartIcon />}
        </button>
        <div className="inline-flex justify-end">
          <button
            onClick={goToExam}
            className="bg-gray-900 hover:cursor-pointer hover:scale-110 ease-in-out transition-all duration-300 w-[45%] m-1 items-center"
          >
            <HistoryEduIcon />
          </button>
          <button
            onClick={() => navigate(`/my-exams/${examId}`)}
            className="bg-gray-900 hover:cursor-pointer hover:scale-110 ease-in-out transition-all duration-300 w-[45%] m-1 items-center"
          >
            <MoreHorizIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
