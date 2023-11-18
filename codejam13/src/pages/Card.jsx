import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Card = ({title, onToggle, isGraphShown}) => {
    // Replace with your actual data fetching logic
     // Sample data - replace with your actual data
     const [examData, setExamData] = useState({
        title: title,
        grades: [
            { grade: 78, date: '2023-01-01' },
            { grade: 82, date: '2023-01-15' },
            { grade: 85, date: '2023-02-01' },
            // ... other grades
        ],
    });
    

    function separateGradesAndDates(gradesArray) {
        const gradesList = gradesArray.map(item => item.grade);
        const datesList = gradesArray.map(item => item.date);
    
        return { gradesList, datesList };
    }

    const {gradesList, datesList} = separateGradesAndDates(examData.grades)

    // State to control the visibility of the graph
    

    // Calculate the most recent grade and average grade
    const mostRecentGrade = examData.grades[examData.grades.length - 1].grade;
    const averageGrade = examData.grades.reduce((acc, curr) => acc + curr.grade, 0) / examData.grades.length;  

    return (
        <div style={{
            background: 'gray',
            margin: '1rem',
            padding: '1rem',
            borderRadius: '0.5rem',
            minHeight: '250px', // Set a minimum height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
        
            <h1>{examData.title}</h1>
            <button onClick={onToggle}>
                {isGraphShown ? 'Hide Graph' : 'Show Graph'}
            </button>
            {isGraphShown ? <BarChart 
                xAxis={[{ scaleType: 'band', data: datesList}]}
                series={[{data: gradesList}]}
                width={500}
                height={300}
            /> : <div><p>Most Recent Grade: {mostRecentGrade}</p>
            <p>Average Grade: {averageGrade.toFixed(2)}</p> </div>}
        </div>
    );
};

export default Card;
