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

export default function BasicInformation() {
  const { userData } = useContext(AuthContext);
  const [textHeight, setTextHeight] = useState(57);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(userData ? userData.firstName : '');
  const [lastName, setLastName] = useState(userData ? userData.lastName : '');
  const [email, setEmail] = useState(userData ? userData.email : '');
  const [birthday, setBirthday] = useState(userData ? userData.birthday : '');
  const [phoneNumber, setPhoneNumber] = useState(userData ? userData.phoneNumber : '');
  const [employment, setEmployment] = useState(userData ? userData.employment : '');
  const [introduction, setIntroduction] = useState(userData ? userData.introduction : '');
  const { fetchUserData } = useContext(AuthContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const saveUserData = async () => {
    const updatedUserData = {
      ...userData,
      //save new data
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      employment,
      introduction,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    alert('Tiedot tallennettu');
    fetchUserData();
  };

  const saveUserDataAndNavigate = async () => {
    const updatedUserData = {
      ...userData,
      //save new data
      firstName,
      lastName,
      email,
      birthday,
      phoneNumber,
      employment,
      introduction,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    navigation.navigate('PersonalizationScreen2');
  };

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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {userData.locationNames ? (
              userData.locationNames.map((name, index) => (
                <Text key={index} style={[theme.textVariants.uiM, { marginHorizontal: 8 }]}>
                  {name}
                </Text>
              ))
            ) : (
              <Text>Et ole valinnut sijaintia</Text>
            )}
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
              defaultValue={userData ? userData.employment : ''}
              onChangeText={(text) => setEmployment(text)}
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
      <BottomButton buttonText="Tallenna" buttonAction={() => saveUserData()} />
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
});
