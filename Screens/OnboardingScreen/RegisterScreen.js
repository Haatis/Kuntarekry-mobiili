import { View, Text, StyleSheet, ImageBackground, TextInput } from 'react-native';
import CheckBox from 'expo-checkbox';
import { theme } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../../assets/substract.png';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [isChecked, setChecked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const createUser = async () => {
    if (!isChecked) {
      alert('Sinun täytyy hyväksyä käyttöehdot');
      return;
    }

    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      username.trim() === '' ||
      password.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      alert('Kaikki kentät ovat pakollisia');
      return;
    }

    if (password !== confirmPassword) {
      alert('Salasanat eivät täsmää');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      alert('Käyttäjä luotu');
      navigation.navigate('LoginScreen');
    } catch (error) {
      alert('Tapahtui virhe käyttäjän tallentamisessa');
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
          <View style={styles.containerOnboarding}>
            <View style={styles.contentContainer}>
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
                    onChangeText={(text) => setFirstName(text)}
                  />
                  <Text style={[theme.textVariants.uiS, styles.labelText]}>Etunimi</Text>
                </View>

                <View
                  style={[
                    { borderWidth: 1, borderColor: theme.colors.outlineDark },
                    styles.createButton,
                  ]}
                >
                  <TextInput
                    style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
                    defaultValue=""
                    onChangeText={(text) => setLastName(text)}
                  />
                  <Text style={[theme.textVariants.uiS, styles.labelText]}>Sukunimi</Text>
                </View>

                <View
                  style={[
                    { borderWidth: 1, borderColor: theme.colors.outlineDark },
                    styles.createButton,
                  ]}
                >
                  <TextInput
                    style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
                    defaultValue=""
                    onChangeText={(text) => setEmail(text)}
                  />
                  <Text style={[theme.textVariants.uiS, styles.labelText]}>Sähköpostiosoite</Text>
                </View>

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
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                  <Text style={[theme.textVariants.uiS, styles.labelText]}>Salasana uudestaan</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 4 }}>
                  <CheckBox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                  />
                  <Text style={(styles.paragraph, { marginLeft: 4 })}>Hyväksyn käyttöehdot</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable onPress={() => createUser()} style={styles.button}>
                    <Text style={[theme.textVariants.uiM, { color: 'white' }]}>Luo käyttäjä</Text>
                  </Pressable>
                  <Pressable style={styles.button}>
                    <Text style={[theme.textVariants.uiM, { color: 'white' }]}>Käyttöehdot</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
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
    marginVertical: 8,
    paddingVertical: 16,
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  containerOnboarding: {
    flex: 1,
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
  labelText: {
    backgroundColor: 'white',
    color: theme.colors.textSecondary,
    left: 12,
    paddingHorizontal: 4,
    position: 'absolute',
    top: -8,
  },

  textContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
