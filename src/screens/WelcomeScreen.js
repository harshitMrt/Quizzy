import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;

export default function WelcomeScreen({ startQuiz }) {
  return (
    <LinearGradient colors={["#0089ba", "#0081cf"]} style={styles.container}>
      <View style={styles.introContainer}>
        <Text style={styles.logo}>Quizzy</Text>
        <Text style={styles.intro}>
          Test your knowledge with our fun and interactive quiz game! Choose a
          quiz, answer exciting questions, and see your score at the end. Ready
          to play? 🚀
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => startQuiz(1)}>
          <Text style={styles.buttonText}>Take Quiz 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => startQuiz(2)}>
          <Text style={styles.buttonText}>Take Quiz 2</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  introContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 200,
    fontSize: 40,
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  intro: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#ff8c00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});