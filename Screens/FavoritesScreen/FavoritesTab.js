import { View, Text } from 'react-native';
import { theme } from '../../styles/theme';
import FolderCard from '../../components/FolderCard';

export default function FavoritesTab() {
  return (
    <View style={theme.containerTop}>
      <Text style={[theme.textVariants.uiMedium, { color: theme.colors.textPrimary }]}>
        Työpaikat
      </Text>
      <FolderCard />
    </View>
  );
}
