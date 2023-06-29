import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import BottomButton from '../../components/BottomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TagLarge from '../../components/Tags/TagLarge';
import { useEffect } from 'react';

export default function CompetenceInformation({ save, setSave, setIsChanged, isChanged }) {
  const { userData } = useContext(AuthContext);

  const navigation = useNavigation();

  const { fetchUserData } = useContext(AuthContext);

  const saveUserData = async () => {
    const updatedUserData = {
      ...userData,
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

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={theme.containerTop}>
          <Text style={theme.textVariants.uiM}>Työkokemus</Text>
          <View style={[theme.outline, theme.dropShadow, styles.createButton2]}>
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
          </View>
          <Text style={theme.textVariants.uiM}>Koulutus</Text>
          <View style={[theme.outline, theme.dropShadow, styles.createButton2]}>
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
          </View>
          <Text style={theme.textVariants.uiM}>Taidot</Text>
          <TagLarge tagText={'Lisää'} tagPlus={true} />
          <Text style={theme.textVariants.uiM}>Lisenssit</Text>
          <TagLarge tagText={'Lisää'} tagPlus={true} />
          <Text style={theme.textVariants.uiM}>Kielet</Text>
          <TagLarge tagText={'Lisää'} tagPlus={true} />
          <Text style={theme.textVariants.uiM}>Sertifioinnit</Text>
          <TagLarge tagText={'Lisää'} tagPlus={true} />
        </View>
      </ScrollView>
      {isChanged ? (
        <BottomButton buttonText="Tallenna ja jatka" buttonAction={() => saveUserData()} />
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  createButton2: {
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: '100%',
  },
});
