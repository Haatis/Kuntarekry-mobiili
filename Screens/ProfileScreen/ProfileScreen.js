import { View, Text, StyleSheet, Button } from 'react-native';
import { theme } from '../../styles/theme';
import { TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BasicInformation from './BasicInformation';
import BottomButton from '../../components/BottomButton';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const { userData, isLoggedIn, fetchUserData } = useContext(AuthContext);
  const [image, setImage] = useState(userData ? userData.image : '');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const ProfileImage = {
    uri: 'https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_960_720.jpg',
  };

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access media library denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    saveUserData(result.assets[0].uri);
    setModalVisible(false);
  };

  const takePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access camera denied');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    saveUserData(result.assets[0].uri);
    setModalVisible(false);
  };

  const saveUserData = async (img) => {
    const updatedUserData = {
      ...userData,
      image: img, // Add the image URI to the userData object
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
  };

  const renderContent = () => {
    if (isLoggedIn && userData) {
      return (
        <>
          <View style={theme.containerCenter}>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[theme.dropShadow, { borderRadius: 50 }]}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={[theme.outline, styles.imageStyle]}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={ProfileImage}
                    style={[theme.outline, styles.imageStyle]}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
              <Modal transparent={true} visible={modalVisible} animationType="fade">
                <View style={styles.modalContainer}>
                  <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
                    <Text style={styles.optionText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
                    <Text style={styles.optionText}>Choose from Library</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <View style={styles.cameraContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={() => setModalVisible(true)}>
                  <MaterialCommunityIcons name="camera" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ marginTop: 16, fontFamily: 'SourceSansPro', fontSize: 20 }}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text
              style={[
                theme.textVariants.textM,
                {
                  color: theme.colors.textSecondary,
                  marginTop: 16,
                },
              ]}
            >
              {userData.introduction
                ? userData.introduction
                : 'Esittelytekstiä ei ole vielä lisätty'}
            </Text>
            <View style={styles.container}>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(BasicInformation)}
                  style={[theme.outline, styles.square, theme.dropShadow]}
                >
                  <MaterialCommunityIcons
                    name="card-account-details"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Perustiedot</Text>
                </TouchableOpacity>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="file-account"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>CV</Text>
                </View>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="school"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Pätevyydet</Text>
                </View>
              </View>
              <View style={{ ...styles.row, marginVertical: 16 }}>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="account-filter"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Työtoiveet</Text>
                </View>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="file-image"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Portfolio</Text>
                </View>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Muut</Text>
                </View>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[theme.outline, styles.square, theme.dropShadow]}
                  onPress={() => navigation.navigate('SubstitutionsScreen')}
                >
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Keikat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <BottomButton buttonText="Esikatsele profiilia" />
        </>
      );
    } else {
      return (
        <View style={theme.containerCenter}>
          <Text style={styles.loginText}>Kirjaudu sisään nähdäksesi profiilin</Text>
          <Button title="Kirjaudu sisään" onPress={() => navigation.navigate('LoginScreen')} />
        </View>
      );
    }
  };
  return <>{renderContent()}</>;
}
const styles = StyleSheet.create({
  cameraButton: {
    padding: 4,
  },
  cameraContainer: {
    backgroundColor: theme.colors.textPrimary + '50',
    borderRadius: 99,
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
  },
  container: {
    flex: 1,
    marginTop: 32,
    width: '100%',
  },
  imageStyle: {
    borderRadius: 99,
    height: 100,
    width: 100,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.darkBackground,
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
  },
  optionText: {
    color: '#000',
    fontSize: 18,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  square: {
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    gap: 4,
    justifyContent: 'center',
  },
});
