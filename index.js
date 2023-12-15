let currentQuestionIndex = 0;
let userAnswers = [''];

const questionTextElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result');
const resultTextElement = document.getElementById('showResult');

const questions = [
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'Berlin', 'London'],
        correctAnswer: 'Paris'
    },
    {
        question: 'Which programming language is used for web development?',
        answers: ['Java', 'Python', 'JavaScript'],
        correctAnswer: 'JavaScript'
    }
];

function startQuiz() {
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const question = questions[index];
    questionTextElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';

    question.answers.forEach(option => {
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
        if (userAnswers[i] === questions[i].correctAnswer) {
            score++;
        }
    }
    return score;
}

startQuiz();