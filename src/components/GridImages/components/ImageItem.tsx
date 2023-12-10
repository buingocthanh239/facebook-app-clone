import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export interface IImageItemProps {
  onPress: () => any;
  image: string;
  index: number;
}
function ImageItem({ onPress, image }: IImageItemProps) {
  return image ? (
    <TouchableOpacity style={styles.image_view} onPress={onPress} activeOpacity={0.8}>
      <Image
        style={styles.image}
        resizeMode='cover'
        source={{
          uri: image
        }}
      />
    </TouchableOpacity>
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 1
  },

  image_view: {
    flex: 1,
    margin: 1
  }
});

export default ImageItem;
