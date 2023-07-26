import { useEffect, useRef, useState } from "react";
import { Pressable, Text, Animated } from "react-native";



const CharButton = ({ styles, char, setChar, transformYValue, setObject, object, status, setStatus }) => {

    const [checked, setChecked] = useState(false);
    const animatedValueChar = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current

    const handleToggle = (checked) => {
        if (!checked) {
            setChar(current => current + char.char)
            object.push(char)
            setObject(object)
            setChecked(true)
        }
        else {
            setChar(current => current.replace(char.char, ""))
            setObject(current =>
                current.map((cell) =>
                    char.id == cell.id ? { id: -1, char: '', type: 0 } : cell
                ))
            setChecked(false)
        }
    }

    useEffect(() => {
        Animated.timing(animatedValueChar, {
            toValue: { x: 0, y: transformYValue },
            delay: 500,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }, [transformYValue])

    useEffect(() => {
        if (status === 'approve' || status === 'decline') {
            setChecked(false);
            setStatus('');
        }
    }, [status])

    return (
        <Animated.View style={{ transform: [{ translateY: animatedValueChar.y }] }}>
            <Pressable style={[styles, { borderWidth: 1, borderColor: checked ? "#55d471" : "white" }]} onPress={() => handleToggle(checked)} >
                <Text style={{ color: checked ? "#1a1d21" : "white" }}>{char.char}</Text>
            </Pressable>
        </Animated.View>
    );

};

export default CharButton;
