function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, item) => acc + item.grade, 0);

  // Calculate average
  const average = sum / arr.length;

  return average;
}


function extractNameAndResults(inputArray) {
    return inputArray.map(item => ({
        name: item.name,
        results: calculateAverage(item.results)
    }));
}
function separateNamesAndResults(inputArray) {
    const names = inputArray.map(item => item.name);
    const results = inputArray.map(item => parseFloat(item.results.toFixed(4)));

    return { names, results };
}


export const myExams = (allExams) => {
  const result = extractNameAndResults(allExams)
  console.log("all", result);
  //results = getResultsAverages(results);
  return separateNamesAndResults(result);
};
