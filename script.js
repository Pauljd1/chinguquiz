// DOM Elements
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("questionNumber");
const options = Array.from(document.querySelectorAll("#options button"));
const nxtBtn = document.getElementById("nextBtn");
const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");
const resetQuizBtn = document.getElementById("resetQuizBtn");
const correctItems = document.getElementById("correctItems");
const popupMessage = document.getElementById("popupMessage");

let currentQuestion = 0;
let score = 0;

// Quiz Questions
const quizData = [
    {
        question:
            "Which HTML5 element should contain important links for navigating a website?",
        id: 1,
        choices: { a: "<li>", b: "<ul>", c: "<header>", d: "<nav>" },
        answer: "d",
    },
    {
        question:
            "Which HTML5 element should contain important information about what page you are on and the topic of the page?",
        id: 2,
        choices: { a: "<li>", b: "<ul>", c: "<header>", d: "<nav>" },
        answer: "c",
    },
    {
        question:
            "Which JavaScript variable declaration is used when the assigned value is likely to change?",
        id: 3,
        choices: { a: "let", b: "var", c: "variable", d: "const" },
        answer: "a",
    },
    {
        question:
            "Which term in JavaScript can be used to describe a declared variable that has not yet been given a value?",
        id: 4,
        choices: { a: "null", b: "undefined", c: "typeError", d: "NaN" },
        answer: "b",
    },
    {
        question:
            "Which selector could refer to an HTML element with the class of 'sm-col'?",
        id: 5,
        choices: {
            a: "#sm-col",
            b: ".sm, .col",
            c: "[class~=col]",
            d: ".sm_col",
        },
        answer: "c",
    },
    {
        question:
            "Setting an element height to '10vh' bases the height calculation on _________",
        id: 6,
        choices: {
            a: "viewfinder height",
            b: "viewport width",
            c: "visible height",
            d: "viewport height",
        },
        answer: "d",
    },
    {
        question: "Which HTML5 property can be used for custom data?",
        id: 7,
        choices: { a: "data-", b: "-data-", c: "data=", d: "custom" },
        answer: "a",
    },
    {
        question:
            "Which HTML5 tag is used to define 'independent, self-contained content' within a web page?",
        id: 8,
        choices: { a: "<section>", b: "<main>", c: "<aside>", d: "<article>" },
        answer: "d",
    },
    {
        question:
            "Which of the following snippets does not result in a return value of 8?",
        id: 9,
        choices: {
            a: "8**1",
            b: "Math.pow(16, .75)",
            c: "2 * 2 * 'two'",
            d: "2**+'3'",
        },
        answer: "c",
    },
    {
        question:
            "Which of these statements is NOT true of browser-side JavaScript?",
        id: 10,
        choices: {
            a: "JavaScript can be used for functional programming.",
            b: "JavaScript can be used for file reading and writing on client machines.",
            c: "JavaScript does not require frameworks or libraries to be used.",
            d: "Though not class-based, JavaScript is an Object-Oriented Programming Language.",
        },
        answer: "b",
    },
];

// Event Listeners
document.addEventListener("DOMContentLoaded", initQuiz);
closePopup.addEventListener("click", closePopupFunc);
popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
        closePopupFunc();
    }
});
nxtBtn.addEventListener("click", handleNextQuestion);
resetQuizBtn.addEventListener("click", resetQuiz);

function initQuiz() {
    resetQuiz();
}

function showQuestion() {
    if (currentQuestion < quizData.length) {
        const questionData = quizData[currentQuestion];
        questionElement.innerText = questionData.question;
        questionNumber.innerText = `Question: ${questionData.id} / ${quizData.length}`;

        options.forEach((option, index) => {
            option.innerText =
                questionData.choices[Object.keys(questionData.choices)[index]];
            option.onclick = () =>
                selectAnswer(Object.keys(questionData.choices)[index]);
        });

        correctItems.style.display = "none";
        nxtBtn.disabled = true;
    } else {
        const message =
            score === quizData.length
                ? "Congratulations! 🎉 You scored 10/10!"
                : `Quiz Completed 😊! Your score is: ${score}/${quizData.length}`;

        openPopup(message);
    }
}

// Answer Select
function selectAnswer(selected) {
    const correctAnswer = quizData[currentQuestion].answer;
    correctItems.style.display = selected === correctAnswer ? "block" : "none";

    if (selected === correctAnswer) {
        score++;
        nxtBtn.disabled = false;
    } else {
        openPopup(
            `Wrong Answer 😔! Your score is: ${score}/${quizData.length}`
        );
        nxtBtn.disabled = true;
    }
}

function handleNextQuestion() {
    currentQuestion++;
    showQuestion();
}

// Popup Functions
function openPopup(message) {
    popupOverlay.style.display = "block";
    popupMessage.innerText = message;
}

function closePopupFunc() {
    popupOverlay.style.display = "none";
}

// Reset Quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
    closePopupFunc();
}

// Start the Quiz
resetQuiz();
