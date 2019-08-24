// utils/_decks.js

import { AsyncStorage } from "react-native"
import { materialColor } from "./colors"

// export const DECKS_STORAGE_KEY = "MyCards:decks"
export const DECKS_STORAGE_KEY = "mobile-flashcards:decks"

export const setDummyData = () => {
  const dummyData = {
    English: {
      title: "English Words",
      questions: [
        {
          question: "BLITHE",
          answer: "joyful, cheerful, or without appropriate thought"
        },
        {
          question: "NUANCE",
          answer: "A subtle expression of meaning or quality"
        }
      ],
      color: materialColor()
    },
    Marvel: {
      title: "Captain marvel",
      questions: [
        {
          question: "Whatr ra",
          answer:
            "Marvel"
        }
      ],
      color: materialColor()
    },
    Game: {
      title: "Crick",
      questions: [
        {
          question: "Crick",
          answer: "kuchi"
        }
      ],
      color: materialColor()
    }
  }
  AsyncStorage.removeItem(DECKS_STORAGE_KEY)
    .catch(error => console.warn("error", error))
    .then(() => {
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
    })

  return dummyData
}
