//Quiz app
const intro = document.getElementById("intro");
const question_section = document.getElementById("question_section");
const question_number = document.getElementById("question_number");
const question = document.getElementById("question");
const question_option = document.getElementById("question_option")
//Fetch questions from JSON file
fetch('questions.json').then(response => {
    if(!response.ok){
        throw new Error("Faield to load questions");
    }
    return response.json().then(data => {
        Quiz(data);
    })
    .catch(error => {console.error("Error fetching questions:", error)})
})

function startQuiz(){
    intro.style.display = "none"
    question_section.style.display = "block"
}

function Quiz(data){
    question_number.textContent = `Question ${data[0].num}`
    const option = data[0].Option
    option.forEach(element => {
        const fieldSet = document.createElement("fieldSet");
        const input = document.createElement("input");
        const label = document.createElement("label");
        label.textContent = element;
        input.type = "checkbox"

        fieldSet.append(input);
        fieldSet.append(label);
        question_option.append(fieldSet);
    });
}