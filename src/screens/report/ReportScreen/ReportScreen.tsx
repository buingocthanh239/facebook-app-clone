import { View } from 'react-native';
import { Button, IconButton, Text, Divider, Card, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const ReportScreen = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text
        style={{
          fontSize: 17,
          fontWeight: 'bold',
          padding: 5
        }}
      >
        Vui lòng chọn vấn đề để tiếp tục{' '}
      </Text>
      <Text
        style={{
          fontSize: 12,
          padding: 5
        }}
      >
        Bạn có thể báo cáo vài viết sau khi chọn vấn đề.{' '}
      </Text>
      <View style={styles.button}>
        <Button style={{ margin: 5 }} mode='contained-tonal'>
          Ảnh khỏa thân
        </Button>
        <Button style={{ margin: 5 }} mode='contained-tonal'>
          Bạo lực
        </Button>
        <Button style={{ margin: 5 }} mode='contained-tonal'>
          Quấy rối
        </Button>
      </View>
      <View style={styles.button}>
        <Button style={{ margin: 2 }} mode='contained-tonal'>
          Tự tử/ gây thương tích
        </Button>
        <Button style={{ margin: 2 }} mode='contained-tonal'>
          Tin giả
        </Button>
        <Button style={{ margin: 2 }} mode='contained-tonal'>
          Spam
        </Button>
      </View>
      <View style={styles.button}>
        <Button style={{ margin: 2 }} mode='contained-tonal'>
          Bán hàng trái phép
        </Button>
        <Button style={{ margin: 2 }} mode='contained-tonal'>
          Ngôn từ gây thù ghét
        </Button>
      </View>
      <View style={styles.button}>
        <Button style={{ margin: 2, marginBottom: 10 }} mode='contained-tonal'>
          Khủng bố
        </Button>
        <Button icon='magnify' style={{ margin: 2, marginBottom: 10 }} mode='contained-tonal'>
          Vấn đề khác
        </Button>
      </View>
      <Divider bold />
      <Text
        style={{
          fontSize: 15,
          padding: 5,
          marginTop: 10,
          fontWeight: '700'
        }}
      >
        Các bước khác mà bạn có thể thực hiện{' '}
      </Text>
      <TouchableRipple style={styles.button}>
        <>
          <IconButton icon='account-minus-outline' style={{ alignSelf: 'flex-start' }} size={25} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Chặn Phạm</Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>
              Các bạn sẽ không thể nhìn thấy hoặc liên hệ với {'\n'}nhau.
            </Text>
          </View>
        </>
      </TouchableRipple>
      <TouchableRipple style={styles.button}>
        <>
          <IconButton
            icon='archive-outline'
            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
            size={25}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Bỏ theo dõi Phạm</Text>
            <Text style={{ fontSize: 12, marginLeft: 5 }}>
              Dừng xem bài viết nhưng vẫn là bạn bè
            </Text>
          </View>
        </>
      </TouchableRipple>
      <Card>
        <Card.Content style={{ flexDirection: 'row', margin: 2, alignItems: 'center' }}>
          <IconButton icon={'information'} />
          <Text>
            Nếu bạn nhận thấy ai đó đang gặp nguy {'\n'} hiểm, đừng chần chừ mà hãy báo ngay cho{' '}
            {'\n'} dịch vụ cấp cứu tại địa phương.{' '}
          </Text>
        </Card.Content>
      </Card>
      <Button mode='contained' style={{ marginTop: 50, backgroundColor: 'gray' }}>
        {' '}
        Tiếp
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {},
  header: { flex: 1 },
  button: {
    flexDirection: 'row',
    padding: 5
  }
});

export default ReportScreen;
