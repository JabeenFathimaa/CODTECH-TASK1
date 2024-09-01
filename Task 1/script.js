const quizData = [
    {
        question: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlinking Text Markdown Language"],
        answer: 1
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: 1
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["font-style", "color", "background-color", "text-color"],
        answer: 2
    },
    {
        question: "What is the purpose of the alt attribute in an <img> tag?",
        options: ["To specify the source of the image", "To link the image to a different page", "To provide alternative text if the image cannot be displayed", "To style the image"],
        answer: 3
    },
    {
        question: "Which of the following is not a valid value for the position property in CSS?",
        options: ["static", "absolute", "fixed", "relative"],
        answer: 4
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30; // Total quiz time in seconds
let timer;

const quizContainer = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option');
const nextBtn = document.getElementById('nextBtn');
const resultContainer = document.getElementById('result');
const scoreEl = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const timeEl = document.getElementById('time');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 30; // Reset the timer
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    resetState();
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerText = currentQuizData.question;
    optionButtons.forEach((button, index) => {
        button.innerText = currentQuizData.options[index];
    });
    updateProgressBar();
}

function resetState() {
    optionButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect', 'selected');
        button.disabled = false;
    });
    nextBtn.style.display = "none";
}

function startTimer() {
    timeEl.innerText = timeLeft; 
    timer = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

function selectOption(optionIndex) {
    const selectedAnswer = optionIndex;
    const correctAnswer = quizData[currentQuestion].answer;
    
    if (selectedAnswer === correctAnswer) {
        optionButtons[optionIndex - 1].classList.add('correct');
        score++;
    } else {
        optionButtons[optionIndex - 1].classList.add('incorrect');
        optionButtons[correctAnswer - 1].classList.add('correct');
    }
    optionButtons.forEach(button => button.disabled = true);
    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.innerText = `${score} out of ${quizData.length}`;
    clearInterval(timer); 

    
    const percentage = (score / quizData.length) * 100;
    let finalMessage;
    if (percentage === 100) {
        finalMessage = "Excellent work! You got all the answers right!";
    } else if (percentage >= 60) {
        finalMessage = "Good job! You scored well.";
    } else {
        finalMessage = "Better luck next time!";
    }
    document.getElementById('final-message').innerText = finalMessage;
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function restartQuiz() {
    clearInterval(timer); 
    startQuiz(); 
}

document.addEventListener('DOMContentLoaded', startQuiz);
