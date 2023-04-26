import { View, Text } from 'react-native';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';

export default function SearchScreen() {
  return (
    <View style={theme.containerTop}>
      <SmallCard />
      <SmallCard />
    </View>
  );
}
