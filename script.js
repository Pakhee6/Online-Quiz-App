let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let shuffledQuestions = [];

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");

const questions = [
  {question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], answer: "HyperText Markup Language"},
  {question: "Which language is used for styling web pages?", options: ["HTML", "jQuery", "CSS", "XML"], answer: "CSS"},
  {question: "Which is not a JavaScript framework?", options: ["Python Script", "JQuery", "Django", "NodeJS"], answer: "Django"},
  {question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "<!-- -->"], answer: "//"},
  {question: "Inside which HTML element do we put JavaScript?", options: ["<js>", "<script>", "<javascript>", "<code>"], answer: "<script>"},
  {question: "Which HTML attribute is used to define inline styles?", options: ["font", "styles", "class", "style"], answer: "style"},
  {question: "Which of the following is used to connect databases in web applications?", options: ["HTTP", "API", "SQL", "SMTP"], answer: "SQL"},
  {question: "Which tag is used to define an unordered list in HTML?", options: ["<ol>", "<li>", "<ul>", "<list>"], answer: "<ul>"},
  {question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: "Cascading Style Sheets"},
  {question: "Which JavaScript method is used to write content into an HTML document?", options: ["document.write()", "console.log()", "window.alert()", "innerHTML"], answer: "document.write()"}
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  shuffledQuestions = shuffleArray([...questions]); 
  currentQuestion = 0;
  score = 0;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("time").textContent = timeLeft;

  const question = shuffledQuestions[currentQuestion];
  document.getElementById("question-text").textContent = question.question;

  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";

  const shuffledOptions = shuffleArray([...question.options]);
  shuffledOptions.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(option, question.answer);
    optionsList.appendChild(li);
  });

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  document.getElementById("timer-bar").style.width = "100%";

  const feedback = document.getElementById("feedback");
  feedback.classList.add("hidden");
  feedback.textContent = "";

  startTimer();
}

function checkAnswer(selected, correct) {
  clearInterval(timer);

  const options = document.querySelectorAll("#options li");
  const feedback = document.getElementById("feedback");
  feedback.classList.remove("correct", "wrong");

  options.forEach(li => {
    if (li.textContent === correct) {
      li.style.background = "green";
      li.style.color = "white";
    }
    if (li.textContent === selected && li.textContent !== correct) {
      li.style.background = "red";
      li.style.color = "white";
    }
    li.style.pointerEvents = "none";
  });

  if (selected === correct) {
    score++;
    feedback.textContent = "Correct! ";
    feedback.classList.add("correct");
  } else {
    feedback.textContent = `Wrong! Correct answer: ${correct}`;
    feedback.classList.add("wrong");
  }

  feedback.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

function startTimer() {
  const timerBar = document.getElementById("timer-bar");
  const totalTime = 15;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    const width = (timeLeft / totalTime) * 100;
    timerBar.style.width = width + "%";

    if (timeLeft <= 0) {
      clearInterval(timer);
      const options = document.querySelectorAll("#options li");
      options.forEach(li => li.style.pointerEvents = "none");
      nextBtn.classList.remove("hidden");

      const feedback = document.getElementById("feedback");
      feedback.textContent = `Time's up! Correct answer: ${shuffledQuestions[currentQuestion].answer}`;
      feedback.classList.add("wrong");
      feedback.classList.remove("hidden");
    }
  }, 1000);
}

function showResult() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("score-text").textContent = `Your Score: ${score} / ${shuffledQuestions.length}`;
}

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
});

