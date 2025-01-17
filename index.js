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
let track = 1;
let score = 0;
let selectedOption = []; //the user option is saved here
let questionBank;
let checked;

startQuiz.addEventListener("click", async () => {
    intro.style.display = "none";
    question_section.style.display = "block";

    questionBank = await fetchQuestion();
    loadQuestion(questionBank);

    selectedOption.length = questionBank.length; //defining the size of the array
    selectedOption.fill(null) //filling the array with null at initial

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

        fieldSet.append(input);
        fieldSet.append(label);
        question_option.append(fieldSet);

        input.addEventListener("click", () => {
            optionSelection(Options, input, optionArray) //Function to add option, and change option
            showSubmitButton(); //Shows button when all question has been attempted
        })
    });
}

//Function to select options and more
function optionSelection(Options, input, optionArray){
    //Going through option, if any option is checked true set it to false. This is to switch options 
    Options.forEach(optionArray => {
        if(optionArray.checked == true){
            optionArray.checked = false;
        };
    })

    selectedOption[currentQuestionIndex] = input.id; //adding the selected option to the array at its given index
    optionArray.checked = true; //setting the checked property to true when selected
}

function next (questionBank){
    
    if(track < questionBank.length){
        track++;
        currentQuestionIndex++;

        loadQuestion(questionBank);
    }
}

function previous (questionBank){
    if(track > 1){
        track--
        currentQuestionIndex--;
        loadQuestion(questionBank);
    }
}

function checkAnswer(){
    selectedOption.forEach(option =>{
        if(option === questionBank[selectedOption.indexOf(option)].Answer){
            score++
        }
    })
}

function showScore(){
    checkAnswer(); //Function to check answer and add score
    question_section.style.display = "none";
    submit.style.display = "none";

    scoreDiv.style.display = "block";
    yourScore.textContent = score;
    questionNum.textContent = questionBank.length;
}

function showSubmitButton(){
   if(!selectedOption.includes(null)){
        switch (questionBank.length) {
            case selectedOption.length:
                setTimeout(() => {
                    submit.style.display = "block"
                }, 0)
                break;
        }
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