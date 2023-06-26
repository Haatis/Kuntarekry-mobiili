import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import BottomButton from '../../components/BottomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import TagLarge from '../../components/Tags/TagLarge';
import { useEffect } from 'react';

export default function BasicInformation({ save, setSave, setIsChanged, isChanged }) {
  const { userData } = useContext(AuthContext);
  const textHeight = 57;
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(userData ? userData.firstName : '');
  const [lastName, setLastName] = useState(userData ? userData.lastName : '');
  const [email, setEmail] = useState(userData ? userData.email : '');
  const [birthday, setBirthday] = useState(userData ? userData.birthday : '');
  const [phoneNumber, setPhoneNumber] = useState(userData ? userData.phoneNumber : '');
  const [employmentInfo, setEmploymentInfo] = useState(userData ? userData.employmentInfo : '');
  const [introduction, setIntroduction] = useState(userData ? userData.introduction : '');
  const { fetchUserData } = useContext(AuthContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    if (
      firstName !== userData.firstName ||
      lastName !== userData.lastName ||
      email !== userData.email ||
      birthday !== userData.birthday ||
      phoneNumber !== userData.phoneNumber ||
      employmentInfo !== userData.employmentInfo ||
      introduction !== userData.introduction
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [firstName, lastName, email, birthday, phoneNumber, employmentInfo, introduction]);

  const saveUserData = async () => {
    const updatedUserData = {
      ...userData,
      //save new data
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      employmentInfo,
      introduction,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    navigation.goBack();
  };

  useEffect(() => {
    if (save) {
      saveUserData();
      setSave(false);
    }
  }, [save]);

  const saveUserDataAndNavigate = async () => {
    const updatedUserData = {
      ...userData,
      //save new data
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      employmentInfo,
      introduction,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    navigation.navigate('PersonalizationScreen2');
  };

  const removeTag = (name) => {
    const updatedUserData = {
      ...userData,
      locationNames: userData.locationNames.filter((locationObj) => locationObj.name !== name),
    };

    AsyncStorage.setItem('userData', JSON.stringify(updatedUserData))
      .then(() => fetchUserData())
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (userData.locationNames) {
      const nameSet = new Set();
      const parentSet = new Set();
      const locationData = [];

      userData.locationNames.forEach((obj) => {
        if (obj.name) nameSet.add(obj.name);
        if (obj.parent) parentSet.add(obj.parent);
      });

      nameSet.forEach((name) => {
        locationData.push({ name: name });
      });

      parentSet.forEach((parent) => {
        locationData.push({ parent: parent });
      });

      setLocationData(locationData);
    }
  }, [userData]);

  return (
    <>
      <ScrollView>
        <View style={theme.containerTop}>
          <Text style={theme.textVariants.uiM}>Henkilötiedot</Text>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue={userData ? userData.firstName : ''}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Etunimi</Text>
          </View>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue={userData ? userData.lastName : ''}
              onChangeText={(text) => setLastName(text)}
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Sukunimi</Text>
          </View>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text
                style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              >
                {birthday ? moment(birthday).format('DD.MM.YYYY') : 'pp.kk.vvvv'}
              </Text>
            </TouchableOpacity>
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Syntymäaika</Text>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={birthday ? new Date(birthday) : new Date()}
              mode="date"
              display="spinner"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) {
                  setBirthday(date.toISOString());
                }
              }}
            />
          )}

          <Text style={theme.textVariants.uiM}>Yhteystiedot</Text>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue={userData ? userData.phoneNumber : ''}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Puhelinnumero</Text>
          </View>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue={userData ? userData.email : ''}
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Sähköposti</Text>
          </View>
          <Text style={theme.textVariants.uiM}>Sijainti</Text>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: 16,
            }}
          >
            <View style={styles.tagRow}>
              {locationData ? (
                locationData
                  .filter((obj) => obj.name) // Exclude objects without the name property
                  .map((obj, index) => (
                    <TagLarge
                      key={index}
                      tagText={obj.name}
                      tagColor={theme.colors.tag3}
                      tagClose={true}
                      larger={true}
                      onPressClose={() => removeTag(obj.name)}
                    />
                  ))
              ) : (
                <Text>Et ole valinnut sijaintia</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                saveUserDataAndNavigate();
              }}
              style={styles.editButton}
            >
              <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                Muokkaa
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                style={{ marginTop: 2 }}
                color={theme.colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
          <Text style={theme.textVariants.uiM}>Profiilin tiedot</Text>
          <View
            style={[
              { borderWidth: 1, borderColor: theme.colors.outlineDark, height: textHeight },
              styles.createButton2,
            ]}
          >
            <TextInput
              style={[theme.textVariants.textL, { color: theme.colors.textPrimary, flex: 1 }]}
              placeholder="Kerro tilanteesi muutamalla lauseella"
              defaultValue={userData ? userData.employmentInfo : ''}
              onChangeText={(text) => setEmploymentInfo(text)}
              multiline={true}
              numberOfLines={4}
              maxLength={150}
            />
          </View>
          <View
            style={[
              { borderWidth: 1, borderColor: theme.colors.outlineDark, height: textHeight },
              styles.createButton2,
            ]}
          >
            <TextInput
              style={[theme.textVariants.textL, { color: theme.colors.textPrimary, flex: 1 }]}
              placeholder="Esittele itsesi lyhyesti"
              defaultValue={userData ? userData.introduction : ''}
              onChangeText={(text) => setIntroduction(text)}
              multiline={true}
              numberOfLines={4}
              maxLength={300}
            />
          </View>
        </View>
      </ScrollView>
      {isChanged ? (
        <BottomButton buttonText="Tallenna ja jatka" buttonAction={() => saveUserData()} />
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  createButton2: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  editButton: {
    alignItems: 'center',
    borderColor: theme.colors.outlineDark,
    borderRadius: 30,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  labelText: {
    backgroundColor: 'white',
    color: theme.colors.textSecondary,
    left: 12,
    paddingHorizontal: 4,
    position: 'absolute',
    top: -8,
  },
  tagRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
});
