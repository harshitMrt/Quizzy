import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function QuizQuestion({
  questionId,
  question,
  nextQuestion,
  selectOption,
  selected,
  addRes,
}) {
  const [submitted, setSubmitted] = useState(false);

  function submitAnswer() {
    if (selected === -1) {
      Alert.alert("Please select an option first");
      return;
    }

    setSubmitted(true);

    const res = {
      question: question.question,
      selectedResponse: question.options[selected],
      correctResponse: question.options[question.correctOption],
    };

    addRes(res);
  }

  return (
    <LinearGradient colors={["#005b44", "#00c9a7"]} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.questionTitle}>Question {questionId + 1} of 5</Text>
        <Text style={styles.questionText}>{question.question}</Text>

        <FlatList
          data={question.options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            let backgroundColor = "#fff";
            let textColor = "#333";
            let borderColor = "#ccc";
            let icon = ""; 
            if (submitted) {
              if (index === question.correctOption) {
                backgroundColor = "#4CAF50"; 
                textColor = "#fff";
                borderColor = "#4CAF50";
                icon = "✔"; 
              } else if (index === selected) {
                backgroundColor = "#E53935"; 
                textColor = "#fff";
                borderColor = "#E53935";
                icon = "✖"; 
              }
            } else if (selected === index) {
              backgroundColor = "#FFC107"; 
              textColor = "#000";
              borderColor = "#FFC107";
            }

            return (
              <TouchableOpacity
                style={[styles.optionButton, { backgroundColor, borderColor }]}
                onPress={() => !submitted && selectOption(index)}
                disabled={submitted}
              >
                <View style={styles.optionContainer}>
                  <Text style={[styles.optionText, { color: textColor }]}>{item}</Text>
                  {submitted && <Text style={[styles.iconText, { color: textColor }]}>{icon}</Text>}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: selected === -1 ? "#BDBDBD" : "#1976D2" },
          ]}
          onPress={() => {
            if (submitted) {
              nextQuestion();
              setSubmitted(false);
              selectOption(-1);
            } else {
              submitAnswer();
            }
          }}
          disabled={selected === -1}
        >
          <Text style={styles.submitButtonText}>{submitted ? "Next" : "Check Answer"}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "94%",
    borderRadius: 15,
    alignItems: "center",
    elevation: 6,
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 2,
    alignItems: "center",
    width: "100%",
    elevation: 3,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});