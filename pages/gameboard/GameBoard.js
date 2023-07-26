import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../components/firebase/Firebase';

import CharButton from "../../components/charbutton/CharButton";
import TextField from '../../components/textField/TextField';
import DeclineButton from "../../components/buttons/DeclineButton";
import ApproveButton from "../../components/buttons/ApproveButton";
import ScoreBoard from "../../components/scoreBoard/ScoreBoard";

const width = 8
const height = 10;
const alphabet = [
    'A',
    'B',
    'C',
    'Ç',
    'D',
    'E',
    'F',
    'G',
    'Ğ',
    'H',
    'İ',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'Ö',
    'P',
    'R',
    'S',
    'Ş',
    'T',
    'U',
    'Ü',
    'V',
    'Y',
    'Z',
];
const consonant = [
    'B',
    'C',
    'Ç',
    'D',
    'F',
    'G',
    'Ğ',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'R',
    'S',
    'Ş',
    'T',
    'V',
    'Y',
    'Z',
];

const vovel = [
    'A',
    'E',
    'I',
    'İ',
    'O',
    'Ö',
    'U',
    'Ü',
];

const point = [
    1,
    3,
    4,
    4,
    3,
    1,
    7,
    5,
    8,
    5,
    2,
    1,
    10,
    1,
    1,
    2,
    1,
    2,
    7,
    5,
    1,
    2,
    4,
    1,
    2,
    3,
    7,
    3,
    4
];


const GameBoard = ({ navigation }) => {
    const [currentCharArrangement, setCurrentCharArrangement] = useState([]);
    const [isGameFinish, setIsGameFinish] = useState(false);
    const [buttonStatus, setButtonStatus] = useState('')
    const [foundWord, setFoundWord] = useState(0);
    const [word, setWord] = useState("");
    const [score, setScore] = useState(0);
    const [wrongAttemp, setWrongAttemp] = useState(0);
    const [object, setObject] = useState([]);
    const [period, setPeriod] = useState(5000);
    const insertNewCharRef = useRef();


    const handleApprove = async () => {
        if (word.length != 0) {
            const docRef = doc(db, "words", word.charAt(0).toUpperCase());
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const words = docSnap.data()
                if (words.words.some((w) => w === word.toLowerCase())) {
                    console.log("var");
                    getPoint();
                }
                else {
                    console.log("yok");
                    setObject(oldValues => oldValues = []);
                    setWrongAttemp(prev => prev + 1);
                }
                setButtonStatus('approve')
            }
            setWord("");
        }

    }

    const handleDecline = () => {
        if (word.length != 0) {
            setWord("");
            setObject(oldValues => oldValues = []);
            setButtonStatus('decline')
        }
    }




    const getPoint = () => {
        var temp = 0;
        for (let index = 0; index < word.length; index++) {
            let char = word[index]
            for (let index2 = 0; index2 < alphabet.length; index2++) {
                if (char == alphabet[index2]) {
                    temp += point[index2]
                    break
                }
            }
        }
        for (let index = 0; index < object.length; index++) {
            let deleted = object[index]
            for (let index2 = 0; index2 < currentCharArrangement.length; index2++) {
                if (currentCharArrangement[index2].id == deleted.id && currentCharArrangement[index2].type != 1 && currentCharArrangement[index2].type != 12) {
                    currentCharArrangement[index2].char = ''
                    currentCharArrangement[index2].type = 0
                    setCurrentCharArrangement(currentCharArrangement)
                    break;
                } else if (currentCharArrangement[index2].id == deleted.id && (currentCharArrangement[index2].type == 1 || currentCharArrangement[index2].type == 12)) {

                    currentCharArrangement[index2].type = 0
                    setCurrentCharArrangement(currentCharArrangement)
                    break;
                }
            }
        }


        setObject(oldValues => oldValues = []);
        setWord("");
        setScore(current => current + temp);
        setFoundWord(prev => prev + 1);

        if (score > 100 && score < 200)
            setPeriod(4000)
        else if (score > 200 && score < 300)
            setPeriod(3000)
        else if (score > 300 && score < 400)
            setPeriod(2000)
        else if (score > 400) {
            setPeriod(1000)
        }

    }



    const createGame = () => {
        const randomCharArrangement = []
        for (let i = 0; i < height * width; i++) {
            if (i > 55) {
                let randomChar = {}
                if (i % 3 == 0)
                    randomChar = { id: i, char: vovel[Math.floor(Math.random() * vovel.length)], type: 0, lastIndex: 0, state: 'new' }
                else
                    randomChar = { id: i, char: consonant[Math.floor(Math.random() * consonant.length)], type: 0, lastIndex: 0, state: 'new' }

                randomCharArrangement.push(randomChar)
            }
            else {
                randomCharArrangement.push({ id: i, char: '', type: 0, lastIndex: 0, state: 'new' })
            }
        }
        setCurrentCharArrangement(randomCharArrangement)

    }




    useEffect(() => {
        createGame();
        return () => {
            setCurrentCharArrangement([])
        }
    }, []);

    useEffect(() => {
        insertNewCharRef.current = setInterval(() => {
            const randomColumn = Math.floor(Math.random() * width)
            const randomType = Math.floor(Math.random() * 7)
            var totalvovel = 0, totalconsonant = 0
            for (let index = 0; index < currentCharArrangement.length; index++) {
                for (let index2 = 0; index2 < vovel.length; index2++) {
                    if (currentCharArrangement[index].char == vovel[index2]) {
                        totalvovel += 1
                        break;
                    }
                }
                for (let index2 = 0; index2 < consonant.length; index2++) {
                    if (currentCharArrangement[index].char == consonant[index2]) {
                        totalconsonant += 1
                        break;
                    }
                }
            }
            let randomChar = {}
            if (currentCharArrangement[randomColumn].char !== '') {
                setIsGameFinish(true)
            }
            if (totalconsonant / totalvovel > 2)
                randomChar = { char: vovel[Math.floor(Math.random() * vovel.length)], type: randomType, lastIndex: 0, state: 'new' };
            else
                randomChar = { char: consonant[Math.floor(Math.random() * consonant.length)], type: randomType, lastIndex: 0, state: 'new' };

            var indexx = 0
            for (indexx = randomColumn; indexx < currentCharArrangement.length; indexx += 8) {
                if (currentCharArrangement[indexx].char !== '') {
                    break;
                }
            }
            if (indexx >= 80) {
                indexx -= 8
            }


            if (randomType == 1) {

                var tempcCA = currentCharArrangement[indexx]

                if (tempcCA.type == 1)
                    tempcCA.type = 1
                else
                    tempcCA.type = 12
                setCurrentCharArrangement(current =>
                    current.map((cell, index) =>
                        (indexx == index) && (cell.char != '') ? { id: index, ...tempcCA } : cell
                    )
                );
                setCurrentCharArrangement(current =>
                    current.map((cell, index) =>
                        (randomColumn == index) && (cell.char === '') ? { id: index, ...randomChar } : cell
                    )
                );


            } else {
                if (currentCharArrangement[indexx].type == 1) {
                    randomChar.type = 12;
                }
                setCurrentCharArrangement(current =>
                    current.map((cell, index) =>
                        (randomColumn == index) && (cell.char === '') ? { id: index, ...randomChar } : cell,
                    )
                );
            }
            setCurrentCharArrangement(current => {

                const arr = [...current];
                for (let i = 0; i < 80 - width; i++) {
                    if (arr[i + width].char === '') {
                        arr[i].id = i + width;
                        arr[i + width] = arr[i];
                        arr[i + width].lastIndex = i;
                        arr[i + width].state = 'old';
                        arr[i] = { id: i, char: '', type: 0, lastIndex: i + width, state: 'new' };
                    }
                }
                return [...arr];
            })


        }, period);


        return () => clearInterval(insertNewCharRef.current)
    }, [currentCharArrangement]);



    useEffect(() => {
        if (wrongAttemp == 3) {
            for (let i = 0; i < width; i++) {
                const randomType = Math.floor(Math.random() * 7)
                var totalvovel = 0, totalconsonant = 0
                for (let index = 0; index < currentCharArrangement.length; index++) {
                    for (let index2 = 0; index2 < vovel.length; index2++) {
                        if (currentCharArrangement[index].char == vovel[index2]) {
                            totalvovel += 1
                            break;
                        }
                    }
                    for (let index2 = 0; index2 < consonant.length; index2++) {
                        if (currentCharArrangement[index].char == consonant[index2]) {
                            totalconsonant += 1
                            break;
                        }
                    }
                }
                let randomChar = {}
                if (currentCharArrangement[i].char !== '') {
                    setIsGameFinish(true)
                }
                if (totalconsonant / totalvovel > 2)
                    randomChar = { char: vovel[Math.floor(Math.random() * vovel.length)], type: randomType, lastIndex: 0, state: 'new' };
                else
                    randomChar = { char: consonant[Math.floor(Math.random() * consonant.length)], type: randomType, lastIndex: 0, state: 'new' };

                var indexx = 0
                for (indexx = i; indexx < currentCharArrangement.length; indexx += 8) {
                    if (currentCharArrangement[indexx].char !== '') {
                        break;
                    }
                }
                if (indexx >= 80) {
                    indexx -= 8
                }
                if (randomType == 1) {

                    var tempcCA = currentCharArrangement[indexx]

                    if (tempcCA.type == 1)
                        tempcCA.type = 1
                    else
                        tempcCA.type = 12
                    setCurrentCharArrangement(current =>
                        current.map((cell, index) =>
                            (indexx == index) && (cell.char != '') ? { id: index, ...tempcCA } : cell
                        )
                    );
                    setCurrentCharArrangement(current =>
                        current.map((cell, index) =>
                            (i == index) && (cell.char === '') ? { id: index, ...randomChar } : cell
                        )
                    );


                } else {
                    if (currentCharArrangement[indexx].type == 1) {
                        randomChar.type = 12;
                    }
                    setCurrentCharArrangement(current =>
                        current.map((cell, index) =>
                            (i == index) && (cell.char === '') ? { id: index, ...randomChar } : cell,
                        )
                    );
                }
                setCurrentCharArrangement(current => {

                    const arr = [...current];
                    for (let i = 0; i < 80 - width; i++) {
                        if (arr[i + width].char === '') {
                            arr[i].id = i + width;
                            arr[i + width] = arr[i];
                            arr[i + width].lastIndex = i;
                            arr[i + width].state = 'new';
                            arr[i] = { id: i, char: '', type: 0, lastIndex: i + width, state: 'new' };
                        }
                    }
                    return [...arr];
                })
            }
            setWrongAttemp(0)
        }
        else if (isGameFinish) {
            (async () => {
                const storedScoreArray = await AsyncStorage.getItem("@Scores");
                const scoreArray = storedScoreArray ? JSON.parse(storedScoreArray) : [];
                scoreArray.push(score);
                await AsyncStorage.setItem("@Scores", JSON.stringify(scoreArray));
                setIsGameFinish(false);
            })().then(() => {
                navigation.navigate("ScoreBoard", {
                    scoreLatest: score
                });
            });
        }
    }, [wrongAttemp, isGameFinish]);








    return (
        <View style={styles.container}>
            <ScoreBoard score={score} />
            <View style={styles.gameContainer}>
                <View style={styles.animateContainer}>
                    {currentCharArrangement.map((char, index) => {
                        if (char.state === 'old') {
                            let yvalue = Math.floor(index / 8)
                            let xvalue = 40 * (index % 8)
                            if (char.type == 1) {
                                return (alphabet.includes(char.char) &&
                                    <View key={index.toString()} >
                                        <CharButton styles={[styles.icechar, { position: "absolute", top: (35 * Math.floor(char.lastIndex / 8)) - 5, left: xvalue }]} char={char} transformYValue={35} setChar={setWord} word={word} setObject={setObject} object={object} status={buttonStatus} setStatus={setButtonStatus} />
                                    </View>
                                );
                            } else if (char.type == 12) {
                                return (alphabet.includes(char.char) &&
                                    <View key={index.toString()} >
                                        <CharButton styles={[styles.icechar2, { position: "absolute", top: (35 * Math.floor(char.lastIndex / 8)) - 5, left: xvalue }]} char={char} transformYValue={35} setChar={setWord} word={word} setObject={setObject} object={object} status={buttonStatus} setStatus={setButtonStatus} />
                                    </View>
                                );
                            }
                            else {
                                return (alphabet.includes(char.char) &&
                                    <View key={index.toString()} >
                                        <CharButton styles={[styles.char, { position: "absolute", top: (35 * Math.floor(char.lastIndex / 8)) - 5, left: xvalue }]} char={char} transformYValue={35} setChar={setWord} word={word} setObject={setObject} object={object} status={buttonStatus} setStatus={setButtonStatus} />
                                    </View>
                                );
                            }
                        } else {
                            let yvalue = Math.floor(index / 8)
                            let xvalue = 40 * (index % 8)
                            if (char.type == 1) {
                                return (alphabet.includes(char.char) &&
                                    <View key={index.toString()} >
                                        <CharButton styles={[styles.icechar, { position: "absolute", top: 0, left: xvalue }]} char={char} transformYValue={(35 * yvalue) - 5} setChar={setWord} word={word} setObject={setObject} object={object} status={buttonStatus} setStatus={setButtonStatus} />
                                    </View>
                                );
                            } else if (char.type == 12) {
                                return (alphabet.includes(char.char) &&
                                    <View key={index.toString()} >
                                        <CharButton styles={[styles.icechar2, { position: "absolute", top: 0, left: xvalue }]} char={char} transformYValue={(35 * yvalue) - 5} setChar={setWord} word={word} setObject={setObject} object={object} status={buttonStatus} setStatus={setButtonStatus} />
                                    </View>
                                );
                            }
                            else {
                                return (alphabet.includes(char.char) &&
                                    <View key={index.toString()} >
                                        <CharButton styles={[styles.char, { position: "absolute", top: 0, left: xvalue }]} char={char} transformYValue={(35 * yvalue) - 5} setChar={setWord} word={word} setObject={setObject} object={object} status={buttonStatus} setStatus={setButtonStatus} />
                                    </View>
                                );
                            }
                        }
                    }
                    )}
                </View>
            </View>
            <View style={styles.textContainer}>
                <DeclineButton handleClick={() => { handleDecline() }} />
                <TextField text={word} />
                <ApproveButton handleClick={() => { handleApprove() }} />
            </View>
        </View>
    )

};

export default GameBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        display: "flex",
        padding: 30,
        alignItems: "center"
    },
    gameContainer: {
        marginTop: 25,
        width: 320,
        height: 400,
        borderRadius: 10,
        backgroundColor: "#1a1d21",

    },
    textContainer: {
        alignItems: "center",
        paddingTop: 100,
        marginLeft: 5,
        flexDirection: "row"
    },
    animateContainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row"
    },
    char: {
        width: 30,
        height: 30,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "red",
    },
    icechar: {
        width: 30,
        height: 30,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#1c278a"
    },
    icechar2: {
        width: 30,
        height: 30,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#2d6da8"
    },

})