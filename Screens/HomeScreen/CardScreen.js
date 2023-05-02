import { View } from 'react-native';
import SwipeableCard from '../../components/SwipeableCard';
import { theme } from '../../styles/theme';
import TestData from '../../components/TestData';

export default function CardScreen() {
  return (
    <View style={theme.containerCenter}>
      <SwipeableCard job={TestData.jobs[0]} />
    </View>
  );
}
