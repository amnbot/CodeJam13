function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, item) => acc + item.grade, 0);

  // Calculate average
  const average = sum / arr.length;

  return average;
}

function extractNameAndResults(inputArray) {
  const filteredArray = inputArray.filter(
    (item) => item.name !== undefined && item.results !== undefined
  );

  return filteredArray.map((item) => ({
    name: item.name,
    results: calculateAverage(item.results),
  }));
}
function separateNamesAndResults(inputArray) {
  const names = inputArray.map((item) => item.name);
  const results = inputArray.map((item) => parseFloat(item.results.toFixed(4)));

  return { names, results };
}

export const myExams = (allExams) => {
  const result = extractNameAndResults(allExams);
  console.log("all", result);
  //results = getResultsAverages(results);
  return separateNamesAndResults(result);
};

export const getNRecentExams = (allExams, n) => {
  const result = extractNameAndResults(allExams);
  const res = separateNamesAndResults(result);
  var arr = [];
  allExams.map((exam, index) => {
    console.log(index, exam.results);
    if (exam.results) {
      exam.results.forEach((result, index) => {
        arr = [...arr, { name: exam.name, result }];
      });
    }
  });

  console.log(arr.sort((a, b) => b.result.date - a.result.date).slice(0, n));
};

export const getNBestExams = (allExams, n) => {
  const result = extractNameAndResults(allExams);
  const res = separateNamesAndResults(result);
  var arr = [];
  allExams.map((exam, index) => {
    console.log(index, exam.results);
    if (exam.results) {
      exam.results.forEach((result, index) => {
        arr = [...arr, { name: exam.name, result }];
      });
    }
  });

  const sorted = arr.sort((a, b) => b.result.grade - a.result.grade).slice(0, n);
  const names = sorted.map((item) => item.name);
  const results = sorted.map((item) => parseFloat(item.result.grade.toFixed(2)));
  console.log(names, results);
  return { names, results };
};
