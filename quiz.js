//Storing HTML Elements
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('results');
const reviewButton = document.getElementById('review');
const resultsContainer = document.getElementById('correct');

//DISPLAY QUESTIONS OF THE QUIZ
//Create an Array of Questions - Javascript Array of Objects (JSON) 
//More Questions can be added to the quiz(in the future) by adding an object to the array in the format specified 
var myQuestions = [
    {
        question: "Which of the following is the capital of Arunachal Pradesh?",
        answers: {
            a: 'Itanagar',
            b: 'Dispur',
            c: 'Imphal',
            d: 'Panaji'
        },
        correctAnswer: 'a',
        correctAnswerDesc : 'Itanagar'
    },
    {
        question: "Which is the largest coffee producing state of India?",
        answers: {
            a: 'Kerala',
            b: 'Tamil Nadu',
            c: 'Karnataka',
            d: 'Assam'
        },
        correctAnswer: 'c',
        correctAnswerDesc : 'Karnataka'
    },
    {
        question: "The lead character in the film 'The Bandit Queen' has been played by :",
        answers: {
            a: 'Rupa Ganguly',
            b: 'Neena Gupta',
            c: 'Shabana Azmi',
            d: 'Seema Biswas'
        },
        correctAnswer: 'd',
        correctAnswerDesc : 'Seema Biswas'
    },
    {
        question: "Who is the first Indian woman to win an Asian Games gold in 400m run?",
        answers: {
            a: 'M.L.Valsamma',
            b: 'P.T.Usha',
            c: 'Kamaljit Sandhu',
            d: 'K.Malleshwari'
        },
        correctAnswer: 'c',
        correctAnswerDesc : 'Kamaljit Sandhu'
    },
    {
        question: "Who is the father of Geometry?",
        answers: {
            a: 'Aristotle',
            b: 'Euclid',
            c: 'Pythagoras',
            d: 'Kepler'
        },
        correctAnswer: 'b',
        correctAnswerDesc : 'Euclid'
    },
    {
        question: "Which of the following actors had not won a national award?",
        answers: {
            a: 'Kangana Ranaut',
            b: 'Vicky Kaushal',
            c: 'Akshay Kumar',
            d: 'Ranveer Singh'
        },
        correctAnswer: 'd',
        correctAnswerDesc : 'Ranveer Singh'
    }
];

//CREATE QUIZ (Questions + Options)
function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    //For each question
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        //Variable to store Options
        const answers = [];
  
        //For each option
        for(letter in currentQuestion.answers){
  
          //Adding HTML radio button
          answers.push(
            `<label class="options">
              <input class="form-check-input" type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label><br>`
          );
        }
  
        //Adding current question and its options to the output + Div for displaying correct answer and letting the user know if his/
        //her answer was correct
        output.push(            
          `<div class="question"> ${currentQuestion.question} </div> 
          <div class="userResultCorr">Yay! Your answer is correct!</div>
          <div class="userResultIncorr">Oops! Your answer is incorrect!</div>                  
          <div class="answers"> ${answers.join('')} </div>
          <div class="reviewAns"> Correct Answer : ${currentQuestion.correctAnswer}  - ${currentQuestion.correctAnswerDesc} </div>`
        );
      }
    );
  
    //Combining output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

///DISPLAY RESULTS
function showResults(){
    //Obtaining Users answers
  const answerContainers = quizContainer.querySelectorAll('.answers');
  
  // Counting correct Answers
  let numCorrect = 0;

  //For each question
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    //Find answer selected by user
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    console.log(userAnswer);
    
    //Displaying the result Only if all the questions have been attempted
    if(userAnswer != "a" && userAnswer != "b" && userAnswer != "c" && userAnswer != "d"  ){
        alert("Need to attempt all the questions. Please reload the page to attempt the quiz again.");       
    }else{
        // Increement count of correct answer if the answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
         } 
        //Show number of correct answers out of total on the Modal
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        //Enable Review Button Only after the User has answered all the question and viewed their results
        document.getElementById("reviewBtn").disabled = false;
    }    
  });
}

//REVIEW THE QUIZ - Display correct option and answer below each question
function showReview(){
    //Viewing the Correct answers
    let myElements = document.querySelectorAll(".reviewAns");
    //Displaying each div which contains the correct answer
    for (let i = 0; i < myElements.length; i++) {
        myElements[i].style.display = "block";
    }  

    //Displaying if User's answer was Correct/Incorrect
    var j = 0;
    let resultStoreCorr = document.querySelectorAll(".userResultCorr");
    console.log(resultStoreCorr);
    let resultStoreIncorr = document.querySelectorAll(".userResultIncorr");
    console.log(resultStoreIncorr);
    //console.log(resultStore);
    myQuestions.forEach( (currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainers = quizContainer.querySelectorAll('.answers');
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
            //Displaying 'Answer is correct' 
           resultStoreCorr[j].style.display = "block";            
          }
          // if answer is wrong
          else{
            //Displaying 'Answer is incorrect' 
            resultStoreIncorr[j].style.display = "block";            
         } 
         j = j+1;

}); 
}

