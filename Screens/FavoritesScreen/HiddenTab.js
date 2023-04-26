import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../styles/theme';

export default function HiddenTab() {
  return (
    <View style={theme.container}>
      <Text>Hidden Tab</Text>
    </View>
  );
}
