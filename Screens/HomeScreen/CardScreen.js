import { View, Text } from 'react-native';
import { theme } from '../../styles/theme';

export default function CardScreen() {
  return (
    <View style={{ backgroundColor: theme.colors.defaultBg, height: '100%' }}>
      <Text>Card Screen</Text>
    </View>
  );
}
