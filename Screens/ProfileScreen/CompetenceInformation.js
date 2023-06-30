import { View, Text, StyleSheet, TextInput } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import BottomButton from '../../components/BottomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TagLarge from '../../components/Tags/TagLarge';
import { useEffect } from 'react';
import { Modal, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';

export default function CompetenceInformation({ save, setSave, isChanged }) {
  const { userData } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const { fetchUserData } = useContext(AuthContext);
  const [type, setType] = useState('');
  const [school, setSchool] = useState('');
  const [employer, setEmployer] = useState('');
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker2, setShowDatePicker2] = useState(false);
  console.log(userData);
  const saveUserData = async () => {
    let updatedWorkExperience = userData.workExperience;
    let updatedEducation = userData.education;

    if (type === 'työkokemus') {
      if (userData.workExperience) {
        updatedWorkExperience = [
          ...userData.workExperience,
          { employer, title, start, end, description },
        ];
      } else {
        updatedWorkExperience = [{ employer, title, start, end, description }];
      }
    }

    if (type === 'koulutus') {
      if (userData.education) {
        updatedEducation = [...userData.education, { school, title, start, end, description }];
      } else {
        updatedEducation = [{ school, title, start, end, description }];
      }
    }

    const updatedUserData = {
      ...userData,
      workExperience: type === 'työkokemus' ? updatedWorkExperience : userData.workExperience,
      education: type === 'koulutus' ? updatedEducation : userData.education,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    setEmployer('');
    setSchool('');
    setTitle('');
    setStart('');
    setEnd('');
    setDescription('');
    setModalVisible(false);
  };

  useEffect(() => {
    if (save) {
      saveUserData();
      setSave(false);
    }
  }, [save]);

  const deleteWorkExperience = async (index) => {
    const updatedWorkExperience = userData.workExperience.filter((_, i) => i !== index);

    const updatedUserData = {
      ...userData,
      workExperience: updatedWorkExperience,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
    fetchUserData();
  };
  const deleteEducation = async (index) => {
    const updatedEducation = userData.education.filter((_, i) => i !== index);

    const updatedUserData = {
      ...userData,
      education: updatedEducation,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
    fetchUserData();
  };

  const openModal = (type) => {
    setType(type);
    setModalVisible(true);
    if (type === 'taidot') {
      setModalText('Lisää taito');
      setModalDescription('Lisää taitoja, joita sinulla on');
    } else if (type === 'lisenssit') {
      setModalText('Lisää lisenssi');
      setModalDescription('Lisää lisenssejä, joita sinulla on');
    } else if (type === 'kielet') {
      setModalText('Lisää kieli');
      setModalDescription('Lisää kieliä, joita osaat');
    } else if (type === 'sertifioinnit') {
      setModalText('Lisää sertifiointi');
      setModalDescription('Lisää sertifiointeja, joita sinulla on');
    } else if (type === 'työkokemus') {
      setModalText('Lisää työkokemus');
      setModalDescription('enintään 150 merkkiä');
    } else if (type === 'koulutus') {
      setModalText('Lisää koulutus');
      setModalDescription('enintään 150 merkkiä');
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Modal
          transparent={true}
          visible={modalVisible}
          style={{ width: '100%' }}
          animationType="fade"
          statusBarTranslucent
        >
          <Pressable
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <Pressable style={styles.modalButtonContainer}>
              <Text style={{ ...theme.textVariants.uiM, color: 'black' }}>{modalText}</Text>
              {type === 'työkokemus' && (
                <>
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TextInput
                      style={[
                        theme.textVariants.textM,
                        { color: theme.colors.textPrimary, flex: 1 },
                      ]}
                      defaultValue={''}
                      onChangeText={(text) => setTitle(text)}
                    />
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>Työnimike</Text>
                  </View>
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TextInput
                      style={[
                        theme.textVariants.textM,
                        { color: theme.colors.textPrimary, flex: 1 },
                      ]}
                      defaultValue={''}
                      onChangeText={(text) => setEmployer(text)}
                    />
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>Työnantaja</Text>
                  </View>
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
                        {start === '' ? 'pp.kk.vvvv' : moment(start).format('DD.MM.YYYY')}
                      </Text>
                    </TouchableOpacity>
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>
                      Aloituspäivämäärä
                    </Text>
                  </View>
                  {showDatePicker && (
                    <DateTimePicker
                      value={start ? new Date(start) : new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                          setStart(date.toISOString());
                        }
                      }}
                    />
                  )}
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TouchableOpacity onPress={() => setShowDatePicker2(true)}>
                      <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
                        {end === '' ? 'pp.kk.vvvv' : moment(end).format('DD.MM.YYYY')}
                      </Text>
                    </TouchableOpacity>
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>
                      Lopetuspäivämäärä
                    </Text>
                  </View>
                  {showDatePicker2 && (
                    <DateTimePicker
                      value={end ? new Date(end) : new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        setShowDatePicker2(false);
                        if (date) {
                          setEnd(date.toISOString());
                        }
                      }}
                    />
                  )}

                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark, height: 57 },
                      styles.createButton2,
                    ]}
                  >
                    <TextInput
                      style={[
                        theme.textVariants.textL,
                        { color: theme.colors.textPrimary, flex: 1 },
                      ]}
                      placeholder="Kirjoita lyhyt kuvaus työstä"
                      defaultValue={''}
                      onChangeText={(text) => setDescription(text)}
                      multiline={true}
                      numberOfLines={4}
                      maxLength={300}
                    />
                  </View>
                </>
              )}
              {type === 'koulutus' && (
                <>
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TextInput
                      style={[
                        theme.textVariants.textM,
                        { color: theme.colors.textPrimary, flex: 1 },
                      ]}
                      defaultValue={''}
                      onChangeText={(text) => setTitle(text)}
                    />
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>Tutkinto</Text>
                  </View>
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TextInput
                      style={[
                        theme.textVariants.textM,
                        { color: theme.colors.textPrimary, flex: 1 },
                      ]}
                      defaultValue={''}
                      onChangeText={(text) => setSchool(text)}
                    />
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>Oppilaitos</Text>
                  </View>
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
                        {start === '' ? 'pp.kk.vvvv' : moment(start).format('DD.MM.YYYY')}
                      </Text>
                    </TouchableOpacity>
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>
                      Aloituspäivämäärä
                    </Text>
                  </View>
                  {showDatePicker && (
                    <DateTimePicker
                      value={start ? new Date(start) : new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) {
                          setStart(date.toISOString());
                        }
                      }}
                    />
                  )}
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark },
                      styles.createButton,
                    ]}
                  >
                    <TouchableOpacity onPress={() => setShowDatePicker2(true)}>
                      <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
                        {end === '' ? 'pp.kk.vvvv' : moment(end).format('DD.MM.YYYY')}
                      </Text>
                    </TouchableOpacity>
                    <Text style={[theme.textVariants.uiS, styles.labelText]}>
                      Lopetuspäivämäärä
                    </Text>
                  </View>
                  {showDatePicker2 && (
                    <DateTimePicker
                      value={end ? new Date(end) : new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {
                        setShowDatePicker2(false);
                        if (date) {
                          setEnd(date.toISOString());
                        }
                      }}
                    />
                  )}
                  <View
                    style={[
                      { borderWidth: 1, borderColor: theme.colors.outlineDark, height: 57 },
                      styles.createButton2,
                    ]}
                  >
                    <TextInput
                      style={[
                        theme.textVariants.textL,
                        { color: theme.colors.textPrimary, flex: 1 },
                      ]}
                      placeholder="Kirjoita lyhyt kuvaus koulutuksesta"
                      defaultValue={''}
                      onChangeText={(text) => setDescription(text)}
                      multiline={true}
                      numberOfLines={4}
                      maxLength={300}
                    />
                  </View>
                </>
              )}
              <Text
                style={{
                  ...theme.textVariants.uiM,
                  color: theme.colors.textSecondary,
                  flexDirection: 'row',
                  textAlignVertical: 'top',
                  alignSelf: 'flex-start',
                  paddingHorizontal: 8,
                }}
              >
                {modalDescription}
              </Text>

              <View style={{ flexDirection: 'row', gap: 16 }}>
                <TouchableOpacity onPress={() => saveUserData()} style={styles.confirmButton}>
                  <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                    Tallenna
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
                    Peruuta
                  </Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        <View style={theme.containerTop}>
          <Text style={theme.textVariants.uiM}>Työkokemus</Text>
          <TouchableOpacity
            onPress={() => openModal('työkokemus')}
            style={[theme.outline, theme.dropShadow, styles.createButton2]}
          >
            <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
              Lisää työkokemus
            </Text>
            <MaterialCommunityIcons
              name="plus"
              size={40}
              color={theme.colors.textPrimary}
              style={{
                marginHorizontal: -8,
              }}
            />
          </TouchableOpacity>
          {userData?.workExperience?.map((item, index) => (
            <View
              key={index}
              style={[
                theme.outline,
                theme.dropShadow,
                styles.createButton,
                { flexDirection: 'column' },
              ]}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
                onPress={() => deleteWorkExperience(index)}
              >
                <MaterialCommunityIcons
                  name="close-thick"
                  size={20}
                  color={theme.colors.textPrimary}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={[
                    theme.textVariants.uiM,
                    { color: theme.colors.textPrimary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.employer}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {item.description}
                </Text>

                <Text
                  style={[
                    theme.textVariants.uiAltS,
                    { color: theme.colors.button, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {moment(item.start).format('DD.MM.YYYY')} -{' '}
                  {item.end ? moment(item.end).format('DD.MM.YYYY') : 'Nykyhetkeen'}
                </Text>
              </View>
            </View>
          ))}
          <Text style={theme.textVariants.uiM}>Koulutus</Text>
          <TouchableOpacity
            onPress={() => openModal('koulutus')}
            style={[theme.outline, theme.dropShadow, styles.createButton2]}
          >
            <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
              Lisää koulutus
            </Text>
            <MaterialCommunityIcons
              name="plus"
              size={40}
              color={theme.colors.textPrimary}
              style={{
                marginHorizontal: -8,
              }}
            />
          </TouchableOpacity>
          {userData?.education?.map((item, index) => (
            <View
              key={index}
              style={[
                theme.outline,
                theme.dropShadow,
                styles.createButton,
                { flexDirection: 'column' },
              ]}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
                onPress={() => deleteEducation(index)}
              >
                <MaterialCommunityIcons
                  name="close-thick"
                  size={20}
                  color={theme.colors.textPrimary}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={[
                    theme.textVariants.uiM,
                    { color: theme.colors.textPrimary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.school}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {item.description}
                </Text>

                <Text
                  style={[
                    theme.textVariants.uiAltS,
                    { color: theme.colors.button, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {moment(item.start).format('DD.MM.YYYY')} -{' '}
                  {item.end ? moment(item.end).format('DD.MM.YYYY') : 'Nykyhetkeen'}
                </Text>
              </View>
            </View>
          ))}
          <Text style={theme.textVariants.uiM}>Taidot</Text>
          <TagLarge onPressClose={() => openModal('taidot')} tagText={'Lisää'} tagPlus={true} />
          <Text style={theme.textVariants.uiM}>Lisenssit</Text>
          <TagLarge onPressClose={() => openModal('lisenssit')} tagText={'Lisää'} tagPlus={true} />
          <Text style={theme.textVariants.uiM}>Kielet</Text>
          <TagLarge onPressClose={() => openModal('kielet')} tagText={'Lisää'} tagPlus={true} />
          <Text style={theme.textVariants.uiM}>Sertifioinnit</Text>
          <TagLarge
            onPressClose={() => openModal('sertifioinnit')}
            tagText={'Lisää'}
            tagPlus={true}
          />
        </View>
      </ScrollView>
      {isChanged ? (
        <BottomButton buttonText="Tallenna ja jatka" buttonAction={() => saveUserData()} />
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  confirmButton: {
    ...theme.outlineDark,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
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
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
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
});
