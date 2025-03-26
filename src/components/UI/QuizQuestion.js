import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons for tick and cross

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
            let icon = null;

            if (submitted) {
              if (index === question.correctOption) {
                backgroundColor = "#4CAF50"; // Green for correct answer
                textColor = "#fff";
                borderColor = "#4CAF50";
                icon = <MaterialIcons name="check-circle" size={24} color="white" />;
              } else if (index === selected) {
                backgroundColor = "#E53935"; // Red for incorrect answer
                textColor = "#fff";
                borderColor = "#E53935";
                icon = <MaterialIcons name="cancel" size={24} color="white" />;
              }
            } else if (selected === index) {
              backgroundColor = "#FFC107"; // Yellow highlight before submission
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
                  {icon}
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

      <View style={styles.referenceBox}>
        <Text style={styles.referenceText}>
          For reference of Visually Impaired {"( People with color blindness )"}
        </Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "green" }]}></View>
            <Text>Correct</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "red" }]}></View>
            <Text>Incorrect</Text>
          </View>
        </View>
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
  referenceBox: {
    position: "absolute",
    bottom: 10,
    alignItems: "center",
  },
  referenceText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
  },
});