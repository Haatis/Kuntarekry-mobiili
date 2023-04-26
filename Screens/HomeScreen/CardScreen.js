import { View } from 'react-native';
import SwipeableCard from '../../components/SwipeableCard';
import { theme } from '../../styles/theme';

export default function CardScreen() {
  return (
    <View style={theme.containerCenter}>
      <SwipeableCard />
    </View>
  );
}
