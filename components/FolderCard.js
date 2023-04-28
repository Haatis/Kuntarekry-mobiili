import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { theme } from '../styles/theme';

import { useNavigation } from '@react-navigation/native';

export default function FolderCard({ title, amount, type }) {
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/12/07/10/58/architect-1080592_960_720.jpg',
  };
  const navigation = useNavigation();

  return (
    <>
      <Pressable onPress={() => navigation.navigate('FavoriteFolder')} style={styles.cardContainer}>
        <View style={[theme.outline, theme.dropShadow, styles.card]}>
          <View style={styles.cardRow}>
            <ImageBackground
              imageStyle={[theme.outline, styles.image]}
              style={styles.imageContainer}
              source={image}
              resizeMode="stretch"
            ></ImageBackground>
            <View style={styles.textCol}>
              <Text style={theme.textVariants.textL}>{title}</Text>
              <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
                {amount} tallennettua {type === 1 ? 'työpaikkaa' : 'työnantajaa'}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 68,
    width: '100%',
  },
  cardContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardRow: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 8,
  },
  image: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 52,
    width: 52,
  },
  textCol: {
    flexDirection: 'column',
    marginHorizontal: 8,
  },
});
