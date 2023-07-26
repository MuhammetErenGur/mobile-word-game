import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

const ScoreBoardPage = ({ route }) => {
    const [scores, setScores] = useState([]);
    const latestScore = route.params.scoreLatest
    const getScores = async () => {
        try {
            const storedScoreArray = await AsyncStorage.getItem("@Scores");
            const setArray = storedScoreArray ? JSON.parse(storedScoreArray) : []
            setArray.sort((a, b) => a - b);
            setArray.reverse();
            setScores([...setArray])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getScores();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.latestScoreBoard}>
                <Text style={styles.indexText}>En Son Skorunuz: </Text>
                <Text style={styles.scoreText}>{latestScore}</Text>
            </View>
            {scores.map((score, index) => {
                if (index < 10) {
                    return (
                        <View style={styles.scoreBoard} key={index.toString() + "index"}>
                            <Text style={styles.indexText}>{+index + 1 + "."}</Text>
                            <Text style={styles.scoreText}>{score + " puan"}</Text>
                        </View>
                    )
                }
            })}
        </View>
    )
}

export default ScoreBoardPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    scoreBoard: {
        width: 100,
        height: 25,
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: "red",
        borderRadius: 8
    },
    indexText: {
        textAlign: "left",
        marginLeft: 5,
        paddingTop: 3,
    },
    scoreText: {
        marginLeft: 5,
        textAlign: "center",
        paddingTop: 3,
    },
    latestScoreBoard: {
        paddingTop: 10,
        width: 200,
        height: 50,
        marginTop: 5,
        flexDirection: "row",
        backgroundColor: "red",
        borderRadius: 20,
        alignContent: "center",
        justifyContent: "center",
    }
})