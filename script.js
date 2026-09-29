let savedCards = localStorage.getItem("flashcards");

let cards = savedCards
    ? JSON.parse(savedCards)
    : [
        {
            question: "What is JavaScript?",
            answer: "JavaScript is a programming language used to make websites interactive."
        },
        {
            question: "What is HTML?",
            answer: "HTML is used to create the structure of a web page."
        },
        {
            question: "What is CSS?",
            answer: "CSS is used to style and design a web page."
        }
    ];

let currentCard = 0;
let editMode = false;


// HTML Elements
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const counter = document.getElementById("counter");

const showAnswer = document.getElementById("showAnswer");
const previous = document.getElementById("previous");
const next = document.getElementById("next");

const addCard = document.getElementById("addCard");
const editCard = document.getElementById("editCard");
const deleteCard = document.getElementById("deleteCard");

const cardForm = document.getElementById("cardForm");
const formTitle = document.getElementById("formTitle");

const newQuestion = document.getElementById("newQuestion");
const newAnswer = document.getElementById("newAnswer");

const saveCard = document.getElementById("saveCard");
const cancelCard = document.getElementById("cancelCard");

const darkModeToggle = document.getElementById("darkModeToggle");


// Save Cards
function saveCards() {
    localStorage.setItem("flashcards", JSON.stringify(cards));
}


// Show Current Card
function showCard() {

    question.textContent = cards[currentCard].question;

    answer.textContent = cards[currentCard].answer;

    answer.classList.add("hidden");

    showAnswer.textContent = "Show Answer";

    counter.textContent =
        `${currentCard + 1} / ${cards.length}`;
}


// Show / Hide Answer
showAnswer.addEventListener("click", function () {

    answer.classList.toggle("hidden");

    if (answer.classList.contains("hidden")) {

        showAnswer.textContent = "Show Answer";

    } else {

        showAnswer.textContent = "Hide Answer";
    }
});


// Next Card
next.addEventListener("click", function () {

    if (currentCard < cards.length - 1) {

        currentCard++;

        showCard();
    }
});


// Previous Card
previous.addEventListener("click", function () {

    if (currentCard > 0) {

        currentCard--;

        showCard();
    }
});


// Add Card
addCard.addEventListener("click", function () {

    editMode = false;

    formTitle.textContent = "Add New Flashcard";

    newQuestion.value = "";
    newAnswer.value = "";

    cardForm.classList.remove("hidden");
});


// Edit Card
editCard.addEventListener("click", function () {

    editMode = true;

    formTitle.textContent = "Edit Flashcard";

    newQuestion.value = cards[currentCard].question;
    newAnswer.value = cards[currentCard].answer;

    cardForm.classList.remove("hidden");
});


// Delete Card
deleteCard.addEventListener("click", function () {

    if (cards.length === 1) {

        alert("You cannot delete the last card.");

        return;
    }

    const confirmDelete =
        confirm("Are you sure you want to delete this card?");

    if (confirmDelete) {

        cards.splice(currentCard, 1);

        if (currentCard >= cards.length) {

            currentCard = cards.length - 1;
        }

        saveCards();

        showCard();
    }
});


// Save Card
saveCard.addEventListener("click", function () {

    const questionText =
        newQuestion.value.trim();

    const answerText =
        newAnswer.value.trim();


    if (questionText === "" || answerText === "") {

        alert("Please enter both question and answer.");

        return;
    }


    if (editMode === true) {

        cards[currentCard].question =
            questionText;

        cards[currentCard].answer =
            answerText;

    } else {

        cards.push({

            question: questionText,

            answer: answerText

        });

        currentCard = cards.length - 1;
    }


    newQuestion.value = "";

    newAnswer.value = "";

    cardForm.classList.add("hidden");

    saveCards();

    showCard();
});


// Cancel
cancelCard.addEventListener("click", function () {

    newQuestion.value = "";

    newAnswer.value = "";

    cardForm.classList.add("hidden");
});


// Dark Mode
darkModeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        darkModeToggle.textContent = "☀️ Light Mode";

        localStorage.setItem("darkMode", "enabled");

    } else {

        darkModeToggle.textContent = "🌙 Dark Mode";

        localStorage.setItem("darkMode", "disabled");
    }
});


// Remember Dark Mode after Refresh
if (localStorage.getItem("darkMode") === "enabled") {

    document.body.classList.add("dark-mode");

    darkModeToggle.textContent = "☀️ Light Mode";
}


// Start App
showCard();