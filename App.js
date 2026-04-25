import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FitnessProvider } from './ExerciseContext';
import HomeScreen from './screens/HomeScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <FitnessProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#673AB7' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Gym Log' }} />
          <Stack.Screen name="Details" component={ExerciseDetailScreen} options={{ title: 'View Workout' }} />
          <Stack.Screen name="AddExercise" component={AddExerciseScreen} options={{ title: 'New Entry' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </FitnessProvider>
  );
}