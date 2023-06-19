import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../../hooks/useauth';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import BasicInformation from './BasicInformation';
import BottomButton from '../../components/BottomButton';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const { userData, isLoggedIn, fetchUserData } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(userData.image ? userData.image : '');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log('Permission to access media library denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
    }
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
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPreviewImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setPreviewImage('');
  };

  const saveImage = () => {
    saveUserData(previewImage);
    setModalVisible(false);
  };

  const cancel = () => {
    setPreviewImage(userData.image ? userData.image : '');
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
          {modalVisible && <StatusBar style="dark" backgroundColor={theme.colors.darkBackground} />}
          <View style={theme.containerCenter}>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ ...theme.dropShadow, borderRadius: 99 }}
              >
                {userData.image ? (
                  <Image
                    source={{ uri: userData.image }}
                    style={styles.imageStyle}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={{
                      ...styles.imageStyle,
                      overflow: 'hidden',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={90}
                      color={theme.colors.inactive}
                    />
                  </View>
                )}
              </TouchableOpacity>
              <Modal transparent={true} visible={modalVisible} style={{ width: '100%' }}>
                <Pressable
                  style={styles.modalContainer}
                  activeOpacity={1}
                  onPress={() => setModalVisible(false)}
                >
                  <Pressable style={styles.modalButtonContainer}>
                    <Text style={{ ...theme.textVariants.uiM, color: 'black' }}>
                      Valitse profiilikuva
                    </Text>
                    <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                      <Text style={[theme.textVariants.uiL, { color: theme.colors.textPrimary }]}>
                        Valitse kuva
                      </Text>
                      <MaterialCommunityIcons
                        name="plus"
                        size={40}
                        color={theme.colors.textPrimary}
                        style={{ marginVertical: -99, marginHorizontal: -4 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
                      <Text style={[theme.textVariants.uiL, { color: theme.colors.textPrimary }]}>
                        Ota kuva
                      </Text>
                      <MaterialCommunityIcons
                        name="camera"
                        size={32}
                        color={theme.colors.textPrimary}
                        style={{ marginVertical: -99 }}
                      />
                    </TouchableOpacity>
                    {previewImage ? (
                      <View style={{ ...theme.dropShadow, borderRadius: 99 }}>
                        <Image
                          source={{ uri: previewImage }}
                          style={{ ...styles.imageStyle }}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={deleteImage}
                          style={{ position: 'absolute', top: -4, right: -4 }}
                        >
                          <MaterialCommunityIcons
                            name="close-thick"
                            size={20}
                            color={theme.colors.textPrimary}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View
                        style={{
                          ...styles.imageStyle,
                          ...theme.dropShadow,
                          overflow: 'hidden',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialCommunityIcons
                          name="account"
                          size={90}
                          color={theme.colors.inactive}
                        />
                      </View>
                    )}
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <TouchableOpacity style={styles.confirmButton} onPress={saveImage}>
                        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                          Tallenna
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.confirmButton} onPress={cancel}>
                        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                          Peruuta
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                </Pressable>
              </Modal>
              <TouchableOpacity style={styles.cameraButton} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="camera" size={24} color="white" />
              </TouchableOpacity>
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
              {userData.employment ? userData.employment : 'Esittelytekstiä ei ole vielä lisätty'}
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
                <TouchableOpacity
                  style={[theme.outline, styles.square, theme.dropShadow]}
                  onPress={() => navigation.navigate('WorkInformation')}
                >
                  <MaterialCommunityIcons
                    name="account-filter"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Työtoiveet</Text>
                </TouchableOpacity>
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
          <BottomButton
            buttonText="Esikatsele profiilia"
            buttonAction={() => navigation.navigate('PreviewProfileScreen')}
          />
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
  actionButton: {
    ...theme.outline,
    ...theme.dropShadow,
    alignItems: 'center',
    borderRadius: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  cameraButton: {
    backgroundColor: theme.colors.darkBackground,
    borderRadius: 99,
    bottom: 0,
    padding: 4,
    position: 'absolute',
    right: 0,
  },
  confirmButton: {
    ...theme.outlineDark,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  container: {
    flex: 1,
    marginTop: 32,
    width: '100%',
  },
  imageStyle: {
    ...theme.outline,
    borderRadius: 99,
    height: 100,
    width: 100,
  },
  modalButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    gap: 16,
    marginBottom: 128,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  modalContainer: {
    backgroundColor: theme.colors.darkBackground,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: '100%',
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
    gap: 8,
    justifyContent: 'center',
  },
});
