import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import FolderCard from '../../components/FolderCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFavoriteList } from '../../hooks/usefavoritelist';

export default function FavoritesTab() {
  const { favorites } = useFavoriteList();
  const placeholderImage =
    'https://cdn.pixabay.com/photo/2015/12/07/10/58/architect-1080592_960_720.jpg';
  const imgNumber = favorites.jobs[favorites.jobs.length - 1]?.organization.length;
  const randomJobImage = `https://source.unsplash.com/random/&sig=${imgNumber}?job`;
  return (
    <View style={theme.containerTop}>
      <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
          Luo uusi kansio
        </Text>
        <MaterialCommunityIcons
          name="plus"
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
      {favorites.jobs.length > 0 ? (
        <FolderCard
          title="Kaikki suosikit"
          amount={favorites.jobs.length}
          type={1}
          image={randomJobImage}
        />
      ) : (
        <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
          Sinulla ei ole tallennettuja työpaikkoja. Napauta sydäntä työpaikka ilmoituksen sivulla
          tallentaaksesi työpaikan suosikkeihin.
        </Text>
      )}
      <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>Työnantajat</Text>
      {favorites.employers.length > 0 ? (
        <FolderCard
          title="Kaikki suosikit"
          amount={favorites.employers.length}
          type={2}
          image={placeholderImage}
        />
      ) : (
        <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
          Sinulla ei ole tallennettuja työnantajia. Napauta sydäntä työnantajan sivulla
          tallentaaksesi työnantajan suosikkeihin.
        </Text>
      )}
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
