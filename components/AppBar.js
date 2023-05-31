import { View, Image, ImageBackground, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundImage from '../assets/substract.png';
import Logo from '../assets/logo.png';
import Constants from 'expo-constants';
import { theme } from '../styles/theme';

export default function AppBar({ back, title, underTitle }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
          {title ? (
            <View style={styles.titleContainer}>
              {back ? (
                <TouchableOpacity
                  style={{
                    ...styles.backButton,
                    ...theme.outlineDark,
                    ...theme.dropShadow,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={36}
                    color={theme.colors.textPrimary}
                  />
                </TouchableOpacity>
              ) : null}
              <View style={styles.textContainer}>
                <Text style={{ ...theme.textVariants.uiM, color: 'white', textAlign: 'center' }}>
                  {title}
                </Text>
                <Text style={{ ...theme.textVariants.uiAltS, color: 'white', textAlign: 'center' }}>
                  {underTitle}
                </Text>
              </View>
              <View style={{ width: 45 }}></View>
            </View>
          ) : (
            <Image
              source={Logo}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 44,
              }}
            />
          )}
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  container: {
    height: Constants.statusBarHeight + 60,
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 16,
  },
});
