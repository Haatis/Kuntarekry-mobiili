import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useOnboarding } from '../../hooks/useonboarding';
import { theme } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/logo.png';
import BackgroundImage from '../../assets/substract.png';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function LoginScreen() {
  const { finishOnboarding } = useOnboarding();
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
                <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
                  <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
                    Käyttäjätunnus
                  </Text>
                  <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
                    PekkaVi80
                  </Text>
                </View>
                <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
                  <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
                    Salasana
                  </Text>
                  <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
                    ********
                  </Text>
                </View>
                <View style={{ marginVertical: 8 }}>
                  <Text
                    style={[
                      theme.textVariants.textM,
                      { color: theme.colors.primary, textAlign: 'right' },
                    ]}
                  >
                    Unohditko salasanasi?
                  </Text>
                </View>
                <Pressable onPress={() => finishOnboarding()} style={styles.button}>
                  <Text style={[theme.textVariants.uiM, { color: 'white' }]}>
                    FINISH ONBOARDING
                  </Text>
                  <MaterialCommunityIcons
                    name={'chevron-right'}
                    size={22}
                    color={'white'}
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
    marginTop: 8,
    paddingVertical: 16,
  },
  containerOnboarding: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: '100%',
  },
  contentContainer: {
    width: '100%',
  },
  createButton: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
