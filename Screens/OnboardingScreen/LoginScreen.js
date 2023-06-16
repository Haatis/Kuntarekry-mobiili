import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/logo.png';
import BackgroundImage from '../../assets/substract.png';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import AuthContext from '../../hooks/useauth';
import { useOnboarding } from '../../hooks/useonboarding';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onboardingDone } = useOnboarding();
  const { setIsLoggedIn } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Käyttäjätunnus ja salasana ovat pakollisia');
      return;
    }

    if (userData && userData.username === username && userData.password === password) {
      if (!onboardingDone) {
        setIsLoggedIn(true);
        navigation.navigate('PersonalizationScreen');
      } else {
        setIsLoggedIn(true);
        navigation.navigate('Home');
      }
    } else {
      alert('Käyttäjätunnus tai salasana on väärin');
    }
  };

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
                <View
                  style={[
                    { borderWidth: 1, borderColor: theme.colors.outlineDark },
                    styles.createButton,
                  ]}
                >
                  <TextInput
                    style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
                    defaultValue=""
                    onChangeText={(text) => setUsername(text)}
                  />
                  <Text style={[theme.textVariants.uiS, styles.labelText]}>Käyttäjätunnus</Text>
                </View>
                <View
                  style={[
                    { borderWidth: 1, borderColor: theme.colors.outlineDark },
                    styles.createButton,
                  ]}
                >
                  <TextInput
                    style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
                    secureTextEntry={true}
                    defaultValue=""
                    onChangeText={(text) => setPassword(text)}
                  />
                  <Text style={[theme.textVariants.uiS, styles.labelText]}>Salasana</Text>
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
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={[theme.textVariants.uiM, { color: 'white' }]}>
                      Kirjaudu sisään
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine} />
                  <Text
                    style={
                      (theme.textVariants.textM,
                      { color: theme.colors.textPrimary, marginBottom: 8 })
                    }
                  >
                    Jos olet uusi kuntarekryssä luo käyttäjä
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}
                    style={styles.buttonSM}
                  >
                    <Text style={[theme.textVariants.uiM, { color: 'white' }]}>
                      Luo uusi käyttäjä
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.horizontalLine,
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        theme.textVariants.textM,
                        {
                          color: theme.colors.textSecondary,
                          position: 'absolute',
                          backgroundColor: 'white',
                          paddingHorizontal: 4,
                        },
                      ]}
                    >
                      tai
                    </Text>
                  </View>
                  <Text
                    style={
                      (theme.textVariants.textM,
                      { color: theme.colors.textPrimary, marginBottom: 8 })
                    }
                  >
                    Voit myös jatkaa kirjautumatta
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      onboardingDone
                        ? navigation.navigate('Home')
                        : navigation.navigate('PersonalizationScreen')
                    }
                    style={styles.buttonSM}
                  >
                    <Text style={[theme.textVariants.uiM, { color: 'white' }]}>
                      Jatka eteenpäin
                    </Text>
                  </TouchableOpacity>
                </View>
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
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonSM: {
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '100%',
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
  horizontalLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 16,
    marginTop: 16,
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  labelText: {
    backgroundColor: 'white',
    color: theme.colors.textSecondary,
    left: 12,
    paddingHorizontal: 4,
    position: 'absolute',
    top: -8,
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
