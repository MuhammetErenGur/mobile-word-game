import { Pressable, Text, View, StyleSheet } from "react-native";

const StartGame = ({ navigation }) => {

    const handleClick = () => {
        navigation.navigate("Game")
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>
                    Oyuna Başla
                </Text>
            </Pressable>
        </View>
    )
}

export default StartGame;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        width: 100,
        height: 50,
        borderRadius: 20,
        backgroundColor: "red",
        alignContent: "center",
        justifyContent: "center",
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 15
    }
})