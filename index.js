//Quiz app
const intro = document.getElementById("intro");
const startQuiz = document.getElementById("startQuiz");
const question_section = document.getElementById("question_section");
const question_number = document.getElementById("question_number");
const question = document.getElementById("question");
const question_option = document.getElementById("question_option");
const previousQuestion = document.getElementById("previousQuestion");
const nextQuestion = document.getElementById("nextQuestion");
const navigate = document.getElementById("navigate");
const submit = document.getElementById("submit");
const scoreDiv = document.getElementById("scoreDiv");
const yourScore = document.getElementById("yourScore");
const questionNum = document.getElementById("questionNum");

let currentQuestionIndex = 0;
let track = currentQuestionIndex+1;
let score = 0;
let selectedOption = [];
let questionBank;
let ID;
let checked;

startQuiz.addEventListener("click", async () => {
    intro.style.display = "none";
    question_section.style.display = "block";

    questionBank = await fetchQuestion();
    loadQuestion(questionBank);

    nextQuestion.addEventListener("click",() => {
        next(questionBank)
    })
    previousQuestion.addEventListener("click",() => {
        previous(questionBank)
    })
});

function loadQuestion(bank){
    const currentQuestion = bank[currentQuestionIndex];

    question_number.textContent = `Question ${currentQuestion.num}`;
    question.textContent = currentQuestion.Question;

    question_option.textContent = "" //clear previous option

    loadOption(currentQuestion);
}

function loadOption(currentQuestion){
    const Options = currentQuestion.Options
    console.log(Options)
    Options.forEach(optionArray => {
        const fieldSet = document.createElement("fieldSet");
        const input = document.createElement("input");
        const label = document.createElement("label");

        label.htmlFor = optionArray.option
        label.textContent = optionArray.option;
        
        input.type = "radio";
        input.name = "check";
        input.checked = false
        input.id = label.htmlFor;
        input.className = "option";

        //if the option has been selected it will remain selected while navigating questions
        if(optionArray.checked == true){
            input.checked = true
        }

        input.addEventListener("click", () => {
            if(selectedOption[currentQuestionIndex] !== undefined){
                //iterating true the optionArray, if checked == is true, the optionArray == false
                Options.forEach( optionArray => {
                    if(optionArray.checked == true){
                        optionArray.checked = false;
                    };
                })

                selectedOption[currentQuestionIndex] = input.id;
                optionArray.checked = true;
            }else{
                selectedOption.push(input.id);
                optionArray.checked = true;
            }
            showSubmitButton();
            checkAnswer();
        })
        fieldSet.append(input);
        fieldSet.append(label);
        question_option.append(fieldSet);
    });
}

function next (questionBank){
    if(track <= questionBank.length){
        track++;
    }
    if(track < questionBank.length){
        // getAnswer(questionBank);
        // checkAnswer(questionBank)
        currentQuestionIndex++;
        loadQuestion(questionBank);
    }else if(track == questionBank.length){
        currentQuestionIndex++;
        loadQuestion(questionBank);
    }
}

function previous (questionBank){
    if(track > 1){
        track--
        currentQuestionIndex--;
        loadQuestion(questionBank);
        clearInterval(ID)
    }
}

function checkAnswer(){
    if (selectedOption[currentQuestionIndex] === questionBank[currentQuestionIndex].Answer){
        score++
    }
}

function showScore(){
    question_section.style.display = "none";
    submit.style.display = "none";

    scoreDiv.style.display = "block";
    yourScore.textContent = score;
    questionNum.textContent = questionBank.length;
}

function showSubmitButton(){
    switch (questionBank.length) {
        case selectedOption.length:
            ID = setTimeout(() => {
                submit.style.display = "block"
            }, 3000)
            break;
        default:
            break;
    }
}
//Fetch questions from JSON file
async function fetchQuestion (){
    try{
        const response = await fetch('questions.json');

        if(!response.ok){
            throw new Error("Failed to load questions");
        }
        return await response.json();
    }catch(error){
        console.error(error);
    }
}