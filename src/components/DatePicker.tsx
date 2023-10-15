import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import BaseButton from './BaseButton';
import DatePicker from 'react-native-date-picker';

export default () => {
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    validateDate();
  }, [date]);
  const validateDate = () => {
    let error = '';
    const currentDate = new Date().getFullYear();
    const age = currentDate - date.getFullYear();
    if (age < 18) {
      error = 'Có vẻ như bạn đã nhập sai thông tin. Hãy đảm bảo sử dụng ngày sinh thật của mình.';
    }
    setError(error);
    setIsFormValid(error === '');
  };
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
      <BaseButton children='Tiếp' disabled={!isFormValid} onPress={handleSubmit} />
    </View>
  );
};
