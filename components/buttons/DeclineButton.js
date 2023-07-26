import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DeclineButton = ({ handleClick }) => {
    return (
        <Pressable style={{ margin: 5 }} onPress={handleClick}>
            <Ionicons name="close-circle" size={55} color="red" />
        </Pressable>
    );
}


export default DeclineButton;