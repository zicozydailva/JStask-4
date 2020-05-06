//assigning..
const question = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const options = Array.from(document.getElementsByClassName("options-text"));
//Declaring ...
let currentQuestion = {};
let answerStand = true;
let score = 0;
let questionTracker = 0;
let availQuests = [];
const pointPer = 10;
const totalQuestions = 5;


//...
let option1 = document.querySelector("#option-1");
let option2 = document.querySelector("#option-2");
let option3 = document.querySelector("#option-3");
let option4 = document.querySelector("#option-4");

//Questions
let questions = [
  {
    question:
      "Who hosted the 2010 FIFA world cup",
    option1: "Spain",
    option2: "Brazil",
    option3: "South Africa",
    option4: "Qatar",
    answer: 3,
  },
  {
    question: `Who's is the EPL all time top scorer?`,
    option1: " Sergio Kun-Aguero",
    option2: "Wayne Rooney",
    option3: "Dider Drogba",
    option4: "Alan Shearer",
    answer: 4,
  },
  {
    question:
      "Who's the first Nigerian to score for Manchester United?",
    option1: `Osazie Odewengie`,
    option2: `Victor Moses`,
    option3: `Obafemi Martins`,
    option4: `Odion Jude Ighalo`,
    answer: 4,
  },
  {
    question:
      "How many Ballon d'or have Lionel Messi won as at January 2020?",
    option1: "Five",
    option2: "Six",
    option3: "Seven",
    option4: "None",
    answer: 2,
  },
  {
    question:
      "Which football National team does Dele Alli represent?",
    option1: "England",
    option2: "Nigeria",
    option3: "Ghana",
    option4: "Italy",
    answer: 1,
  },
];


//Function to start game ...

startGame = () => {
  questionTracker = 0;
  score = 0;
  availQuests = [...questions];
  newQuestion();
};

//auto switch question..

newQuestion = () => {
  if (availQuests.length === 0 || questionTracker >= totalQuestions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("congrats.html");
  }

  questionTracker++;
  questionCounterText.innerText = `${questionTracker} of ${totalQuestions}`;

  const questionIndex = Math.floor(Math.random() * availQuests.length);
  currentQuestion = availQuests[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availQuests.splice(questionIndex, 1);

  answerStand = true;
};

//Event listener
options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!answerStand) return;

    answerStand = false;
    const chosenOption = e.target;
    const chosenAnswer = chosenOption.dataset["number"];

    const classToApply =
      chosenAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increaseScore(pointPer);
      chosenOption.parentElement.classList.add(classToApply);
    } else {
      chosenOption.parentElement.classList.add(classToApply);

      if (currentQuestion.answer === 1) {
        option1.classList.add("correct");
      } else if (currentQuestion.answer === 2) {
        option2.classList.add("correct");
      } else if (currentQuestion.answer === 3) {
        option3.classList.add("correct");
      } else if (currentQuestion.answer === 4) {
        option4.classList.add("correct");
      }
    }

    setTimeout(() => {
      option1.classList.remove("correct");
      option2.classList.remove("correct");
      option3.classList.remove("correct");
      option4.classList.remove("correct");
      chosenOption.parentElement.classList.remove(classToApply);
      newQuestion();
    }, 500);
  });
});

nextButton.addEventListener("click", (event) => {
  newQuestion();
});

increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();