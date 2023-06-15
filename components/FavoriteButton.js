import { updateStoredList, useFavoriteList } from '../hooks/usefavoritelist';
import { theme } from '../styles/theme';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoriteButton({ job, employer, size = 24 }) {
  const { favorites, updateFavorites } = useFavoriteList();

  const containerLength = Math.round(size * 1.66);

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
    <TouchableOpacity
      style={{ ...styles.button, height: containerLength, width: containerLength }}
      onPress={handlePress}
    >
      <MaterialCommunityIcons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={theme.colors.secondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: theme.colors.secondary,
    borderRadius: 99,
    borderWidth: 2,
    justifyContent: 'center',
  },
});
