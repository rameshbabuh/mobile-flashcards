import React, { Component } from "react"
import { Text, View, TouchableOpacity, StyleSheet, Animated } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { connect } from "react-redux"
import { white, green, red, bblue } from "../utils/colors"

class Question extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params.deck

    return {
      title: title + " Question"
    }
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()

      this.setState(() => ({
        flipped: false
      }))
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()

      this.setState(() => ({
        flipped: true
      }))
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      result: 0,
      questionNo: 0,
      flipped: false
    }
  }

  answerQuestion = type => {
    correct = type === "correct"

    let result = correct ? this.state.result + 1 : this.state.result
    let questionNo = this.state.questionNo + 1

    this.setState(() => ({
      result: result,
      questionNo: questionNo
    }))
    this.state.flipped && this.flipCard()
  }

  resetQuestion = () => {
    this.value >= 90 && this.flipCard()

    this.setState(() => ({
      result: 0,
      questionNo: 0,
      flipped: false
    }))
  }

  render() {
    const deck = this.props.deck
    const { questions, color } = deck

    const { questionNo, result } = this.state
    const questionsTotal = questions.length

    if (questionsTotal == 0) {
      return (
        <View
          style={[styles.container, styles.center, { backgroundColor: color }]}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Sorry, there are no cards in the deck. Go back to the deck and create some cards!
          </Text>
        </View>
      )
    } else if (questionNo + 1 > questionsTotal) {
      return (
        <View
          style={[styles.container, styles.center, { backgroundColor: color }]}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Good job! You finished this quiz.
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            👏
          </Text>
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            Your score: {result}/{questionNo}
          </Text>
          <TouchableOpacity onPress={() => this.resetQuestion()}>
            <Text style={{ fontSize: 20, color: bblue, textAlign: "center", padding: 10 }}>
              Restart quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.goBack()}>
            <Text style={{ fontSize: 20, color: bblue, textAlign: "center" }}>
              Back to deck
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    }

    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    }
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View>
            <Animated.View style={[styles.card, frontAnimatedStyle]}>
              <View>
                <Text style={styles.main}>
                  {questions[questionNo].question}
                </Text>
              </View>
            </Animated.View>
            <Animated.View
              style={[styles.card, styles.back, backAnimatedStyle]}
            >
              <View>
                <Text style={styles.main}>{questions[questionNo].answer}</Text>
              </View>
              <View />
            </Animated.View>
          </View>
        </View>
        <View style={styles.QuestionDetails}>
          <Text>
            {this.state.questionNo + 1}/{questionsTotal}
          </Text>
        </View>
        <View style={styles.row}>
        <TouchableOpacity
            style={styles.incorrect}
            onPress={() => this.answerQuestion("incorrect")}
          >
            <View style={[styles.iconContainer, { backgroundColor: red }]}>
              <MaterialIcons name="close" style={{ color: white }} size={35} />
            </View>
            <Text>Incorrect</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: bblue,
                fontSize: 20,
                width: 100
              }}
              onPress={() => this.flipCard()}
            >
              {this.state.flipped ? "Show Question" : "Show Answer"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.correct}
            onPress={() => this.answerQuestion("correct")}
          >
            <View style={[styles.iconContainer, { backgroundColor: green }]}>
              <MaterialIcons name="check" style={{ color: white }} size={35} />
            </View>
            <Text>Correct</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { deck } = navigation.state.params

  return {
    deck,
    goBack: () => navigation.goBack()
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  QuestionDetails: {
    fontSize: 25,
    alignSelf: "center"
  },
  card: {
    alignSelf: "center",
    alignItems: "center",
    padding: 30,
    height: 200,
    width: 350, 
    justifyContent: "center",
    backgroundColor: white,
    borderRadius: 5,
    backfaceVisibility: "hidden"
  },
  back: {
    position: "absolute"
  },
  main: {
    fontSize: 30,
    textAlign: "center"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  correct: { color: green, fontSize: 25, alignItems: "center" },
  incorrect: {
    color: red,
    fontSize: 25,
    alignItems: "center"
  },
  iconContainer: {
    padding: 6,
    borderRadius: 8,
    width: 50,
    height: 50
  },
  center: {
    alignContent: "center",
    justifyContent: "center"
  }
})

export default connect(mapStateToProps)(Question)
