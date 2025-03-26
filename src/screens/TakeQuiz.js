import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import QuizQuestion from "../components/UI/QuizQuestion";

import { questionsSet1, questionsSet2 } from "../components/lib/questions";

export default function TakeQuiz({ quizId, addRes, completeQuiz }) {

  const [questionId, setQuestionId] = useState(0);
  const [questions, setQuestions] = useState(
    quizId == 1 ? questionsSet1 : questionsSet2
  );
  const [question, setQuestion] = useState(questions[0]);
  const [selected, setSelected] = useState(-1);

  function nextQuestion() {
    if (questionId < 4) {
      setQuestionId((prev) => prev + 1);
    } else {
      // quiz completed
      completeQuiz();
    }
  }

  function selectOption(index) {
    setSelected(index);
  }

  useEffect(() => {
    setQuestion(questions[questionId]);
  }, [questionId]);



  return (
    <View style={styles.container}>
    <Text style={styles.questionText}>TakeQuiz</Text>
    <QuizQuestion
      questionId={questionId}
      question={question}
      nextQuestion={nextQuestion}
      selectOption={selectOption}
      selected={selected}
      addRes={addRes}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  questionContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "90%",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  optionsContainer: {
    width: "100%",
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  optionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#ff8c00",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
