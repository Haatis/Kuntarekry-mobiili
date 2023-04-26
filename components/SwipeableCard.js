import { Pressable, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from './Tag';

export default function SwipeableCard() {
  const jobImage = {
    uri: 'https://cdn.pixabay.com/photo/2019/02/06/16/32/architect-3979490_960_720.jpg',
  };
  const employerImage = {
    uri: 'https://cdn.pixabay.com/photo/2017/07/10/22/40/daisy-2491831_960_720.jpg',
  };

  return (
    <View style={[theme.outline, theme.dropShadow, styles.card]}>
      <ImageBackground
        imageStyle={styles.image}
        style={styles.imageContainer}
        source={jobImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient2}
          >
            <View style={styles.cardTop}>
              <Pressable style={[theme.outline, styles.avatar]}>
                <Image style={styles.avatarImage} source={employerImage} />
              </Pressable>
              <View style={styles.textContainer}>
                <Text style={[theme.textVariants.textL, { color: 'white' }]}>
                  Kiinteistöhuoltomies
                </Text>
                <Text style={[theme.textVariants.textM, { color: 'white' }]}>Akaan kaupunki</Text>
              </View>
              <MaterialCommunityIcons name={'chevron-right'} size={40} color={'white'} />
            </View>
          </LinearGradient>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.cardBottom}>
        <Text style={[theme.textVariants.textM, { color: theme.colors.button }]}>
          Haku päättyy: 11.11.2023
        </Text>
        <View style={styles.tagRow}>
          <Tag tagColor={theme.colors.tag2} tagText="Vakinainen" />
        </View>
        <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
          Akaan kaupunki hakee monipuolisiin ulko- ja viheralueiden kunnossapitotehtäviin
          ammattitaitoista, motivoitunutta, oppimishaluista ja yhteistyökykyistä
          kunnossapitotyöntekijää
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  avatarImage: {
    flex: 1,
    borderRadius: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: '85%',
  },
  cardTop: {
    padding: 16,
    gap: 16,
    flexDirection: 'row',
  },
  cardBottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  image: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: '100%',
  },
  imageContainer: {
    height: '50%',
  },
  textHeader: {
    color: 'white',
  },
  textContainer: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  gradient2: {
    height: '50%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
