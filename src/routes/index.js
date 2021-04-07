const quizzes = require('../../data/quizzes.json');
const fetch = require("node-fetch"); 
// const axios = require('axios');

/**
 * Returns a list of quizzes with titles and IDs
 */
async function getQuizzes(req, res, next) {
  res.json(quizzes)
}

/** 
 * Returns quiz data for the given ID, omitting the answers
 */
async function getQuiz(req, res, next) {
  let subject = req.params.id; 
  if(!quizzes[subject]){
    res.sendStatus(404)
  } else{
    res.json(quizzes[subject])
  }
}

/**
 * Handles a quiz submission and returns a graded result
 */
async function postQuiz(req, res, next) {
let incorrect = []; 
let incorrectCount = 0; 
let correctcCount = 0; 
let subjectRequest = req.params.id; 
 let questionsArray = quizzes[subjectRequest].questions // array of question/answer objs 
//  for(let i = 0; i < questionsArray.length; i++){
//    // compare questionsarray in json to request info
   
//  }
// loop through array of objects to get each object 
// eahx cobject need to access certaun props 

if(!quizzes[subjectRequest]){
  res.sendStatus(404)
} else{
     console.log(req.body)
}

}
//
// find  quiz by subject in my json 
// map over quiz.questions in json and match qiuestins by quetion id. answer 
// if answer is rright then increase correct count 
// if anser is incorrect then increase incorrect count and add answwer to incorrect object with 
// key as question and value as answer.
// return response when mappin gis complete 





//   "answers": {
//     "question_1": "2",
//     "question_2": "False"
//   }
// }



// Response
// {
//   "correct": 1, // return number of correc 
//   "incorrect": 1,
//   "questions": {
//     "question_1": true,
//     "question_2": false,
//   }
// }
  // TODO: Your code goes here


module.exports = {
  getQuizzes,
  getQuiz,
  postQuiz,
};
