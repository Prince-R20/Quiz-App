//Quiz app

//Fetch questions from JSON file
fetch('questions.json').then(response => {
    if(!response.ok){
        throw new Error("Faield to load questions");
    }
    return response.json().then(data => {
        console.log(data);
        quiz(data);
    })
    .catch(error => {console.error("Error fetching questions:", error)})
})

function quiz(data){
    const Quizdata = data;
    data.forEach(quiz => {
        console.log(quiz.Question) 
    });
}