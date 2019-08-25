import React, { Component } from "React"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { connect } from "react-redux"
import { addCard } from "../actions"
import { submitCard } from "../utils/api"
import { teal, white, bblue } from "../utils/colors"

const SubmitButton = ({ onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={[styles.androidSubmitButton, disabled && styles.disabled]}
            onPress = {onPress}
            disabled = {disabled}
        >
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class AddCard extends Component {
    static navigationOptions = () => {
        return {
            title: "New Card"
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            question: "",
            answer: "",
            deckTitle: this.props.deckTitle
        }
    }

    submit = () => {
        const { question, answer, deckTitle } = this.state
        const card = { question, answer }
        this.setState(() => ({
            question: "",
            answer: ""
        }))
        submitCard(card, deckTitle)
        this.props.dispatch(addCard(card, deckTitle))
        this.props.goBack()
    }

    render() {
        const { deckColor } = this.props

        return (
            <View style={[styles.container, { backgroundColor: deckColor }]}>
                <KeyboardAvoidingView 
                    style = {{ flex: 1 }}
                    behavior = "padding">
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        style={styles.input}
                        onChangeText={question => this.setState({ question })}
                        value={this.state.question}
                        placeholder={"Type a question"}
                        placeholderTextColor={teal}
                    />
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        style={styles.input}
                        onChangeText={answer => this.setState({ answer })}
                        value={this.state.answer}
                        placeholder={"Type the answer"}
                        placeholderTextColor={teal}
                    />
                    <SubmitButton
                        onPress={this.submit}
                        disabled={this.state.question === "" || this.state.answer === ""}
                    />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = (state, { navigation }) => {
    const { deckTitle, deckColor } = navigation.state.params

    return {
        deckTitle,
        deckColor,
        goBack: () => navigation.goBack()
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 10,
        height: "100%"
    },
    input: {
        height: 80,
        margin: 10,
        fontSize: 22,
        backgroundColor: white,
        opacity: 0.6,
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

export default connect(mapStateToProps)(AddCard)
