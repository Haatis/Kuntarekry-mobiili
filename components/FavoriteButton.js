import { useJobBookmarks } from '../hooks/usejobbookmarks';
import { theme } from '../styles/theme';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoriteButton({ job, employer, size = 24 }) {
  const { favoriteJobs, favoriteEmployers, favoriteJob, favoriteEmployer } = useJobBookmarks();

  const containerLength = Math.round(size * 1.66);

  const handlePress = () => {
    if (job != null) {
      favoriteJob(job.id);
    } else {
      favoriteEmployer(employer);
    }
  };

  const isFavorite =
    job != null
      ? favoriteJobs.some((fav) => fav.jobAdvertisement.id === job.id)
      : favoriteEmployers.some((fav) => fav === employer);

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
