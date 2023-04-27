import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import FolderCard from '../../components/FolderCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoritesTab() {
  return (
    <View style={theme.containerTop}>
      <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
          Luo uusi kansio
        </Text>
        <MaterialCommunityIcons
          name={'plus'}
          size={40}
          color={theme.colors.textPrimary}
          style={{
            marginHorizontal: -8,
          }}
        />
      </View>
      <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>Työpaikat</Text>
      <FolderCard title="It-tukihenkilö" amount={8} type={1} />
      <FolderCard title="Aikaisemmin katsotut" amount={50} type={1} />
      <FolderCard title="Kaikki suosikit" amount={16} type={1} />
      <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>Työnantajat</Text>
      <FolderCard title="Kaikki suosikit" amount={16} type={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: '100%',
  },
});
