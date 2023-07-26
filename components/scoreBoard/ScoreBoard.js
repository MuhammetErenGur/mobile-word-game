import { View, Text, StyleSheet } from "react-native";



const ScoreBoard = ({ score }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text(score)}>{score.toString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: (score) => {
        const scoreColor = score > 0 ? 'green' : 'red'
        return {
            textAlign: "center",
            color: scoreColor,
            fontSize: 30,
        }
    }
});

export default ScoreBoard;