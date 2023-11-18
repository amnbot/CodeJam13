import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getExam } from "../utils/firestoreFunctions";

export default function Exam({ exam }) {
  let { id } = useParams();
  useEffect(() => {
    getExam(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [])
  
  return <div>Exam</div>;
}
