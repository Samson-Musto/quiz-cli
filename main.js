
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Management Language"
    ],
    answer: 1,
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  {
    question: "Which language is used to style web pages?",
    options: ["Python", "CSS", "Java", "SQL"],
    answer: 2,
    explanation: "CSS is used to style web pages."
  },
  {
    question: "Which keyword declares a variable that can change?",
    options: ["const", "fixed", "let", "static"],
    answer: 3,
    explanation: "The let keyword declares a variable that can change."
  },
  {
    question: "Which symbol is used for strict equality?",
    options: ["=", "==", "===", "!="],
    answer: 3,
    explanation: "The === operator checks value and type."
  },
  {
    question: "Which method adds an item to the end of an array?",
    options: ["pop()", "push()", "shift()", "slice()"],
    answer: 2,
    explanation: "The push() method adds an item to the end."
  },
  {
    question: "Which method selects an HTML element using a CSS selector?",
    options: [
      "querySelector()",
      "getStyle()",
      "selectHTML()",
      "findElement()"
    ],
    answer: 1,
    explanation: "querySelector() selects the first matching element."
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Data Object Method",
      "Document Object Model",
      "Digital Ordinance Model",
      "Document Orientation Method"
    ],
    answer: 2,
    explanation: "DOM stands for Document Object Model."
  },
  {
    question: "Which method converts JSON text into a JavaScript value?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.read()"
    ],
    answer: 2,
    explanation: "JSON.parse() converts JSON text into a JavaScript value."
  },
  {
    question: "What does an async function return?",
    options: [
      "Always a string",
      "A Promise",
      "Only undefined",
      "A Boolean"
    ],
    answer: 2,
    explanation: "An async function returns a Promise."
  },
  {
    question: "Which array method creates a new array by transforming items?",
    options: ["forEach()", "map()", "push()", "pop()"],
    answer: 2,
    explanation: "map() creates a new array from transformed items."
  }
];

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function startQuiz() {
  console.log("\n==============================");
  console.log("       SAMSON'S CODING QUIZ");
  console.log("==============================");
  console.log("Type START to begin or Q to quit.");

  const choice = (await ask("> ")).trim().toUpperCase();

  if (choice === "Q") {
    console.log("Thanks for visiting. Goodbye!");
    rl.close();
    return;
  }

  if (choice !== "START") {
    console.log("Invalid choice. Please type START or Q.");
    return startQuiz();
  }

  let score = 0;
  let answered = 0;
  const startTime = Date.now();
  const timeLimit = 90;

  console.log(`\nYou have ${timeLimit} seconds to complete the quiz.`);
  console.log("Enter the number of your answer.\n");

  const timer = setTimeout(() => {
    console.log("\nTime is up!");
    rl.close();
  }, timeLimit * 1000);

  for (let i = 0; i < questions.length; i++) {
    if (rl.closed) break;

    const current = questions[i];

    console.log(`\nQuestion ${i + 1}: ${current.question}`);

    current.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });

    const input = await ask("Your answer (1-4): ");

    if (rl.closed) break;

    const answer = Number(input.trim());

    if (!Number.isInteger(answer) || answer < 1 || answer > 4) {
      console.log("Invalid input. Please enter a number from 1 to 4.");
      i--;
      continue;
    }

    answered++;

    if (answer === current.answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Incorrect.");
    }

    console.log(current.explanation);
  }

  clearTimeout(timer);

  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const percentage = answered === 0
    ? 0
    : Math.round((score / answered) * 100);

  console.log("\n==============================");
  console.log("         QUIZ RESULTS");
  console.log("==============================");
  console.log(`Questions answered: ${answered}`);
  console.log(`Correct answers: ${score}`);
  console.log(`Incorrect answers: ${answered - score}`);
  console.log(`Final score: ${percentage}%`);
  console.log(`Time used: ${elapsedTime} seconds`);

  if (percentage >= 80) {
    console.log("Excellent work!");
  } else if (percentage >= 50) {
    console.log("Good effort! Keep practicing.");
  } else {
    console.log("Keep learning and try again if you fail to imrove your skills.");
  }

  rl.close();
}

startQuiz();
