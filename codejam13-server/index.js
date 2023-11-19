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
  console.log(exam)
  res.json(exam);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Testing

const mockGenMCQ = `[
    ["Which desert covers large parts of Algeria, Chad, Egypt, Libya, Mali, Mauritania, Morocco, Niger, Western Sahara, Sudan, and Tunisia?", "Sahara", ["Kalahari", "Gobi", "Atacama", "Namib"]],
    ["What is the total area covered by the Sahara desert?", "9 million square kilometres (3,500,000 sq mi)", ["5 million square kilometres", "7 million square kilometres", "10 million square kilometres", "12 million square kilometres"]],
    ["What percentage of Africa does the Sahara desert cover?", "31%", ["10%", "20%", "40%", "50%"]],
    ["Which country does not have any part of its territory covered by the Sahara desert?", "Kenya", ["Mali", "Chad", "Algeria", "Libya"]],
    ["What is the largest desert in the world?", "Sahara", ["Arabian", "Antarctic", "Gobi", "Namib"]]
  ]]`;

const mockParseMcq = parseMCQ(mockGenMCQ);
// console.log(JSON.stringify(mockParseMcq, null, 2));

const questions = `[["How far away in light-years from the center of the galaxy is the Sun located", "25 000"]]`;

const formattedQuestions = parseNum(questions);
console.log(JSON.stringify(formattedQuestions, null, 2));
