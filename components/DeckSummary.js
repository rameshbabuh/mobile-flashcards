import React from "React"
import { StyleSheet, Text, View } from "react-native"
import { gray } from "../utils/colors"

const DeckSummary = ({ deck }) => {
  return (
    <View style={[styles.deck, { backgroundColor: deck.color }]}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.total}>{deck.questions.length} card(s)</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    padding: 15
  },
  title: {
    fontSize: 28,
    textAlign: "center"
  },
  total: {
    fontSize: 20,
    color: gray,
    textAlign: "center"
  }
}) 

export default DeckSummary
