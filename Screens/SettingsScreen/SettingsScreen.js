import { View, Text, Button } from 'react-native';
import { theme } from '../../styles/theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  return (
    <View>
      <Text style={theme.textVariants.uiS}>Settings Screen</Text>
      <Button onPress={() => AsyncStorage.clear()} title="Refresh async"></Button>
    </View>
  );
}
