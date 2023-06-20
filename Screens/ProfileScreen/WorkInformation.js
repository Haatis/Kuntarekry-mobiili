import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import BottomButton from '../../components/BottomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TagLarge from '../../components/Tags/TagLarge';
import { useState } from 'react';
import { useEffect } from 'react';

export default function WorkInformation({ save, setSave, setIsChanged, isChanged }) {
  const { userData } = useContext(AuthContext);
  const employmentOptions = ['Kokoaikatyö', 'Osaaikatyö', '3-vuorotyö', 'Tuntityö', '2-vuorotyö'];
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(userData.employment || []);

  useEffect(() => {
    if (selectedOptions !== userData.employment) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (save) {
      saveUserData();
      setSave(false);
    }
  }, [save]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions([...selectedOptions, option]);
    setShowOptions(false);
  };

  const removeEmploymentTag = (tag) => {
    const updatedOptions = selectedOptions.filter((option) => option !== tag);
    setSelectedOptions(updatedOptions);
  };

  const filteredOptions = employmentOptions.filter((option) => !selectedOptions.includes(option));
  const [taskData, setTaskData] = useState([]);
  const navigation = useNavigation();

  const { fetchUserData } = useContext(AuthContext);

  const saveUserData = async () => {
    const updatedUserData = {
      ...userData,
      employment: selectedOptions,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    navigation.goBack();
  };

  const saveUserDataAndNavigate = async () => {
    const updatedUserData = {
      ...userData,
      employment: selectedOptions,
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    navigation.navigate('PersonalizationScreen');
  };

  const removeTag = (name) => {
    const updatedUserData = {
      ...userData,
      taskNames: userData.taskNames.filter((locationObj) => locationObj.name !== name),
    };

    AsyncStorage.setItem('userData', JSON.stringify(updatedUserData))
      .then(() => fetchUserData())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (userData.locationNames) {
      const nameSet = new Set();
      const parentSet = new Set();
      const taskData = [];

      userData.taskNames.forEach((obj) => {
        if (obj.name) nameSet.add(obj.name);
        if (obj.parent) parentSet.add(obj.parent);
      });

      nameSet.forEach((name) => {
        taskData.push({ name: name });
      });

      parentSet.forEach((parent) => {
        taskData.push({ parent: parent });
      });

      setTaskData(taskData);
    }
  }, [userData]);

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={theme.containerTop}>
          <Text style={theme.textVariants.uiM}>Työn tyyppi</Text>
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
              {taskData ? (
                taskData
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
          <Text style={theme.textVariants.uiM}>Työsuhde</Text>
          <TouchableOpacity
            onPress={toggleOptions}
            style={[theme.outline, theme.dropShadow, styles.createButton]}
          >
            <Text
              style={[theme.textVariants.uiM, { color: theme.colors.textPrimary, width: '80%' }]}
            >
              {'Valitse työsuhde'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="chevron-down"
                size={30}
                color={theme.colors.textPrimary}
              />
            </View>
          </TouchableOpacity>

          {showOptions && (
            <View style={styles.optionsContainer}>
              {filteredOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleOptionSelect(option)}
                  style={styles.optionItem}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {selectedOptions.length > 0 ? (
            <View style={styles.tagRow}>
              {selectedOptions.map((option, index) => (
                <TagLarge
                  key={index}
                  tagText={option}
                  tagColor={theme.colors.tag3}
                  tagClose={true}
                  larger={true}
                  onPressClose={() => removeEmploymentTag(option)}
                />
              ))}
            </View>
          ) : (
            <Text>Et ole valinnut työsuhdetta</Text>
          )}
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
  tagRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
  },
});
