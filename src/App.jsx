import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Loading from "./components/Loading";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import data from "../data/questions.json";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const TIME_BER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "active":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * TIME_BER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return {
        ...state,
        answer: null,
        index:
          state.index < state.questions.length - 1
            ? state.index + 1
            : state.index,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "resit":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };
    default:
      throw new Error("unknown action.");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { status, questions, index, answer, points, secondsRemaining } = state;

  const numQuestions = questions.length;
  const totalPointes = questions.reduce((acc, cur) => cur.points + acc, 0);

  useEffect(() => {
    // fetch("http://localhost:8000/questions")
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //   .catch((err) => dispatch({ type: "dataFailed" }));

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
    promise
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));

    // dispatch({ type: "dataReceived", payload: data });
  }, []);
  return (
    <div className="bg-gray-950 w-full h-screen text-white px-8">
      <Header />
      <main className="max-w-screen-md mx-auto">
        {status === "active" && (
          <Progress
            numQuestions={numQuestions}
            index={index}
            currentPoints={points}
            totalPointes={totalPointes}
            answer={answer}
          />
        )}
        {status === "loading" && <Loading />}
        {status === "error" && <div>loading...</div>}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            numQuestions={numQuestions}
            index={index}
            secondsRemaining={secondsRemaining}
          />
        )}
        {status === "finished" && (
          <FinishScreen
            totalPointes={totalPointes}
            points={points}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}

export default App;
