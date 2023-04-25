import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Card() {
  return (
    <View style={{ flex: 1, backgroundColor: 'yellow' }}>
      <Text>Kiinteistöhuoltomies</Text>
      <Text>Akaan kaupunki</Text>
      <Text>
        Akaan kaupunki hakee monipuolisiin ulko- ja viheralueiden kunnossapitotehtäviin
        ammattitaitoista, motivoitunutta, oppimishaluista ja yhteistyökykyistä
        kunnossapitotyöntekijää
      </Text>
    </View>
  );
}
