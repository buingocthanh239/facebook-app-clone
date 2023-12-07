import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTab from 'src/screens/search/SearchScreen';

const Stack = createNativeStackNavigator();
function SearchNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SearchTab' component={SearchTab} />
    </Stack.Navigator>
  );
}

export default SearchNavigation;
