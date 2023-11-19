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
    
    [["What is the name of our galaxy", "Milky Way", ["Choccy Rocks", "Tomato Temple","Tilted Towers", "Junk Function"]],
    ["How far away in light-years from the center of the galaxy is the Sun located", "25 000", ["10 000", "20 000", "30 000", "40 000"]],
    ["What is the Sun located on", "spiral arms", ["spiral legs", "spiral head", "spiral body", "spiral feet"]],
    ["The Milky is a huge collection of what", "stars, dust and gas", ["stars, dust and water", "stars, dust and fire", "stars, dust and earth", "stars, dust and air"]]]`
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
    ["The Sun is not located on one of the spiral ", "False"]
    ["The Milky Way is a huge collection of stars, dust and gas", "True"],
    ["The Milky Way not called a sprial galaxy", "False"],
    [The Milky Way would look like a spinning pinwheel if you could view it from the top or bottom", "True"]]`
}
const numPrompt = (numberOfQuestions) => {
    return `You are an exam question generator, your task is to take the text input and convert it to a list of ${numberOfQuestions} numerical answer questions. This is the format of a single question:

    ["Question", "Answer"] where "Answer" is a number rounded to the nearest unit
    
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
    
    [["How far away in light-years from the center of the galaxy is the Sun located", "25 000"]]`
}

module.exports = {inputExample, mcqPrompt, tfPrompt, numPrompt}