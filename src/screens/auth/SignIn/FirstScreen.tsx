import { Text, View } from 'react-native';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseButton from 'src/components/BaseButton';

function FirstScreen() {
  return (
    <WraperAuthScreen>
      <View>
        <Text>Sign In screen</Text>
        <BaseButton>bat dau</BaseButton>
      </View>
    </WraperAuthScreen>
  );
}

export default FirstScreen;
