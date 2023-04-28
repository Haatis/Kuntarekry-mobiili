import { View, Image, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundImage from '../assets/substract.png';
import Logo from '../assets/logo.png';
import Constants from 'expo-constants';

export default function AppBar() {
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
          <Image
            source={Logo}
            resizeMode="contain"
            style={{
              marginTop: Constants.statusBarHeight,
              width: '100%',
              height: 44,
            }}
          />
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Constants.statusBarHeight + 52,
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
