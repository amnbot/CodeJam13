const { mcqPrompt } = require("./const");
const {generateQuestions, parseMCQ} = require("./func");

/*
Function that returns questions in the following format:
{
    multipleChoice: [
        {
            question: "Question",
            answer: "Answer",
            choices: ["1", "2", "3", "4"]
        },
        ...
    ],
    fillInTheBlank: [
        {
            question: "Question",
            answer: "Answer"
        },
        ...
    ],
    trueOrFalse: [],
    numerical: number
}
*/
const createQuestions = async (body) => {
  let prompt = "";
  let questions = {};
  if (body.multipleChoiceQuestions > 0) {
    prompt = mcqPrompt(body.multipleChoiceQuestions);
    const output = await generateQuestions(prompt, body.input);
    // console.log("Output: ", output);
    const mcq = parseMCQ(output);
    questions = {...questions, multipleChoice: mcq.multipleChoice};
    console.log(questions);
  }
  if (body.fillInTheBlankQuestions > 0) {
    // prompt = setPrompt(body.numberOfQuestions, "fitb");
  }
  if (body.trueOrFalseQuestions > 0) {
    // prompt = setPrompt(body.numberOfQuestions, "tf");
  }
  if (body.numericalQuestions > 0) {
    // prompt = setPrompt(body.numberOfQuestions, "num");
  }

  return questions
};

module.exports = { createQuestions };
