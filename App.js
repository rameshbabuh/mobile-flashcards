import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { Platform, StatusBar, Dimensions, StyleSheet, View, Text } from "react-native"
import { createStackNavigator, createMaterialTopTabNavigator, createAppContainer, SafeAreaView } from "react-navigation"
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import reducer from "./reducers"
import Constants from "expo-constants"
import DeckList from "./components/DeckList"
import AddDeck from "./components/AddDeck"
import AddCard from "./components/AddCard"
import DeckDetails from "./components/DeckDetails"
import Question from "./components/Question"
import { purple, white, gray, green } from "./utils/colors"
import { setLocalNotification } from "./utils/helpers"

const FlashCardsStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <SafeAreaView
            style={{ backgroundColor, height: Constants.statusBarHeight }}
        >
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            <Text style={{color: white, fontSize: 20, textAlign: "center"}}>FLASH CARDS</Text>
        </SafeAreaView>
    )
}

const Tabs = createMaterialTopTabNavigator(
    {
        Decks: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: "Saved Decks",
                tabBarIcon: ({ tintcolor }) => (
                    <MaterialIcons name="list" size={30} color={tintcolor} />
                )
            }
        },
        NewDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: "+Add New Deck",
                tabBarIcon: ({ tintcolor }) => (
                    <Ionicons name="plus-square" size={30} color={tintcolor} />
                )
            }
        }
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === "ios" ? green : white,
            inactiveTintColor: Platform.OS === "ios" ? green : white,
            style: {
                height: 50,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
)

const MainNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    DeckDetails: {
        screen: DeckDetails,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            },
            headerTitleStyle: { width: Dimensions.get("window").width }
        }
    },
    Question: {
        screen: Question,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            },
            headerTitleStyle: { width: Dimensions.get("window").width }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            },
            headerTitleStyle: { width: Dimensions.get("window").width }
        }
    }
}))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    }
})

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={styles.container}>
                    <FlashCardsStatusBar
                        backgroundColor={gray}
                        barStyle="light-content"
                    />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}
