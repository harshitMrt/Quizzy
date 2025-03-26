import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function ResultScreen({ quizres, goToHome, correctCount, setCorrectCount }) {

  useEffect(() => {
    if (!quizres) {
      goToHome();
    }

    let count;
  count = 0;


    quizres.map((item) => {
      if (item.selectedResponse == item.correctResponse) {
        count++;
      }
    });

    
    setCorrectCount(count);

    
  }, []);

  

  function handleHomePress() {
    goToHome();
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>Your Score</Text>
        <Text style={styles.score}>{correctCount} / 5</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleHomePress}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: "#B0B0B0",
    justifyContent: "center",
    alignItems: "center",
  },
  resultBox: {
    backgroundColor: "#3A3F4B",
    paddingVertical: 40,
    paddingHorizontal: 60,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  resultText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  score: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFD700",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});