let currentQuestionIndex = 0;
let userAnswers = [''];

const questionTextElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result');
const resultTextElement = document.getElementById('showResult');

const questions = [
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets"],
      answer: "Cascading Style Sheets",
    },
    {
      question: "Which programming language is often used for web development?",
      options: ["Java", "Python", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "High-level Text Markup Language"],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "What is the purpose of the 'git clone' command?",
      options: ["To create a new Git repository", "To make a copy of an existing repository", "To commit changes to a repository"],
      answer: "To make a copy of an existing repository",
    },
    {
      question: "In Python, which of the following is used to comment a single line?",
      options: ["// This is a comment", "# This is a comment", "/* This is a comment */"],
      answer: "# This is a comment",
    },
    {
      question: "What is the result of the expression '5 + '5'' in JavaScript?",
      options: ["55", "10", "'55'"],
      answer: "'55'",
    },
    {
      question: "What is the purpose of the SQL SELECT statement?",
      options: ["To insert data into a database", "To update existing data in a database", "To retrieve data from a database"],
      answer: "To retrieve data from a database",
    },
  ];

function startQuiz() {
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = questions[index];
    questionTextElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('clickNext');
        button.addEventListener(
            'click', () => selectAnswer(option));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    // event.preventDefault();
    userAnswers[currentQuestionIndex] = answer;
    const buttons = document.querySelectorAll('.clickNext');
    buttons.forEach(button => button.disabled = true);
    nextButton.style.display = 'block';
    nextQuestion()
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
        resetButtons();
        nextButton.style.display = 'none';
    } else {
        showResult();
    }
}

function resetButtons() {
    const buttons = document.querySelectorAll('.clickNext');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

function showResult() {
    const score = calculateScore();
    resultTextElement.innerText = `Your score is ${score} out of ${questions.length}.`;
    resultContainer.style.display = 'block';
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

startQuiz();