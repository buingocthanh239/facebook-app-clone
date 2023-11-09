import { View, Text, Image, StyleSheet } from 'react-native';
import { color } from 'src/common/constants/color';
export interface FriendProps {
  username: string;
  avatarUrl: string;
}
const FriendCard = (props: FriendProps) => {
  return (
    <View style={styles.card}>
      <Image style={styles.avatar} source={{ uri: props.avatarUrl }} />
      <Text style={styles.username}>{props.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 115,
    height: 115,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginBottom: 35
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 7,
    marginBottom: 5
  },
  username: {
    fontSize: 16,
    color: color.textColor,
    fontWeight: 'bold',
    marginHorizontal: 3
  }
});

export default FriendCard;
