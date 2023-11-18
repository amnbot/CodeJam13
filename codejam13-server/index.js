
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Add the body-parser import
const app = express();

const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies

// Route for creating an exam
app.post('/create-exam', (req, res) => {
    // Handle the logic for creating an exam here
    console.log("Input: ", req.body); // req.body will contain the parsed body data
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
