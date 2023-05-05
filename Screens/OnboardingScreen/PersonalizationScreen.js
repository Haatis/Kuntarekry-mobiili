import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

import { theme } from '../../styles/theme';
import { useOnboarding } from '../../hooks/useonboarding';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
export default function PersonalizationScreen() {
  const { finishOnboarding } = useOnboarding();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const toggleDropdown = (categoryName) => {
    setIsDropdownOpen((prevState) => (prevState === categoryName ? !prevState : categoryName));
  };

  const handleJobSelection = (job) => {
    if (selectedJobs.includes(job)) {
      setSelectedJobs(selectedJobs.filter((selectedJob) => selectedJob !== job));
    } else {
      setSelectedJobs([...selectedJobs, job]);
    }
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
          <View style={{ width: '100%' }} key={category.name}>
            <TouchableOpacity
              onPress={() => toggleDropdown(category.name)}
              style={[
                theme.outline,
                theme.dropShadow,
                styles.createButton,
                isDropdownOpen === category.name && { backgroundColor: theme.colors.primary },
              ]}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={[
                      theme.textVariants.textM,
                      {
                        color:
                          isDropdownOpen === category.name ? 'white' : theme.colors.textPrimary,
                      },
                    ]}
                  >
                    {category.name}
                  </Text>
                  <MaterialCommunityIcons
                    name={isDropdownOpen === category.name ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={theme.colors.textPrimary}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {isDropdownOpen === category.name && (
              <View style={[theme.outline, theme.dropShadow, styles.dropdownContainer]}>
                {category.jobs.map((job) => (
                  <TouchableOpacity key={job.name} onPress={() => handleJobSelection(job.name)}>
                    <View style={selectedJobs.includes(job.name) && styles.selectedJobContainer}>
                      <Text
                        style={[
                          styles.dropdownOption,
                          theme.textVariants.textM,
                          selectedJobs.includes(job.name) && styles.selectedJob,
                        ]}
                      >
                        {job.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        <Pressable onPress={() => finishOnboarding()} style={styles.buttonSM}>
          <Text style={[theme.textVariants.uiM, { color: 'white' }]}>Jatka eteenpäin</Text>
        </Pressable>
        <Text style={[theme.textVariants.uiM, { color: theme.colors.textSecondary }]}>
          {selectedJobs.map((job) => job).join(', ')}
        </Text>
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
  createButton: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  dropdownContainer: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  dropdownOption: {
    color: theme.colors.textPrimary,
    paddingVertical: 8,
  },

  selectedJob: {
    color: theme.colors.primary,
  },
});
