const {getQuizzes, getQuiz, postQuiz} = require('../routes');

const app = require('../index')
const agent = require('supertest')(app);


describe('GET `/api/quizzes`', () => {
  describe('getQuizzes', () => {
    it('returns a list of quizzes', async() => {
      const response = await agent
      .get('/api/quizzes')
      .expect(200);
      expect(reponse.body).to.have.length(2); 
      expect(false).toBeTruthy();
    });
  });

  describe('getQuiz /api/quizzes/:id', () => {
    it('returns the data for a quiz by its id', async () => {
 const response = await agent
.get(('/api/quizzes/math'))
.expect(200)
.expect(response.body['id']).to.equal('math')
      expect(false).toBeTruthy();
    });

    it('returns a 404 if the quiz cannot be found', async () => {
      const response = await agent
    .get('/api/quizzes/noschool')
    .expect(404)
      expect(false).toBeTruthy();
    });
  });

  describe('postQuiz /api/quizzes/:id/attempt', () => {
    it('returns the correct grades for the quiz', async () => {
      const response = await agent
      .get('/api/quizzes/math/attempt')
      .expect()
      expect(false).toBeTruthy();
    });
  });
});
console.log("postQuiz", postQuiz)
