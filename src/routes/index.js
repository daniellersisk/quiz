const quizzes = require('../../data/quizzes.json');
const fetch = require("node-fetch"); 
// const axios = require('axios');

/**
 * Returns a list of quizzes with titles and IDs
 */
async function getQuizzes(req, res, next) {
  let allQuizzesList = []; 
  for(const key in quizzes){
   let quizObject = {'title': quizzes[key]['title'], 'id': quizzes[key]['id']}
     allQuizzesList.push(quizObject)

  }
  res.json(allQuizzesList)
}

/** 
 * Returns quiz data for the given ID, omitting the answers
 */
async function getQuiz(req, res, next) {
  let subject = req.params.id; 
  
  if(!quizzes[subject]){
    res.send("No quiz found with that subject")
  } else{
    let quizObject = {"id":subject, "title": quizzes[subject]['title'], "questions":[]}; 
    let questionsArray = quizzes[subject]['questions'] // loop through the array and grab each object 
    // res.json(quizzes[subject])
    for(let i = 0; i < questionsArray.length; i++){
      let  eachQuestion = questionsArray[i];  // will be pushed to array when filled 
      let questionObj = {"id":eachQuestion["id"], "text": eachQuestion['text'],"options": eachQuestion['options'] };
      quizObject['questions'].push(questionObj)

    }
 res.json(quizObject)  
}
}

/**
 * Handles a quiz submission and returns a graded result
 */
async function postQuiz(req, res, next) {
let incorrectCount = 0; 
let correctCount = 0; 
let correctAnswerArray = []; //[ 'True', 'Dangling participle', 'their' ]
let clientAnswerArray = []; 
let subjectRequest = req.params.id; 
if(!quizzes[subjectRequest]){
  res.send("Please enter a valid quiz subject")
  return; 
}
 let questionsArray = quizzes[subjectRequest].questions // correct question/answer objects 
 let questionsObject = {}; 
 let clientResponse = req.body['answers'] //{ question_1: '1', question_2: 'true' }  

 for(let i = 0; i < questionsArray.length; i++){
let eachQuestionObject = questionsArray[i] // each question object
// make prop of each question object in questionsobject, make value equal to answer 
questionsObject[eachQuestionObject['id']] = eachQuestionObject['answer']

let correctAnswer = eachQuestionObject['answer'] //(true, dangling participle, their) // also consider if array lengths are different 
correctAnswerArray.push(correctAnswer)
 }

 for(const key in clientResponse){
   let clientAnswer = clientResponse[key] // each client answer from 1 - n  (1, true, false); 
   clientAnswerArray.push(clientAnswer)
 }


// loop through both arrays with a for loop and compare values at each iteration 

if(clientAnswerArray.length == correctAnswerArray.length){ 
for(let i = 0; i <= clientAnswerArray.length-1; i++){
  // console.log(correctAnswerArray[i])
    if(clientAnswerArray[i].toLowerCase() == correctAnswerArray[i].toLowerCase()){ 
      correctCount++;       
    } else{
      incorrectCount++; 
    }
}
} else {
  res.send("please correct the number of questions submitted")
}
// questions should be an object with question number as val answers as keys 
if(correctCount + incorrectCount === correctAnswerArray.length){
 let reponseObject = 
 {"correct": correctCount,
 "incorrect": incorrectCount, 
 "questions": questionsObject, 
} 

if(!quizzes[subjectRequest]){
  res.sendStatus(404)
} else {
  res.json(reponseObject)
}
} 

}

module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
