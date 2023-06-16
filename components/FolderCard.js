import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

export default function FolderCard({ title, amount, type, image }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FavoriteFolder')}
      style={styles.cardContainer}
    >
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />
        <View style={styles.textCol}>
          <Text style={theme.textVariants.textL}>{title}</Text>
          <Text style={{ ...theme.textVariants.textM, color: theme.colors.textSecondary }}>
            {amount} tallennettua {type === 1 ? 'työpaikkaa' : 'työnantajaa'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    height: 68,
    padding: 8,
    width: '100%',
  },
  cardContainer: {
    ...theme.dropShadow,
    ...theme.outline,
    borderRadius: 8,
    width: '100%',
  },
  image: {
    ...theme.outline,
    borderRadius: 8,
    height: 52,
    width: 52,
  },
  textCol: {
    flexDirection: 'column',
  },
});
