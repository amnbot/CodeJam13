const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser"); // Add the body-parser import
const app = express();
const { setPrompt, createQuestions } = require("./utils/utils");
const { parseMCQ, parseTF, parseNum } = require("./utils/func");
const { parseSingle } = require("./utils/func");

const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

// Route for creating an exam
app.post("/create-exam", async (req, res) => {
  // Handle the logic for creating an exam here
  const { body } = req;
  console.log("Input: ", body); //body will contain the parsed body data
  const exam = await createQuestions(body);
  console.log(exam);
  res.json(exam);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Testing

const mockGenMCQ = ` [
  [
      "What event marked the beginning of World War II?",
      "Nazi Germany's invasion of Poland",
      [
          "The end of World War I",
          "The economic crisis of the Great Depression",
          "The creation of the United Nations",
          "The bombing of Hiroshima and Nagasaki"
      ]
  ],
  [
      "How many people are estimated to have died during World War II?",
      "60 to 80 million",
      [
          "10 to 20 million",
          "30 to 40 million",
          "50 to 60 million",
          "80 to 100 million"
      ]
  ]
]`;

const mockParseMcq = parseMCQ(mockGenMCQ);
// console.log(JSON.stringify(mockParseMcq, null, 2));

const questions = `[["How far away in light-years from the center of the galaxy is the Sun located", "25 000"]]`;

const formattedQuestions = parseNum(questions);
console.log(JSON.stringify(mockParseMcq, null, 2));
