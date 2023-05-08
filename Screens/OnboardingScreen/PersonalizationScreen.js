import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import TagLarge from '../../components/TagLarge';
import DropDown from '../../components/DropDown';
import { useNavigation } from '@react-navigation/native';
export default function PersonalizationScreen() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigation = useNavigation();

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

  const saveAndContinue = () => {
    navigation.navigate('PersonalizationScreen2');
  };

  const jobCategories = [
    {
      name: 'Hallinto- ja toimistotyö',
      jobs: [{ name: 'Henkilöstöhallinto' }, { name: 'Markkinointi' }],
    },
    {
      name: 'Opetus- ja kulttuuriala',
      jobs: [{ name: 'Opetus' }, { name: 'Kulttuuri' }],
    },
    // Add more job categories and jobs as needed
  ];
  return (
    <>
      <View style={styles.containerTop}>
        <Text style={theme.textVariants.uiM}>Valitse tehtäväalue</Text>
        <Text style={[theme.textVariants.uiS, { marginBottom: 8 }]}>
          Valitse vähintään yksi, voit valita useampia
        </Text>
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

      {selectedJobs.length > 0 && (
        <TouchableOpacity
          onPress={() => saveAndContinue()}
          style={[styles.button, { position: 'absolute', bottom: 0 }]}
        >
          <Text style={styles.buttonText}>Tallenna ja jatka</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
