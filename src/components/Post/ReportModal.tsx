import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { Divider, IconButton, Text } from 'react-native-paper';
import { AppNaviagtionName, ReportNavigationName } from 'src/common/constants/nameScreen';

export type ReportModalType = {
  isVisible: boolean;
  id: string;
  onBackdropPress: () => any;
};

function ReportModal(props: ReportModalType) {
  const { isVisible, onBackdropPress, id } = props;

  const navigation: NavigationProp<AppNavigationType, AppNaviagtionName.ReportNavigation> =
    useNavigation();
  const handleNavigation = () =>
    navigation.navigate(AppNaviagtionName.ReportNavigation, {
      screen: ReportNavigationName.ReportScreen,
      params: { id: id }
    });
  return (
    <Modal
      isVisible={isVisible}
      animationIn='slideInUp'
      animationOut='slideOutDown'
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0.8}
      onBackdropPress={onBackdropPress}
      style={{ justifyContent: 'flex-end', margin: 0 }}
    >
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='content-save-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Lưu bài viết </Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>Thêm vào danh sách các mục đã lưu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='close-box-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Ẩn bài viết </Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>Ẩn các bài viết tương tự</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='clock-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Tạm ẩn ${} trong 30 ngày </Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>Tạm thời dừng xem bài viết</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='close-octagon-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Ẩn tất cả từ ${} </Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>Không xem bài viết từ người này nữa</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='chevron-down'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Xem thêm </Text>
          </View>
        </TouchableOpacity>
        <Divider bold />
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='information-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}> Tại sao tôi nhìn thấy bài viết này? </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleNavigation}>
          <IconButton
            icon='folder-information-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontSize: 18 }}> Báo cáo bài viết </Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>Tôi lo ngại về bài viết này.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='bell-badge-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}> Bật thông báo về bài viết này </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <IconButton
            icon='link-variant'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={35}
          />
          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text style={{ fontSize: 18 }}> Sao chép liên kết </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ReportModal;
