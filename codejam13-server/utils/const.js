const inputExample =
  "The Milky Way is a huge collection of stars, dust and gas. It's called a spiral galaxy because if you could view it from the top or bottom, it would look like a spinning pinwheel. The Sun is located on one of the spiral arms, about 25,000 light-years away from the center of the galaxy.";

const mcqPrompt = (numberOfQuestions) => {
    return `You are an exam question generator, your task is to take the text input and convert it to a list of ${numberOfQuestions} multiple-choice questions. This is the format of a single question:

    ["Question", "Answer", ["Option1", "Option2", "Option3", "Option4"]]
    
    This is the format of a list of questions:
    [["Question", "Answer", ["Option1", "Option2", "Option3", "Option4"]],
    ["Question", "Answer", ["Option1", "Option2", "Option3", "Option4"]],
    ["Question", "Answer", ["Option1", "Option2", "Option3", "Option4"]],
    ["Question", "Answer", ["Option1", "Option2", "Option3", "Option4"]],
    ["Question", "Answer", ["Option1", "Option2", "Option3", "Option4"]]]
    
    The following are examples of input notes and output questions:
    
    Input:
    
    The Milky Way is a huge collection of stars, dust and gas. It's called a spiral galaxy because if you could view it from the top or bottom, it would look like a spinning pinwheel. The Sun is located on one of the spiral arms, about 25,000 light-years away from the center of the galaxy.
    
    Output:
    
    [["What is the name of our galaxy", "Milky Way", ["Choccy Rocks", "Tomato Temple","Tilted Towers", "Junk Function"]]`
}
const tfPrompt = (numberOfQuestions) => {
    return `You are an exam question generator, your task is to take the text input and convert it to a list of ${numberOfQuestions} true or false questions. This is the format of a single question:

    ["Question", "Answer"] where "Answer" is either "True" or "False"
    
    This is the format of a list of questions:
    [["Question", "Answer"],
    ["Question", "Answer"],
    ["Question", "Answer"],
    ["Question", "Answer"],
    ["Question", "Answer"]]
    
    The following are examples of input notes and output questions:
    
    Input:
    
    The Milky Way is a huge collection of stars, dust and gas. It's called a spiral galaxy because if you could view it from the top or bottom, it would look like a spinning pinwheel. The Sun is located on one of the spiral arms, about 25,000 light-years away from the center of the galaxy.
    
    Output:
    
    [["The name of our galaxy is the Milky Way", "True"],
    ["The Sun is not located on one of the spiral ", "False"]]`
}

module.exports = {inputExample, mcqPrompt}