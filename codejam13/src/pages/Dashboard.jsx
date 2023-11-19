import React, { useState, useEffect } from "react";
import { myExams } from "../utils/functions";
import { getAllExams } from "../utils/firestoreFunctions";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Dashboard() {
  const [allExams, setAllExams] = useState([]);

  useEffect(() => {
    console.log("dashboard mounted");
    getAllExams().then((res) => {
      setAllExams(res);
    });
  }, []);

  useEffect(() => {
    console.log(allExams);
  }, [allExams]);

  const { names, results } = myExams(allExams);
  console.log("asasd", results, names);
  if(!names || names.length === 0){
    return;
  }
  return (
    <div className="text-3xl">
      Dashboard
      <div className="bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col justify-between">
        <h1 className="text-3xl font-bold">
          {"Your Average Score over the Last Week"}
        </h1>

        <BarChart
          xAxis={[{ scaleType: "band", data: names ?? [] }]}
          series={[{ data: results ?? [] }]}
          width={500}
          height={300}
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
    </div>
  );
}
