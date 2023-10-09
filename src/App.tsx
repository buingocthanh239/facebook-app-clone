import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style='auto' />
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
