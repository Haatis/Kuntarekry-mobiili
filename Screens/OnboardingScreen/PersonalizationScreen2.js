/* eslint-disable react-hooks/exhaustive-deps */
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import TagLarge from '../../components/Tags/TagLarge';
import DropDown from '../../components/DropDown';
import { useJobLocations } from '../../hooks/uselocations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomButton from '../../components/BottomButton';
import { useEffect } from 'react';
import * as Location from 'expo-location';
import { useOnboarding } from '../../hooks/useonboarding';
import { API_GEOKEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';

export default function PersonalizationScreen2() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const { locations } = useJobLocations();
  const [location, setLocation] = useState(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const { finishOnboarding } = useOnboarding();
  const [loading, setLoading] = useState(true);
  const { onboardingDone } = useOnboarding();
  const navigation = useNavigation();
  const { userData } = useContext(AuthContext);
  const { fetchUserData } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      setPermissionsGranted(true);
      setLoading(false);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchLocation(location);
    }
  }, [location]);

  const fetchLocation = async (location) => {
    setLoading(true);
    try {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;

      const response = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/reverse?key=${API_GEOKEY}&location=${latitude},${longitude}`
      );

      if (response.ok) {
        const data = await response.json();
        const adminArea5 = data.results[0].locations[0].adminArea5;
        const adminArea4 = data.results[0].locations[0].adminArea4;

        const foundAdminArea5 = locations.some((location) => location.name === adminArea5);
        const foundAdminArea4 = locations.some((location) => location.name === adminArea4);

        if (foundAdminArea5 && foundAdminArea4) {
          await handleLocationSelections(adminArea5, adminArea4);
        } else if (foundAdminArea5) {
          await handleLocationSelections(adminArea5);
        } else if (foundAdminArea4) {
          await handleLocationSelections(adminArea4);
        } else {
          // If neither adminArea5 nor adminArea4 is found, find 'Ulkomaat' in the locations list and send it to the function
          const ulkomaatLocation = locations.find((location) => location.name === 'Ulkomaat');
          if (ulkomaatLocation) {
            await handleLocationSelections(ulkomaatLocation.name);
          } else {
            // 'Ulkomaat' not found in the locations list
            // Handle the error or perform a fallback action
          }
        }
      } else {
        console.error('Error fetching location:', response.status);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
    setLoading(false);
  };

  const handleLocationSelections = async (adminArea5, adminArea4) => {
    if (adminArea5 === 'Ulkomaat') {
      if (!selectedJobs.includes(adminArea5)) {
        setSelectedJobs((prevSelectedJobs) => [...prevSelectedJobs, adminArea5]);
      }
      return;
    }
    if (!selectedJobs.includes(adminArea5)) {
      setSelectedJobs((prevSelectedJobs) => [...prevSelectedJobs, adminArea5]);
    }
    if (!selectedJobs.includes(adminArea4)) {
      setSelectedJobs((prevSelectedJobs) => [...prevSelectedJobs, adminArea4]);
    }
  };

  const handleJobSelection = (job) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter((selectedJob) => selectedJob !== job));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
  };
  const handleTagClose = (job) => {
    const updatedJobs = selectedJobs.filter((selectedJob) => selectedJob !== job);
    setSelectedJobs(updatedJobs);
  };

  const saveAndContinue = async () => {
    const jobIds = selectedJobs.map((job) => {
      const selectedTask = locations.find((task) => task.name === job);
      return selectedTask ? selectedTask.id : null;
    });
    const filteredJobIds = jobIds.filter((id) => id !== null);

    try {
      await AsyncStorage.setItem('location', JSON.stringify(filteredJobIds));
      if (onboardingDone) {
        const updatedUserData = {
          ...userData,
          locationNames: selectedJobs,
        };

        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

        fetchUserData();
        navigation.navigate('BasicInformation');
        return;
      }
      const updatedUserData = {
        ...userData,
        locationNames: selectedJobs,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

      fetchUserData();
      finishOnboarding();
    } catch (error) {
      console.log('Error saving location IDs:', error);
    }
  };

  const jobCategories = locations
    .filter((task) => !task.parent)
    .map((task) => ({
      name: task.name,
      jobs: locations
        .filter((subTask) => subTask.parent === task.id)
        .map((subTask) => ({ name: subTask.name })),
    }));

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.containerTop}>
          <Text style={theme.textVariants.uiM}>Valitse tehtäväalue</Text>
          <Text style={[theme.textVariants.uiS, { marginBottom: 8 }]}>
            Valitse vähintään yksi, voit valita useampia
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8 }}>
            {selectedJobs.map((job) => (
              <TagLarge
                key={job}
                tagColor={theme.colors.tag1}
                tagText={job}
                tagClose={true}
                onPressClose={() => handleTagClose(job)}
              />
            ))}
          </View>

          <DropDown
            category={'Käytä omaa sijaintiasi'}
            options="location"
            handleOptionSelection={async () => {
              if (loading) return;
              if (permissionsGranted) {
                let location = await Location.getCurrentPositionAsync({});
                fetchLocation(location);
              } else {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  alert('Permission to access location was denied');
                  return;
                }

                let location = await Location.getCurrentPositionAsync({});
                fetchLocation(location);
              }
            }}
          />

          {jobCategories.map((category) => (
            <View key={category.name} style={{ width: '100%' }}>
              <DropDown
                category={category.name}
                options={category.jobs}
                selectedOptions={selectedJobs}
                handleOptionSelection={handleJobSelection}
              />
            </View>
          ))}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8 }}>
            {selectedJobs.map((job) => (
              <TagLarge
                key={job}
                tagColor={theme.colors.tag1}
                tagText={job}
                tagClose={true}
                onPressClose={() => handleTagClose(job)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      {selectedJobs.length > 0 && (
        <BottomButton buttonText="Tallenna ja jatka" buttonAction={() => saveAndContinue()} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerTop: {
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 8,
    height: '100%',
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: '100%',
  },
});
