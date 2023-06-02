import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import { useJobLocations } from '../../hooks/uselocations';
import { useState } from 'react';
import { LOCATION_KEY } from '../../hooks/usepersonalisation';
import { useEffect } from 'react';
import { usePersonalisation } from '../../hooks/usepersonalisation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import { Keyboard } from 'react-native';

export default function BasicInformation() {
  const { locations } = useJobLocations();
  const [locationData, setLocationData] = useState(null);
  const personalisationItems = usePersonalisation();
  const locationNumber = personalisationItems[LOCATION_KEY];
  const { userData } = useContext(AuthContext);
  const [textHeight, setTextHeight] = useState(57);

  useEffect(() => {
    if (locationNumber) {
      const locationObject = locations.find((location) => location.id === parseInt(locationNumber));
      const name = locationObject ? locationObject.name : null;
      const parentObject =
        locationObject && locationObject.parent
          ? locations.find((location) => location.id === locationObject.parent)
          : null;
      const parentName = parentObject ? parentObject.name : null;
      const children = locations
        .filter((location) => location.parent === name)
        .map((location) => ({
          name: location.name,
          parent: location.parent,
        }));
      setLocationData({
        name,
        children,
        parent: parentName,
      });
    }
  }, [locationNumber, locations]);

  return (
    <>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={theme.containerTop}>
          <Text style={theme.textVariants.uiM}>Henkilötiedot</Text>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue={userData ? userData.firstName : ''}
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Etunimi</Text>
          </View>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue={userData ? userData.lastName : ''}
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Sukunimi</Text>
          </View>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue=""
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Syntymäaika</Text>
          </View>
          <Text style={theme.textVariants.uiM}>Yhteystiedot</Text>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue=""
            />
            <Text style={[theme.textVariants.uiS, styles.labelText]}>Puhelinnumero</Text>
          </View>
          <View
            style={[{ borderWidth: 1, borderColor: theme.colors.outlineDark }, styles.createButton]}
          >
            <TextInput
              style={[theme.textVariants.textM, { color: theme.colors.textPrimary, flex: 1 }]}
              defaultValue=""
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
            {locationData ? (
              <Text style={[theme.textVariants.uiM, { marginHorizontal: 8 }]}>
                {locationData.name}
              </Text>
            ) : (
              <Text>Et ole valinnut sijaintia</Text>
            )}
            <TouchableOpacity style={styles.editButton}>
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
              multiline={true}
              numberOfLines={4}
              maxLength={300}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tallenna</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  bottomButton: {
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
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
