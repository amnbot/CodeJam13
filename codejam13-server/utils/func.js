const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateQuestions = async (prompt, input) => {
  console.log("generating...");
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: input },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log("Output: ", chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content;
};

/* Parse mcq question
Input Format: A string in the form: [["Question1", "Answer", ["Option1", "Option2", "Option3", "Option4"]],["Question2", "Answer", ["Option1", "Option2", "Option3", "Option4"]],...]
Output Format: A json object in the form:
{
        multipleChoice: [
                {
                        question: "Question1",
                        answer: "Answer",
                        choices: ["Option1", "Option2", "Option3", "Option4"]
                },
                {
                        question: "Question2",
                        answer: "Answer",
                        choices: ["Option1", "Option2", "Option3", "Option4"]
                }
        ]
} */
const parseMCQ = (inputString) => {
  // Replace double quotes with single quotes to ensure proper parsing
  const formattedString = inputString.replace(/"/g, "'");

  // Use regular expressions to extract data from the string
  const regex = /\['(.*?)', '(.*?)', \[(.*?)\]\]/g;
  const matches = formattedString.matchAll(regex);

  // Map the matches to the desired JSON format
  const result = {
    multipleChoice: Array.from(matches, (match) => ({
      question: match[1],
      answer: match[2],
      choices: match[3].split("', '"),
    })),
  };

  return result;
};

const parseTF = (inputString) => {
  // Replace double quotes with single quotes to ensure proper parsing
  const formattedString = inputString.replace(/"/g, "'");

  // Use regular expressions to extract data from the string
  const regex = /\['(.*?)', '(.*?)'\]/g;
  const matches = formattedString.matchAll(regex);

  // Map the matches to the desired JSON format
  const result = {
    trueOrFalse: Array.from(matches, (match) => ({
      question: match[1],
      answer: match[2],
    })),
  };

  return result;
};

const parseNum = (inputString) => {
  // Replace double quotes with single quotes to ensure proper parsing
  const formattedString = inputString.replace(/"/g, "'");

  // Use regular expressions to extract data from the string
  const regex = /\['(.*?)', '(.*?)'\]/g;
  const matches = formattedString.matchAll(regex);

  // Map the matches to the desired JSON format
  const result = {
    numerical: Array.from(matches, (match) => ({
      question: match[1],
      answer: match[2],
    })),
  };

  return result;
};

/*
This is the format of a list of questions:
    [["Question", "Answer"],
    ["Question", "Answer"],
    ["Question", "Answer"],
    ["Question", "Answer"],
    ["Question", "Answer"]]

Output Format: A json object in the form:
{
        trueOrFalse: [
                {
                        question: "Question1",
                        answer: "Answer",
                },
                {
                        question: "Question2",
                        answer: "Answer",
                }
        ]
} */

module.exports = { generateQuestions, parseMCQ, parseTF, parseNum };
