var questions = [{
    title: "Who is making the Web standards?",
    choices: ["Microsoft", "Google", "Mozilla", "The World Wide Web Consortium"],
    answer: "The World Wide Web Consortium"
},
{
    title: "Choose the correct HTML element for the largest heading:",
    choices: ["heading", "head", "h1", "h6"],
    answer: "h1( )"
},
{
    title: "Choose the correct HTML element to define important text:",
    choices: ["important", "i", "strong", "b"],
    answer: "important"
},
{
    title: "Which character is used to indicate an end tag?",
    choices: ["^", "*", "<", "/"],
    answer: "/"
},
{
    title: "How can you make a numbered list?",
    choices: ["list", "ul", "ol", "dl"],
    answer: "ol"
},
{
    title: "How can you make a bulleted list?",
    choices: ["list", "ul", "ol", "dl"],
    answer: "ul"
},
{
    title: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    choices: ["alt", "longdesc", "src", "title"],
    answer: "alt"
},
{
    title: "The HTML canvas element is used to?",
    choices: ["draw graphics", "display database records", "manipulate data in MySQL", "create draggable elements"],
    answer: "draw graphics"
},
{
    title: "In HTML, which attribute is used to specify that an input field must be filled out?",
    choices: ["required", "placeholder", "validate", "formvalidate"],
    answer: "required"
},
{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "js", "javascript", "scripting"],
    answer: "ol"
},

]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

    timeLeft = 100;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    next();
}

function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score + ` /100!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Set score</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + ` highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
    Quiz Code Challenge!
    </h1>
    <h3>
    Try to answer the following code-related questions within the time limit. Keep in mind that incorrent answers will penalize your scoretime by ten seconds!   
    </h3>
    <button onclick="start()">Start</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
    timeLeft -= 10;
    next();
}

function correct() {
    score += 10;
    next();
}

function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}