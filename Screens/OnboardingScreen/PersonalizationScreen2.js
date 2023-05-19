import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { useJobLocations } from '../../hooks/uselocations';
import { theme } from '../../styles/theme';
import { useOnboarding } from '../../hooks/useonboarding';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PersonalizationScreen2() {
  const { finishOnboarding } = useOnboarding();
  const { locations } = useJobLocations();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setSearchResults([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter the locations based on the search query
    const filteredResults = locations.filter((location) =>
      location.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const saveAndContinue = async () => {
    try {
      // Save the selectedLocation.id into AsyncStorage
      await AsyncStorage.setItem('LOCATION_KEY', selectedLocation.id.toString());
      finishOnboarding();
    } catch (error) {
      console.log('Error saving selected location ID:', error);
    }
  };

  return (
    <>
      <View style={styles.containerTop}>
        <Text style={theme.textVariants.uiM}>Valitse sijainti </Text>
        <View style={{ width: '100%' }}>
          <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
            {selectedLocation ? (
              <TouchableOpacity
                style={styles.selectedLocationTag}
                onPress={() => {
                  setSelectedLocation(null);
                  setSearchQuery('');
                }}
              >
                <Text style={theme.textVariants.uiM}>{selectedLocation.name}</Text>
                <MaterialCommunityIcons name="close" size={16} color={theme.colors.textPrimary} />
              </TouchableOpacity>
            ) : (
              <TextInput
                placeholder="Sijainti"
                style={[theme.textVariants.uiM, { color: theme.colors.textPrimary, flex: 1 }]}
                value={searchQuery}
                onChangeText={handleSearch}
              />
            )}
            <MaterialCommunityIcons name="map-marker" size={30} color={theme.colors.textPrimary} />
          </View>
          <View
            style={[
              { width: '100%' },
              searchResults.length > 0 && { height: Math.min(searchResults.length * 50, 200) },
            ]}
          >
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ flexGrow: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLocationSelect(item)}
                  style={styles.suggestionItem}
                >
                  <Text style={[theme.textVariants.uiM, styles.suggestionItemText]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 16,
            }}
          ></View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => saveAndContinue()}
        style={[styles.button, { position: 'absolute', bottom: 0 }]}
      >
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
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },

  selectedLocationTag: {
    flexDirection: 'row',
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderColor: theme.colors.outlineDark,
    paddingVertical: 8,
    width: '100%',
  },
  suggestionItemText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    textAlign: 'left',
  },
});
