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

export default function WorkInformation() {
  const { userData } = useContext(AuthContext);

  const navigation = useNavigation();

  const { fetchUserData } = useContext(AuthContext);

  const saveUserData = async () => {
    const updatedUserData = {
      ...userData,
      //save new data
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    alert('Tiedot tallennettu');
    fetchUserData();
  };

  const saveUserDataAndNavigate = async () => {
    const updatedUserData = {
      ...userData,
      //save new data
    };

    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

    fetchUserData();
    navigation.navigate('PersonalizationScreen');
  };

  const removeTag = (name) => {
    const updatedUserData = {
      ...userData,
      taskNames: userData.taskNames.filter((taskName) => taskName !== name),
    };

    AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
    fetchUserData();
  };

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
              {userData.taskNames.length > 0 ? (
                userData.taskNames.map((name, index) => (
                  <TagLarge
                    key={index}
                    tagText={name}
                    tagColor={theme.colors.tag3}
                    tagClose={true}
                    larger={true}
                    onPressClose={() => removeTag(name)}
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
        </View>
      </ScrollView>
      <BottomButton buttonText="Tallenna" buttonAction={() => saveUserData()} />
    </>
  );
}
const styles = StyleSheet.create({
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
