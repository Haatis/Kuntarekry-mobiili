import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import FolderCard from '../../components/FolderCard';

export default function FavoritesTab() {
  return (
    <View style={theme.containerTop}>
      <View style={[theme.outline, styles.createButton]}>
        <Text style={[theme.textVariants.uiMedium, { color: theme.colors.textPrimary }]}>
          Luo uusi kansio
        </Text>
      </View>
      <Text
        style={[theme.textVariants.uiMedium, { color: theme.colors.textPrimary, marginTop: 16 }]}
      >
        Työpaikat
      </Text>
      <FolderCard title="It-tukihenkilö" amount={8} type={1} />
      <FolderCard title="Aikaisemmin katsotut" amount={50} type={1} />
      <FolderCard title="Kaikki suosikit" amount={16} type={1} />
      <Text
        style={[theme.textVariants.uiMedium, { color: theme.colors.textPrimary, marginTop: 16 }]}
      >
        Työnantajat
      </Text>
      <FolderCard title="Kaikki suosikit" amount={16} type={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 40,
    marginHorizontal: 8,
    width: '100%',
  },
});
