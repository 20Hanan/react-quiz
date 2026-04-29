import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainComponent from "./MainComponent";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import RestartButton from "./RestartButton";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../contexts/QuizContext";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <MainComponent className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />

            <Question />
            <Footer>
              <Timer />
            </Footer>
            <NextButton />
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen />
            <RestartButton />
          </>
        )}
      </MainComponent>
    </div>
  );
}

export default App;
