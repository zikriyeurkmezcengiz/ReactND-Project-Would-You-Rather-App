import { ANSWER_QUESTION } from "../Actions/questions";

export default function checker(store) {
  return function (next) {
    return function (action) {
      if (action.type === ANSWER_QUESTION) {
        const users = store.getState().users;
        const answers = Object.keys(users[action.authedUser].answers);
        if (answers.indexOf(action.qid) > -1) {
          return alert("Your can answer a question only once");
        }
      }
      return next(action);
    };
  };
}
