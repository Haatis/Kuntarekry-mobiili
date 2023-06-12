import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DropDown({ category, options, selectedOptions, handleOptionSelection }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  if (options === 'location') {
    return (
      <View style={{ width: '100%' }}>
        <TouchableOpacity
          onPress={() => handleOptionSelection()}
          style={[
            theme.outlineDark,
            theme.dropShadow,
            styles.createButton,
            { backgroundColor: 'white' },
            { textColor: theme.colors.textPrimary },
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
                    marginTop: 4,
                    color: theme.colors.textPrimary,
                  },
                ]}
              >
                {category}
              </Text>
              <MaterialCommunityIcons name={'map-marker'} size={24} color={'blue'} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity
        onPress={() => toggleDropdown(category)}
        style={[
          theme.outlineDark,
          theme.dropShadow,
          styles.createButton,
          isDropdownOpen ? { backgroundColor: theme.colors.primary } : { backgroundColor: 'white' },
          { textColor: isDropdownOpen ? 'white' : theme.colors.textPrimary },
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
                  marginTop: 4,
                  color: isDropdownOpen ? 'white' : theme.colors.textPrimary,
                },
              ]}
            >
              {category}
            </Text>
            <MaterialCommunityIcons
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={24}
              color={isDropdownOpen ? 'white' : theme.colors.textPrimary}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isDropdownOpen &&
        options.map((job) => (
          <View key={job.name} style={[theme.outline, theme.dropShadow, styles.dropdownContainer]}>
            <TouchableOpacity onPress={() => handleOptionSelection(job.name)}>
              <View style={selectedOptions.includes(job.name) && styles.selectedJobContainer}>
                <Text
                  style={[
                    styles.dropdownOption,
                    theme.textVariants.textM,
                    selectedOptions.includes(job.name) && styles.selectedJob,
                  ]}
                >
                  {job.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: 4,
  },

  selectedJob: {
    color: theme.colors.primary,
  },
});
