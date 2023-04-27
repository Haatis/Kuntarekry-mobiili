import { View, Text } from 'react-native';
import { theme } from '../styles/theme';

export default function SettingsScreen() {
  return (
    <View>
      <Text style={theme.textVariants.uiS}>Settings Screen</Text>
      <Text style={theme.textVariants.body}>Settings Screen</Text>
      <Text style={theme.textVariants.body}>Settings Screen</Text>
      <Text style={theme.shadow}>TESTI</Text>
    </View>
  );
}
