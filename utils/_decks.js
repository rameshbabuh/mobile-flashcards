// utils/_decks.js

import { AsyncStorage } from "react-native"
import { materialColor } from "./colors"

export const DECKS_STORAGE_KEY = "mobile-flashcards:decks"

export const setDeckData = () => {
    const deckData = {
        English: {
            title: "English",
            questions: [
                {
                    question: "BLITHE",
                    answer: "joyful, cheerful, or without appropriate thought"
                },
                {
                    question: "NUANCE",
                    answer: "A subtle expression of meaning or quality"
                },
                {
                    question: "FERVID",
                    answer: "intensely emotional; feverish"
                }
            ],
            color: materialColor()
        },
        ES6: {
            title: "ES6",
            questions: [
                {
                    question: "let and const",
                    answer: "let and const uses block scoping"
                },
                {
                    question: "Webpack",
                    answer: "Webpack is used to bundle javascript files that can be used in a browser."
                }
            ],
            color: materialColor()
        },
        Frameworks: {
            title: "Frameworks",
            questions: [
                {
                    question: "Popular Component based frameworks",
                    answer: "Reactjs, Vuejs, Angular"
                }
            ],
            color: materialColor()
        }
    }
    AsyncStorage.removeItem(DECKS_STORAGE_KEY)
        .catch(error => console.warn("error", error))
        .then(() => {
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(deckData))
        })

    return deckData
}
