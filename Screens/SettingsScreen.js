import { View, Text } from 'react-native';
import { theme } from '../styles/theme';

export default function SettingsScreen() {
  return (
    <View>
      <Text style={theme.textVariants.ui}>Settings Screen</Text>
      <Text style={theme.textVariants.body}>Settings Screen</Text>
      <Text style={theme.textVariants.body}>Settings Screen</Text>
    </View>
  );
}
