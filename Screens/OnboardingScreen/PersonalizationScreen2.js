import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { useJobLocations } from '../../hooks/uselocations';
import { theme } from '../../styles/theme';
import { useOnboarding } from '../../hooks/useonboarding';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, Circle } from 'react-native-maps';

export default function PersonalizationScreen2() {
  const { finishOnboarding } = useOnboarding();
  const [sliderValue, setSliderValue] = useState(0);
  const [radius, setRadius] = useState(0);
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

  const saveAndContinue = () => {
    finishOnboarding();
  };

  const onSliderValueChange = (value) => {
    setSliderValue(value);
    setRadius(value * 1000); // convert km to m
  };

  const ouluCoords = { latitude: 65.0121, longitude: 25.4651 };
  const initialRegion = {
    ...ouluCoords,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
            <MaterialCommunityIcons
              name={'map-marker'}
              size={30}
              color={theme.colors.textPrimary}
            />
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
          >
            <Text style={theme.textVariants.uiM}>Etäisyys: </Text>
            <Text style={theme.textVariants.uiM}>{sliderValue} km</Text>
          </View>

          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={50}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.textPrimary}
            thumbTintColor={theme.colors.primary}
            step={1}
            onValueChange={(value) => onSliderValueChange(value)}
          />
        </View>
        <MapView
          style={{
            width: '100%',
            height: 400,
            borderWidth: 1,
            borderColor: theme.colors.outlineDark,
          }}
          initialRegion={initialRegion}
        >
          <Marker coordinate={ouluCoords} />
          <Circle
            center={ouluCoords}
            radius={radius}
            fillColor="rgba(0, 128, 255, 0.2)"
            strokeColor="rgba(0, 128, 255, 0.5)"
            strokeWidth={2}
          />
        </MapView>
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
