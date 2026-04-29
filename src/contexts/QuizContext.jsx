import { createContext, useReducer,useEffect,useContext } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  //status:{loading,ready,error,active,finished}
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "dataRecived": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished": {
      const isThereHighscore =
        state.points > state.highscore ? state.points : state.highscore;
      return { ...state, status: "finished", highscore: isThereHighscore };
    }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );
  const question = questions.at(index);

  useEffect(function () {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataRecived", payload: data }))
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        maxPossiblePoints,
        questions,
        question,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz(){
    const context = useContext(QuizContext);
    if (context === undefined)
      throw new Error("quiz context was used out of QuizProvider");
    return context;
}

export { QuizProvider, useQuiz };
