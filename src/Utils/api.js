// @flow
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_Data.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(function ([
    users,
    questions,
  ]) {
    return {
      users,
      questions,
    };
  });
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(question) {
  return _saveQuestionAnswer(question);
}
