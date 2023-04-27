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
          <Tag tagColor={theme.colors.tag1} tagText="Kokoaikatyö" />
          <Tag tagColor={theme.colors.tag1} tagText="Suomi" />
          <MaterialCommunityIcons name={'chevron-down'} size={24} color={'black'} />
        </View>
        <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
          Akaan kaupunki hakee monipuolisiin ulko- ja viheralueiden kunnossapitotehtäviin
          ammattitaitoista, motivoitunutta, oppimishaluista ja yhteistyökykyistä
          kunnossapitotyöntekijää
        </Text>
        <View style={styles.buttonRow}>
          <View style={[styles.button, { borderColor: theme.colors.danger }]}>
            <MaterialCommunityIcons name={'close-thick'} size={45} color={theme.colors.danger} />
          </View>
          <View style={[styles.button, { borderColor: theme.colors.secondary }]}>
            <MaterialCommunityIcons name={'heart'} size={40} color={theme.colors.secondary} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 40,
    width: 40,
  },
  avatarImage: {
    borderRadius: 30,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 32,
    padding: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: '95%',
    width: '100%',
  },
  cardBottom: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
  },
  gradient: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
  gradient2: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '50%',
  },

  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '100%',
  },
  imageContainer: {
    height: '45%',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  textContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
});
