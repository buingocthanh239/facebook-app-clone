import { Text, View } from 'react-native';
import WraperAuthScreen from 'src/components/WraperAuthScreen';

function HomeAuthScreen() {
  return (
    <WraperAuthScreen>
      <View>
        <Text>Home auth</Text>
      </View>
    </WraperAuthScreen>
  );
}

export default HomeAuthScreen;
