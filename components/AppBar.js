import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackgroundImage from '../assets/substract.png';
import Logo from '../assets/logo.png';
import Constants from 'expo-constants';
import { theme } from '../styles/theme';
import { useState } from 'react';

export default function AppBar({ back, setSave, title, underTitle, isChanged }) {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const navigateBack = () => {
    if (!isChanged) {
      navigation.goBack();
      return;
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirmLeave = () => {
    setShowModal(false);
    navigation.goBack();
  };

  const handleSave = () => {
    setShowModal(false);
    setSave(true);
  };

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
                  onPress={navigateBack}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={36}
                    color={theme.colors.textPrimary}
                  />
                </TouchableOpacity>
              ) : null}
              <View style={styles.textContainer}>
                {underTitle ? (
                  <Text style={{ ...theme.textVariants.uiM, color: 'white', textAlign: 'center' }}>
                    {title}
                  </Text>
                ) : (
                  <Text style={{ ...theme.textVariants.uiL, color: 'white', textAlign: 'center' }}>
                    {title}
                  </Text>
                )}

                {underTitle ? (
                  <Text
                    style={{ ...theme.textVariants.uiAltS, color: 'white', textAlign: 'center' }}
                  >
                    {underTitle}
                  </Text>
                ) : null}
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
      {showModal && <StatusBar style="dark" backgroundColor={theme.colors.darkBackground} />}
      <Modal visible={showModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalButtonContainer}>
            <Text style={{ ...theme.textVariants.uiM, color: 'black' }}>
              Tallentamattomat tiedot häviävät. Haluatko jatkaa?
            </Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Tallenna</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLeave}>
                <Text style={styles.modalButtonText}>Älä tallenna</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Peruuta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  confirmButton: {
    ...theme.outlineDark,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  modalButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    gap: 16,
    marginBottom: 128,
    paddingHorizontal: 8,
    paddingVertical: 32,
  },
  modalContainer: {
    backgroundColor: theme.colors.darkBackground,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: '100%',
  },
  textContainer: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 16,
  },
});
