import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import TagLarge from '../../components/Tags/TagLarge';
import DropDown from '../../components/DropDown';
import { useNavigation } from '@react-navigation/native';
import { useJobTasks } from '../../hooks/usejobtasks';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function PersonalizationScreen() {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigation = useNavigation();
  const { tasks } = useJobTasks();

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
      const selectedTask = tasks.find((task) => task.name === job);
      return selectedTask ? selectedTask.id : null;
    });
    const filteredJobIds = jobIds.filter((id) => id !== null);
    try {
      await AsyncStorage.setItem('task', JSON.stringify(filteredJobIds));
      navigation.navigate('PersonalizationScreen2');
    } catch (error) {
      console.log('Error saving job IDs:', error);
    }
  };

  const jobCategories = tasks
    .filter((task) => !task.parent)
    .map((task) => ({
      name: task.name,
      jobs: tasks
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
