
const express = require('express');
const cors = require('cors'); // Add the cors import
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

// Route for creating an exam
app.post('/create-exam', (req, res) => {
    // Handle the logic for creating an exam here
    console.log("Input: ", req.body)
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
