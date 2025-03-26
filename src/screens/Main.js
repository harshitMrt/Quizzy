import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import TakeQuiz from "./TakeQuiz";
import ResultScreen from "./ResultScreen";

export default function Main() {
  // quiz will have three states start, inprogress, completed
  const [quizState, setQuizState] = useState("start");
  const [correctCount, setCorrectCount] = useState(0);
  const [quizId, setQuizId] = useState(0);

  // quizrez has three properties question , selected res, correct res
  const [quizres, setQuizres] = useState([]);

  function startQuiz(quiz) {
    setQuizState("inprogress");
    setQuizId(quiz);
  }

  function completeQuiz() {
    setQuizState("completed");
  }

  function goToHome() {
    setQuizState("start");
    setCorrectCount(0); 
  }

  useEffect(() => {

    if(quizState == 'start') {
      setQuizres([])
    }

  }, [quizState])



  function addRes(res) {
    setQuizres((prev) => {
      return [...prev, res];
    });
  }

  return (
    <View>
      {quizState == "start" && <WelcomeScreen startQuiz={startQuiz} />}
      {quizState == "inprogress" && quizId != 0 && (
        <TakeQuiz
          quizId={quizId}
          addRes={addRes}
          completeQuiz={completeQuiz}
          goToHome={goToHome}
        />
      )}
      {quizState == "completed" && (
        <ResultScreen quizres={quizres} goToHome={goToHome} correctCount={correctCount} setCorrectCount={setCorrectCount} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});