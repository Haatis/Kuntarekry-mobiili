import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useState } from 'react';

import { theme } from '../../styles/theme';
import { useOnboarding } from '../../hooks/useonboarding';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, Circle } from 'react-native-maps';

export default function PersonalizationScreen2() {
  const { finishOnboarding } = useOnboarding();
  const [sliderValue, setSliderValue] = useState(0);
  const [radius, setRadius] = useState(0);

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
        <Text style={theme.textVariants.uiM}>Valitse Sijainti</Text>
        <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
          <TextInput
            placeholder="Sijainti"
            style={[theme.textVariants.uiM, { color: theme.colors.textPrimary, flex: 1 }]}
          ></TextInput>

          <MaterialCommunityIcons name={'map-marker'} size={30} color={theme.colors.textPrimary} />
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
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
});
