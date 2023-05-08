import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

import { theme } from '../../styles/theme';
import { useOnboarding } from '../../hooks/useonboarding';
import { useState } from 'react';
import TagLarge from '../../components/TagLarge';
import DropDown from '../../components/DropDown';
export default function PersonalizationScreen() {
  const { finishOnboarding } = useOnboarding();
  const [selectedJobs, setSelectedJobs] = useState([]);

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
        {jobCategories.map((category) => (
          <>
            <DropDown
              key={category.name}
              category={category.name}
              options={category.jobs}
              selectedOptions={selectedJobs}
              handleOptionSelection={handleJobSelection}
            />
          </>
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
        <Pressable onPress={() => finishOnboarding()} style={styles.buttonSM}>
          <Text style={[theme.textVariants.uiM, { color: 'white' }]}>Jatka eteenpäin</Text>
        </Pressable>
      </View>

      <TouchableOpacity style={[styles.button, { position: 'absolute', bottom: 0 }]}>
        <Text style={styles.buttonText}>Tallenna ja jatka</Text>
      </TouchableOpacity>
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
  buttonSM: {
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
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
