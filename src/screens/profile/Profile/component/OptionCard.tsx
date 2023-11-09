import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

export interface OptionProp {
  icon: string;
  title: string;
}
const OptionCard = (props: OptionProp) => {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={16} icon={props.icon} />
      <Text variant='labelMedium'>{props.title}</Text>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
