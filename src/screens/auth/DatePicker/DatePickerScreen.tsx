import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import BaseButton from '../../../components/BaseButton';
import DatePicker from 'react-native-date-picker';

function DatePickerScreen() {
  const [date, setDate] = useState(new Date('2000-1-1'));
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const getAge = (DOB: Date) => {
      const today = new Date();
      const birthDate = new Date(DOB);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const validateDate = () => {
      let error = '';
      const age = getAge(date);
      if (age < 13) {
        error = 'Có vẻ như bạn đã nhập sai thông tin. Hãy đảm bảo sử dụng ngày sinh thật của mình.';
      }
      setError(error);
      setIsFormValid(error === '');
    };

    validateDate(); // Gọi hàm validateDate ngay khi date thay đổi.
  }, [date]);
  const handleSubmit = () => {};
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          marginBottom: 20,
          marginTop: 120
        }}
      >
        Sinh nhật của bạn khi nào?
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 30,
          color: 'red'
        }}
      >
        {error}
      </Text>
      <DatePicker
        style={{
          marginBottom: 80
        }}
        androidVariant='nativeAndroid'
        mode='date'
        date={date}
        onDateChange={setDate}
      />
      <BaseButton disabled={!isFormValid} onPress={handleSubmit}>
        Tiếp
      </BaseButton>
    </View>
  );
}
export default DatePickerScreen;
