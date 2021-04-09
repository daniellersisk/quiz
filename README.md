

## API Documentation

### **GET `/api/quizzes/:id`**
Returns a Quiz data object given a valid quiz ID. Quiz content is available in `data/quizzes.json` which you can use in your implementation.

**Request**

| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | A unique identifier for the quiz


**Response**

| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | A unique identifier for the quiz
| `title` | `String` | The human-readable title of the quiz
| `questions` | `Array<Question>` | An array of multiple choice questions


**`Question` Format**
| Key | Type | Description
| -- | -- | -- |
| `id` | `String` | An id for the question, unique to this quiz, e.g. "question_1"
| `text` | `String` | The text content of the question
| `options` | `Array<String>` | A list of multiple choice options

Example response:
```json
{
  "id": "example",
  "title": "My Quiz",
  "questions": [{
    "id": "question_1",
    "text": "What is 1 + 1?",
    "options": ["1", "2", "3"]
  }, {
    "id": "question_2",
    "text": "True or false: 2 + 2 = 4",
    "options": ["True", "False"]
  }]
}
```

### **POST `/api/quizzes/:id/attempt`**

Handles submitting a quiz attempt and returns a graded result showing which questions were correct and incorrect.

**Request**
| Key | Type | Description
| -- | -- | -- |
| `answers` | `{[id: String]: String}` | An object mapping ID of each question to the user-provided value

**Response**
| Key | Type | Description
| -- | -- | -- |
| `correct` | `Number` | Number of correct answers
| `incorrect` | `Number` | Number of incorrect answers
| `questions` | `{[id: String]: Boolean}` | An object mapping ID of each question to the graded result, where `true` represents a correct answer.

```json
// POST /api/quizzes/1/attempt
{
  "answers": {
    "question_1": "2",
    "question_2": "False"
  }
}

// Response
{
  "correct": 1,
  "incorrect": 1,
  "questions": {
    "question_1": true,
    "question_2": false,
  }
}
```


