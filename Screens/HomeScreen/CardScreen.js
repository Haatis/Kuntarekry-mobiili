import { View } from 'react-native';
import Card from '../../components/card';
import { theme } from '../../styles/theme';

export default function CardScreen() {
  return (
    <View style={theme.container}>
      <Card />
    </View>
  );
}
