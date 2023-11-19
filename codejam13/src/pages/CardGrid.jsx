import React, { useState, useEffect } from "react";
import Card from "./Card"; // Adjust the path as per your project structure
import { getAllExams } from "../utils/firestoreFunctions";

const CardGrid = ({ cardsfd }) => {
  const [allExams, setAllExams] = useState([]);

  useEffect(() => {
    getAllExams().then((res) => {
      setAllExams(res);
    });
  }, []);

  useEffect(() => {
    console.log(allExams);
  }, [allExams]);

  const cards = [
    {
      title: "Aymen",
      grades: [
        { grade: 40, date: "2023-01-01" },
        { grade: 30, date: "2023-01-15" },
        { grade: 40, date: "2023-02-01" },
      ],
    },
    {
      title: "Asfsd",
      grades: [
        { grade: 78, date: "2023-01-01" },
        { grade: 82, date: "2023-01-15" },
        { grade: 85, date: "2023-02-01" },
      ],
    },
    {
      title: "Fsdfsdfds",
      grades: [
        { grade: 100, date: "2023-01-01" },
        { grade: 99, date: "2023-01-15" },
        { grade: 2, date: "2023-02-01" },
      ],
    },
    {
      title: "sffasada",
      grades: [
        { grade: 21, date: "2023-01-01" },
        { grade: 82, date: "2023-01-15" },
        { grade: 85, date: "2023-02-01" },
      ],
    },
  ];

  const [activeCardTitle, setActiveCardTitle] = useState("");

  const handleToggle = (title) => {
    setActiveCardTitle((prevTitle) => (prevTitle === title ? "" : title));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)", // This will create three columns
        gap: "1rem", // Adjust the gap to your preference
        padding: "1rem", // Adjust the padding to your preference
      }}
    >
      {allExams.length > 0
        ? allExams.map((card) => {
            console.log(card);
            if (card) {
              if (card.results) {
                return (
                  <Card
                    key={card.name}
                    title={card.name}
                    isGraphShown={card.name === activeCardTitle}
                    onToggle={() => handleToggle(card.name)}
                    grades={card.results}
                    examId={card.id}
                  />
                );
              } else {
                return (
                  <Card
                    key={card.name}
                    title={card.name}
                    isGraphShown={card.name === activeCardTitle}
                    onToggle={() => handleToggle(card.name)}
                    grades={[]}
                    examId={card.id}
                  />
                );
              }
            }
          })
        : null}
    </div>
  );
};

export default CardGrid;
