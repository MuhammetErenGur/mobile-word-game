import { StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



const ApproveButton = ({ handleClick }) => {

    return (
        <Pressable style={{ margin: 5 }} onPress={handleClick}>
            <Ionicons name="md-checkmark-circle" size={55} color="green" />
        </Pressable>

    );
};
export default ApproveButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});