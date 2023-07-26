
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameBoard from './pages/gameboard/GameBoard';
import ScoreBoardPage from './pages/ScoreBoard/ScoreBoardPage';
import StartGame from './pages/startGame/StartGame';




const Stack = createNativeStackNavigator();




export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartGame" component={StartGame} options={{ headerTintColor: "white", headerStyle: { backgroundColor: "#1a1d21" } }} />
        <Stack.Screen name="Game" component={GameBoard} options={{ headerTintColor: "white", headerStyle: { backgroundColor: "#1a1d21" } }} />
        <Stack.Screen name="ScoreBoard" component={ScoreBoardPage} options={{ headerTintColor: "white", headerStyle: { backgroundColor: "#1a1d21" } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

