import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { color } from 'src/common/constants/color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconSearch from 'react-native-vector-icons/Ionicons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ProfileNavigationName } from 'src/common/constants/nameScreen';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
import { removeDiacritics, removeSpaces } from 'src/utils/helper';

const SettingProfile = () => {
  const auth = useAppSelector(selectAuth);

  const route: RouteProp<PropfileNavigationType, ProfileNavigationName.SettingProfile> = useRoute();
  const user_id = route.params ? route.params.user_id : 'auth.user?.id';
  const username = route.params ? route.params.username : 'auth.user?.username';
  const isOwnProfile = auth.user?.id === user_id;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: color.white, marginTop: 10 }}>
        {isOwnProfile && (
          <View style={{ borderBottomWidth: 1, borderBottomColor: color.borderBottom }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 15
              }}
            >
              <View style={{ minWidth: 50 }}>
                <Icon name='mode-edit-outline' size={32} color={'black'} />
              </View>
              <Text style={{ fontSize: 17, color: color.textColor, fontWeight: '500' }}>
                Chỉnh sửa trang cá nhân
              </Text>
            </View>
          </View>
        )}
        <View style={{ borderBottomWidth: 1, borderBottomColor: color.borderBottom }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
            <View style={{ minWidth: 50 }}>
              <IconSearch name='search' size={32} color={'black'} />
            </View>
            <Text style={{ fontSize: 17, color: color.textColor, fontWeight: '500' }}>
              Tìm kiếm trên trang cá nhân
            </Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: color.white, marginTop: 10, flex: 1 }}>
        <View style={{ padding: 15 }}>
          {isOwnProfile ? (
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>
              Liên kết đến trang cá nhân của bạn
            </Text>
          ) : (
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>
              Liên kết đến trang cá nhân của {username}
            </Text>
          )}
          <View
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              borderBottomWidth: 1,
              borderBottomColor: color.borderBottom
            }}
          >
            <Text>Liên kết của riêng bạn trên facebook</Text>
          </View>
          <View>
            <TouchableOpacity style={{ paddingTop: 5 }}>
              <Text style={{ fontWeight: '900', fontSize: 15, color: color.textColor }}>
                https://www.facebook.com/{removeSpaces(removeDiacritics(username))}.{user_id}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 10,
                borderWidth: 1,
                borderColor: color.borderBottom,
                borderRadius: 7,
                maxWidth: 180
              }}
              activeOpacity={0.8}
              onPress={() => {
                Clipboard.setString(
                  `https://www.facebook.com/${removeSpaces(removeDiacritics(username))}.${user_id}`
                );
                ToastAndroid.show('Đã sao chép liên kết đến trang cá nhân ', ToastAndroid.SHORT);
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingVertical: 7,
                  paddingHorizontal: 10
                }}
              >
                SAO CHÉP LIÊN KẾT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingProfile;
