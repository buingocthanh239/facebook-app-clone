import { Text, View } from 'react-native';
import WraperAuthScreen from 'src/components/WraperAuthScreen';

function SignInScreen() {
  return (
    <WraperAuthScreen>
      <View>
        <Text>Sign In screen</Text>
      </View>
    </WraperAuthScreen>
  );
}

export default SignInScreen;
