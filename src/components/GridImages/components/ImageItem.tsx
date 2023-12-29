import { Image, StyleSheet, View } from 'react-native';
import { IconButton, TouchableRipple } from 'react-native-paper';

export interface IImageItemProps {
  onPress: () => any;
  image: string;
  index: number;
  isHideCloseIcon?: boolean;
  onPressCloseIcon?: () => any;
}
function ImageItem({ onPress, image, isHideCloseIcon, onPressCloseIcon }: IImageItemProps) {
  return image ? (
    <View style={styles.image_view}>
      <TouchableRipple onPress={onPress}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={{
            uri: image
          }}
        />
      </TouchableRipple>
      {isHideCloseIcon ? (
        <IconButton
          icon='close'
          style={{ position: 'absolute', right: 2 }}
          onPress={onPressCloseIcon}
        />
      ) : null}
    </View>
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
