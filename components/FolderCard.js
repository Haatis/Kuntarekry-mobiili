import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { theme } from '../styles/theme';

export default function FolderCard() {
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/12/07/10/58/architect-1080592_960_720.jpg',
  };
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={[theme.outline, theme.cardShadow, styles.card]}>
          <View style={styles.cardRow}>
            <ImageBackground
              imageStyle={[theme.outline, styles.image]}
              style={styles.imageContainer}
              source={image}
              resizeMode="stretch"
            ></ImageBackground>
            <View style={styles.textCol}>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>It-tukihenkilö</Text>
              <Text style={{ fontSize: 12, color: '#808080' }}>8 tallennettua työpaikkaa</Text>
            </View>
          </View>
        </View>
      </View>
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
    marginTop: 16,
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
