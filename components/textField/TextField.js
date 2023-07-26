import { StyleSheet, View, Text } from "react-native";



const TextField = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default TextField;

const styles = StyleSheet.create({
    container: {
        height: 35,
        width: 200,
        backgroundColor: "rgb(7, 112, 240)",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        textAlign: "center",
        color: "white",
    }
});