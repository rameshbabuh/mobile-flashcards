import React, { Component } from "React"
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import { submitDeck } from "../utils/api"
import { connect } from "react-redux"
import { addDeck } from "../actions"
import { purple, white, materialColor, bblue } from "../utils/colors"

const SubmitButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.androidSubmitButton, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  constructor(props) {
    super(props)
    this.state = { title: "", color: materialColor() }
  }

  submit = () => {
    const deck = this.state

    // Reset state
    this.setState(() => ({
      title: "",
      color: materialColor()
    }))

    // Save deck in local storage
    submitDeck(deck)

    this.props.dispatch(addDeck(deck))

    this.props.goBack()
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.color }]}>
        <KeyboardAvoidingView 
          style = {{ flex: 1 }}
          behavior = "padding">
            <Text style={styles.description}>
              Title of the new deck
            </Text>
            <TextInput
              multiline={false}
              numberOfLines={3}
              style={styles.input}
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
              placeholder={"Type Deck Title"}
              placeholderTextColor={purple}
            />
            <SubmitButton
              onPress={this.submit}
              disabled={this.state.title === ""}
            />
          </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
    height: "100%"
  },
  description: {
    fontSize: 25,
    margin: 10
  },
  input: {
    height: 80,
    margin: 10,
    fontSize: 22,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 4,
    padding: 10
  },
  androidSubmitButton: {
    backgroundColor: bblue,
    padding: 10,
    borderRadius: 5,
    height: 45,
    margin: 10,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  disabled: {
    opacity: 0.5
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  }
})

const mapStateToProps = (state, { navigation }) => {
  return {
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps)(AddDeck)
