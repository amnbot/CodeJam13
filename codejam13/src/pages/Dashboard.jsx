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
  console.log("asasd", results);
  return (
    <div className="text-3xl">
      Dashboard
      <div className="bg-gray-800 m-[1rem] p-[1rem] rounded-3xl min-h-[250px] flex flex-col justify-between">
        <h1 className="text-3xl font-bold">
          {"Your Average Score over the Last Week"}
        </h1>
      </div>
    </div>
  );
}
