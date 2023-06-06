/** Wait for the DOM to finish loading the page before running the game */
document.addEventListener("DOMContentLoaded", startGame);

/** Variables */
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


/** Starts the game*/
function startGame(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//the code was taken from youtube channel: https://shorturl.at/hrIV9
/** Shows questions and answers from the question list. Add event listeners to answers buttons */
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", checkAnswer);
        });
}

/** Reset the privious questions */
function resetState() {        
        
        while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/** Checks the answer from the questions list and changes the color(with css).
 * Array.from will check the data set and changes the button color depend on anwser
*/
function checkAnswer(e) {
    const selectedBtn = e.target;
    const answerCorrect =  selectedBtn.dataset.correct === "true";
    if(answerCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    
    

}

startGame();