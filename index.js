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
const submit = document.getElementById("submit")

let currentQuestionIndex = 0;
let track = currentQuestionIndex+1;
// let score = 0;
let selectedOption = [];
let questionBank;
let ID;

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
    const option = currentQuestion.Option
    
    option.forEach(element => {
        const fieldSet = document.createElement("fieldSet");
        const input = document.createElement("input");
        const label = document.createElement("label");

        label.htmlFor = element
        label.textContent = element;
        
        input.type = "radio";
        input.name = "check";
        input.id = label.htmlFor;
        input.className = "option"
        input.addEventListener("click", () => {
            if(selectedOption[currentQuestionIndex] !== undefined){
                selectedOption.pop(input.id)
            }
            selectedOption.push(input.id)
            console.log(selectedOption)
        })

        fieldSet.append(input);
        fieldSet.append(label);
        question_option.append(fieldSet);
    });
}
function next (questionBank){
    track++;
    console.log(track)
    if(track < questionBank.length){
        // getAnswer(questionBank);
        // checkAnswer(questionBank)
        currentQuestionIndex++;
        loadQuestion(questionBank);
    }else if(track == questionBank.length){
        currentQuestionIndex++;
        loadQuestion(questionBank);

        ID = setTimeout(() => {
            submit.style.display = "block"
            nextQuestion.style.display = "none"
            previousQuestion.style.display = "none"
        }, 5000)
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

function checkAnswer(questionBank){
    
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