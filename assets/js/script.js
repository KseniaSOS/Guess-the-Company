/** Wait for the DOM to finish loading the page before running the game */
document.addEventListener("DOMContentLoaded", startGame);

/** Constants */
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.getElementById("play-again-btn");
const numGameQuestions = 10;

/** Variables */
let score = document.getElementById("score");
let currentQuestionIndex = 0;
let shuffledQuestions;

/** shuffle array based on the Fisher-Yates algorithm (used modified code) https://shorturl.at/hqSZ3*/
function shuffle(array) {
    let shuffledArray = array;
    for (let i = shuffledArray.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
    }
    return shuffledArray;
}

/** Starts the game*/
function startGame(){
    // initialize variables
    currentQuestionIndex = 0;
    score = 0;
    setScore(score);
    // randomly shuffle the questions array
    shuffledQuestions = shuffle(questions);
    shuffledQuestions = shuffledQuestions.slice(0, numGameQuestions);
    showQuestion(currentQuestionIndex);
    currentQuestionIndex++; 
    nextButton.style.display = "none";
    playAgainButton.style.display = "none";
}

//the code was taken  and modified from youtube channel: https://shorturl.at/hrIV9
/** Shows random questions with answers from the question list. Add event listeners to answers buttons */
function showQuestion(questionIndex){
    resetState();
    let currentQuestion = shuffledQuestions[questionIndex];
    let questionNo = questionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;
    setQuestionIdx(questionIndex);

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


/** Reset the previous questions */
function resetState() {        
        nextButton.style.display = "none";
        while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

/** Checks the answer from the questions list and changes the color(with css).
 * Array.from will check the data set and changes the button color depend on anwser.
 * Calculates the score if correct.
*/
function checkAnswer(e) {
    const selectedBtn = e.target;
    const answerCorrect =  selectedBtn.dataset.correct === "true";
    if(answerCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        setScore(score);
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        nextButton.style.display = "block";
    }); 
           
}


/** displays the score when all questions were processed*/
function showScore(){
    resetState();
    questionElement.innerHTML = `WELL DONE! You scored ${score} out of ${numGameQuestions}!`;
    nextButton.style.display = "none";
    playAgainButton.style.display = "block";
}


 /** set the current score in the DOM */
function setScore(inputScore) {
    document.getElementById("score").innerText = inputScore;
}

 /** set the current question index in the DOM */
 function setQuestionIdx(idx) {
    document.getElementById("question-num").innerText = `${idx + 1}/${numGameQuestions}`;
}


/** Add event listeners to next button. Checks if all questions are displayed, than restart a new game  */
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < numGameQuestions){
        showQuestion(currentQuestionIndex);
        currentQuestionIndex++;        
    } else{
        showScore();
    }
})

/** Add event listeners to the play again button.  */
playAgainButton.addEventListener("click", ()=>{
    startGame();
})

startGame();