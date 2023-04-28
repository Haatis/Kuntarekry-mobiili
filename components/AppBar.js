import { View, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import bgImage from '../assets/rajattu.png';
import KuntaRekrySVG from '../assets/logo.png';

export default function AppBar({ back }) {
  const navigation = useNavigation();

  return (
    <View style={{ height: 80, flexDirection: 'row', overflow: 'hidden' }}>
      <LinearGradient
        colors={['rgba(12, 142, 194, 0.9)', 'rgba(51, 204, 128, 0.9)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={bgImage}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
          imageStyle={{
            flex: 1,
            height: '200%',
            resizeMode: 'repeat',
            opacity: 0.7,
            transform: [{ rotateZ: '15deg' }],
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}
          >
            {back ? (
              <Ionicons
                name="arrow-back"
                size={24}
                color="white"
                onPress={() => navigation.goBack()}
              />
            ) : null}
            <Image source={KuntaRekrySVG} resizeMode="contain" style={{ width: 215, height: 44 }} />
            <View style={{ width: 24 }} />
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
}
