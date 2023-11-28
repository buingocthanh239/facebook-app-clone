import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from 'src/common/constants/color';

export interface OptionProp {
  icon: string;
  color: string;
  title: string;
}
const OptionCard = (props: OptionProp) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconCard}>
        <Icon name={props.icon} size={32} color={props.color} />
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.borderBottom,
    paddingVertical: 7,
    paddingHorizontal: 5
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 10
  },
  textCard: {
    fontSize: 14
  }
});
