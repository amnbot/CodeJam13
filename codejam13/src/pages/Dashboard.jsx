import React, { useState, useEffect } from "react";
import { myExams, getNRecentExams, getNBestExams } from "../utils/functions";
import { getAllExams } from "../utils/firestoreFunctions";
import { BarChart } from "@mui/x-charts/BarChart";
import { getGradeEmoji } from "../utils/utils";

export default function Dashboard() {
  const [allExams, setAllExams] = useState([]);
  const [nBestGrades, setNBestGrades] = useState([]);
  const [nBestLabels, setNBestLabels] = useState([]);

  useEffect(() => {
    // console.log("dashboard mounted");
    getAllExams().then((res) => {
      setAllExams(res);
    });
  }, []);

  useEffect(() => {
    // console.log(allExams);
    // console.log(getNRecentExams(allExams, 7));
    getNRecentExams(allExams, 7);
    const { names, results } = getNBestExams(allExams, 7);
    console.log(names, results)
    setNBestGrades(results);
    setNBestLabels(names);
  }, [allExams]);

  const averagePerExamLastWeek = () => (
    <div className="col-span-3 row-span-2 bg-opacity-50 bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col justify-between">
      <h1 className="text-3xl font-bold">
        {"Your Average Score over the Last Week"}
      </h1>

      <BarChart
        xAxis={[{ scaleType: "band", data: names ?? [] }]}
        series={[{ data: results ?? [] }]}
        width={1100}
        height={400}
        yAxis={[{ min: 0, max: 100 }]}
        sx={{
          //change left yAxis label styles
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "white",
          },
          // change all labels fontFamily shown on both xAxis and yAxis
          "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
            fontFamily: "Roboto",
          },
          // change bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.5",
            fill: "white",
          },
          // bottomAxis Line Styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "white",
            strokeWidth: 0.4,
          },
          // leftAxis Line Styles
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "white",
            strokeWidth: 0.4,
          },
        }}
      />
    </div>
  );

  const mostRecentSeven = () => (
    <div className="col-span-3 row-span-2 justify-center bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col">
      <h1 className="my-3 text-3xl font-bold">{"Best attempts"}</h1>
      <h1 className="my-3 text-3xl font-bold">
        <BarChart
          xAxis={[{ scaleType: "band", data: names ?? [] }]}
          series={[{ data: results ?? [] }]}
          width={1100}
          height={400}
          yAxis={[{ min: 0, max: 100 }]}
          sx={{
            //change left yAxis label styles
            "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.4",
              fill: "white",
            },
            // change all labels fontFamily shown on both xAxis and yAxis
            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
              fontFamily: "Roboto",
            },
            // change bottom label styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.5",
              fill: "white",
            },
            // bottomAxis Line Styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "white",
              strokeWidth: 0.4,
            },
            // leftAxis Line Styles
            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "white",
              strokeWidth: 0.4,
            },
          }}
        />
      </h1>
    </div>
  );

  const bestSeven = () => (
    <div className="col-span-3 row-span-2 justify-center bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col">
      <h1 className="my-3 text-3xl font-bold">{"Your best attempts"}</h1>
      <h1 className="my-3 text-3xl font-bold">
        <BarChart
          xAxis={[{ scaleType: "band", data: nBestLabels ?? [] }]}
          series={[{ data: nBestGrades ?? [] }]}
          width={1100}
          height={400}
          yAxis={[{ min: 0, max: 100 }]}
          sx={{
            //change left yAxis label styles
            "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.4",
              fill: "white",
            },
            // change all labels fontFamily shown on both xAxis and yAxis
            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
              fontFamily: "Roboto",
            },
            // change bottom label styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.5",
              fill: "white",
            },
            // bottomAxis Line Styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "white",
              strokeWidth: 0.4,
            },
            // leftAxis Line Styles
            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "white",
              strokeWidth: 0.4,
            },
          }}
        />
      </h1>
    </div>
  );

  const averageScore = () => (
    <div className="col-span-1 row-span-1 justify-center bg-gradient-to-tr from-[#000046] to-[#1CB5E0] m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col">
      <h1 className="my-3 text-3xl font-bold">{"Your Average Score"}</h1>
      <h1 className="my-3 text-3xl font-bold">
        {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(0) +
          getGradeEmoji(
            (results.reduce((a, b) => a + b, 0) / results.length).toFixed(0)
          )}
      </h1>
    </div>
  );

  const worstScore = () => (
    <div className="col-span-1 row-span-1 justify-center bg-gradient-to-tr from-[#c31432] to-[#240b36] m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col">
      <h1 className="my-3 text-3xl font-bold">{"Your Worst Score"}</h1>
      <h1 className="my-3 text-3xl font-bold">
        {Math.min(...results).toFixed(0) +
          "%" +
          getGradeEmoji(Math.min(...results).toFixed(0))}
      </h1>
    </div>
  );

  const bestScore = () => (
    <div className="bg-gradient-to-tr from-[#11998e] to-[#38ef7d] col-span-1 row-span-1 justify-center bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col">
      <h1 className="my-3 text-3xl font-bold">{"Your Best Score"}</h1>
      <h1 className="my-3 text-3xl font-bold">
        {nBestGrades[0] + "%" + getGradeEmoji(nBestGrades[0])}
      </h1>
      <h2>
        On <i>{nBestLabels[0]}</i>
      </h2>
    </div>
  )

  const numberOfAttemps = () => (
    <div className="col-span-1 row-span-1 justify-center bg-gradient-to-tr from-[#fc4a1a] to-[#f7b733] m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col">
      <h1 className="my-3 text-3xl font-bold">{"Exams taken"}</h1>
      <h1 className="my-3 text-3xl font-bold">{results.length}</h1>
    </div>
  );

  const { names, results } = myExams(allExams);
  // console.log("asasd", results, names);
  if (
    !names ||
    names.length === 0 ||
    !results ||
    (results.length === 0 && !nBestGrades) ||
    (nBestGrades.length === 0 && !nBestLabels) ||
    nBestLabels.length === 0
  ) {
    return;
  }
  return (
    <div className="text-3xl">
      <h1 className="my-3 text-3xl font-bold">{"Weekly Report"}</h1>
      <div className="grid grid-cols-4 grid-rows-6">
        {averagePerExamLastWeek()}
        {bestScore()}
        {worstScore()}
        {bestSeven()}
        {averageScore()}
        {numberOfAttemps()}
        {/* {mostRecentSeven()} */}
      </div>
    </div>
  );
}
