import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { theme } from '../styles/theme';

export default function FolderCard() {
  const image = {
    uri: 'https://cdn.pixabay.com/photo/2015/12/07/10/58/architect-1080592_960_720.jpg',
  };
  return (
    <View>
      <View style={[theme.cardOutline, theme.cardShadow, styles.card]}>
        <ImageBackground
          imageStyle={styles.image}
          style={styles.imageContainer}
          source={image}
          resizeMode="stretch"
        >
          <Text style={[theme.textVariants.textL, { color: 'white' }]}>Kiinteistöhuoltomies</Text>
          <Text style={[theme.textVariants.textM, { color: 'white' }]}>Akaan kaupunki</Text>
        </ImageBackground>
        <Text>
          Akaan kaupunki hakee monipuolisiin ulko- ja viheralueiden kunnossapitotehtäviin
          ammattitaitoista, motivoitunutta, oppimishaluista ja yhteistyökykyistä
          kunnossapitotyöntekijää
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: '85%',
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: '100%',
  },
  imageContainer: {
    height: '50%',
  },
});
