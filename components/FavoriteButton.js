import { updateStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import { theme } from '../styles/theme';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoriteButton({ job, employer }) {
  const { favorites, updateFavorites } = useFavoriteList();

  const handlePress = async () => {
    if (job != null) {
      await updateStoredList('job', job);
    } else {
      await updateStoredList('employer', employer);
    }
    updateFavorites();
  };

  const isFavorite =
    job != null
      ? favorites.jobs.some((fav) => fav.id === job.id)
      : favorites.employers.some((fav) => fav === employer);

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <MaterialCommunityIcons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={24}
        color={theme.colors.secondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: theme.colors.secondary,
    borderRadius: 100,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
