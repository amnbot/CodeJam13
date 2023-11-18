import React, { useState } from "react";
import Card from "./Card"; // Adjust the path as per your project structure
import { getAllExams } from "../utils/firestoreFunctions";

const CardGrid = ({ cardsfd }) => {

    const allExams = getAllExams()
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
        {cards.map((card) => (
            <Card key={card.title}
            title={card.title}
            isGraphShown={card.title === activeCardTitle}
            onToggle={() => handleToggle(card.title)}
            grades={card.grades}
            />
        ))}
        </div>
    );
    };

export default CardGrid;
