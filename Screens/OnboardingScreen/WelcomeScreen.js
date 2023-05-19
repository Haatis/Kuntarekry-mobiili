import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { theme } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/logo.png';
import BackgroundImage from '../../assets/substract.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <LinearGradient
        colors={['rgba(12, 142, 194, 0.9)', 'rgba(51, 204, 128, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <View style={styles.containerOnboarding}>
          <ImageBackground
            source={BackgroundImage}
            style={styles.imageContainer}
            imageStyle={{
              height: '200%',
              resizeMode: 'repeat',
              opacity: 0.7,
              transform: [{ rotateZ: '5deg' }, { scale: 1.5 }],
            }}
          >
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <Image
                  source={Logo}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: 44,
                  }}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[theme.textVariants.textM, { paddingBottom: 8 }]}>
                  <Text style={{ fontWeight: 'bold' }}>Kuntarekrystä</Text> löytyy tuhansia avoimia
                  työpaikkoja kaikkialta Suomesta
                </Text>
                <Text style={[theme.textVariants.textM, { paddingBottom: 8 }]}>
                  <Text style={{ fontWeight: 'bold' }}>Työnhakijoille</Text> tarjoamme työvälineet
                  työpaikkojen, sijaisuuksien ja keikkatöiden hakemiseen sekä tietoa työskentelystä
                  kuntaorganisaatioissa ja hyvinvointialueilla.
                </Text>
                <Text style={[theme.textVariants.textM, { paddingBottom: 8 }]}>
                  <Text style={{ fontWeight: 'bold' }}>Työnantajille</Text> - kunnille,
                  kaupungeille, hyvinvointialueille, kuntayhtymille ja kuntien omistamille
                  yrityksille - tarjoamme rekrytoinnin ohjelmisto- ja asiantuntijapalveluja, jotka
                  sopivat ulkoiseen ja sisäiseen rekrytointiin sekä sijaisuuksien hallintaan.
                </Text>
                <Text style={[theme.textVariants.textM, { paddingBottom: 8 }]}>
                  <Text style={{ fontWeight: 'bold' }}>Löydät meidät myös täältä:</Text>
                </Text>
                <View style={styles.webIconContainer}>
                  <MaterialCommunityIcons name="facebook" size={40} color={theme.colors.primary} />
                  <MaterialCommunityIcons name="twitter" size={40} color={theme.colors.primary} />
                  <MaterialCommunityIcons name="instagram" size={40} color={theme.colors.primary} />
                  <MaterialCommunityIcons name="linkedin" size={40} color={theme.colors.primary} />
                </View>
                <Text style={[theme.textVariants.uiM, { paddingBottom: 8, textAlign: 'center' }]}>
                  Kieli{' '}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
                  <View style={styles.selected}>
                    <Text style={{ fontSize: 28 }}>🇫🇮</Text>
                  </View>
                  <View style={styles.unSelected}>
                    <Text style={{ fontSize: 28 }}>🇸🇪</Text>
                  </View>
                  <View style={styles.unSelected}>
                    <Text style={{ fontSize: 28 }}>🇬🇧</Text>
                  </View>
                </View>
                <Pressable onPress={() => navigation.navigate('LoginScreen')} style={styles.button}>
                  <Text style={[theme.textVariants.uiM, { color: 'white' }]}>Jatka eteenpäin</Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color="white"
                    style={{ marginTop: 3 }}
                  />
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  containerOnboarding: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  contentContainer: {
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: theme.colors.primary,
    borderRadius: 8,
    borderWidth: 4,
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  unSelected: {
    padding: 4,
  },
  webIconContainer: {
    borderBottomWidth: 1,
    borderColor: theme.colors.outline,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    paddingBottom: 16,
  },
});
