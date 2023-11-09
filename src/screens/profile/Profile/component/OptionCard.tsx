import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

export interface OptionProp {
  icon: string;
  title: string;
}
const OptionCard = (props: OptionProp) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconCard}>
        <Avatar.Icon size={32} icon={props.icon} />
      </View>
      <Text style={styles.textCard}>{props.title}</Text>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginRight: 20
  },
  textCard: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
