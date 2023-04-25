import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';

export default function Card() {
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/12/07/10/58/architect-1080592_960_720.jpg',
  };

  return (
    <View style={styles.card}>
      <ImageBackground imageStyle={styles.image} source={image}>
        <Text style={[theme.textVariants.textL, { color: 'white' }]}>Kiinteistöhuoltomies</Text>
        <Text style={[theme.textVariants.textM, { color: 'white' }]}>Akaan kaupunki</Text>
      </ImageBackground>
      <Text>
        Akaan kaupunki hakee monipuolisiin ulko- ja viheralueiden kunnossapitotehtäviin
        ammattitaitoista, motivoitunutta, oppimishaluista ja yhteistyökykyistä
        kunnossapitotyöntekijää
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
