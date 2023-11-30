import { Button, Text, View } from 'react-native';
import React from 'react';
import { increment, decrement } from 'src/redux/reducers/couterReducer';
import { useAppDispatch, useAppSelector } from 'src/redux';

const Counter = (): React.ReactElement => {
  const value = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  return (
    <View>
      <Text>{value}</Text>
      <Button title='increment' onPress={() => dispatch(increment(1))} />

      <Button title='decrement' onPress={() => dispatch(decrement(1))} />
    </View>
  );
};

export default Counter;
