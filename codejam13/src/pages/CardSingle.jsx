import React, { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Card = ({title, grades}) => {
    // Replace with your actual data fetching logic
     // Sample data - replace with your actual data
     const [examData, setExamData] = useState({
        title: title,
        grades: grades
    });

    function separateGradesAndDates(gradesArray) {
        const gradesList = gradesArray.map(item => item.grade);
        const datesList = gradesArray.map(item => item.date);
    
        return { gradesList, datesList };
    }

    const {gradesList, datesList} = separateGradesAndDates(examData.grades)

    // State to control the visibility of the graph
    const [showGraph, setShowGraph] = useState(false);

    // Calculate the most recent grade and average grade
    const mostRecentGrade = examData.grades[examData.grades.length - 1].grade;
    const averageGrade = examData.grades.reduce((acc, curr) => acc + curr.grade, 0) / examData.grades.length;  

    return (
        <div className='bg-gray-700'>
        
            <h1>{examData.title}</h1>
            <button onClick={() => setShowGraph(!showGraph)}>
                {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
            {showGraph ? <BarChart 
                xAxis={[{ scaleType: 'band', data: datesList}]}
                series={[{data: gradesList}]}
                width={500}
                height={300}
                yAxis={[{ min: 0, max: 100 }]}
            /> : <div><p>Most Recent Grade: {mostRecentGrade}</p>
            <p>Average Grade: {averageGrade.toFixed(2)}</p> </div>}
        </div>
    );
};

export default Card;