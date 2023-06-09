import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';

const DAYS = [
  { name: 'MA', number: 26.7 },
  { name: 'TI', number: 27.7 },
  { name: 'KE', number: 28.7 },
  { name: 'TO', number: 29.7 },
  { name: 'PE', number: 30.7 },
  { name: 'LA', number: 1.8 },
  { name: 'SU', number: 2.8 },
];

export default function UsabilityScreen() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMorning, setSelectedMorning] = useState([]);
  const [selectedAfternoon, setSelectedAfternoon] = useState([]);
  const [selectedEvening, setSelectedEvening] = useState([]);
  console.log(selectedEvening);
  return (
    <View style={theme.containerTop}>
      <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
        Käytettävyyskalenterissa voit ylläpitää käytettävyystietojasi.
      </Text>
      <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons name="information" size={32} color={theme.colors.button} />
        <Text style={{ ...theme.textVariants.uiS, color: theme.colors.textPrimary }}>Ohjeet</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
        <MaterialCommunityIcons name="chevron-double-left" size={32} color="black" />
        <Text
          style={{
            ...theme.textVariants.uiM,
            color: 'white',
            backgroundColor: theme.colors.button,
            padding: 8,
            borderRadius: 8,
          }}
        >
          Viikko 26
        </Text>
        <MaterialCommunityIcons name="chevron-double-right" size={32} color="black" />
      </View>
      <View style={styles.calendar}>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, backgroundColor: 'transparent' }}></Text>
          {DAYS.map((day, index) => {
            const isDaySelected = selectedDays.includes(index);
            const isFullySelected =
              isDaySelected &&
              selectedMorning.includes(index) &&
              selectedAfternoon.includes(index) &&
              selectedEvening.includes(index);

            return (
              <Pressable
                key={index}
                onPress={() => {
                  if (isFullySelected) {
                    // Deselect the day and its corresponding AAMU, ILTA, and YÖ
                    setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== index));
                    setSelectedMorning(
                      selectedMorning.filter((selectedItem) => selectedItem !== index)
                    );
                    setSelectedAfternoon(
                      selectedAfternoon.filter((selectedItem) => selectedItem !== index)
                    );
                    setSelectedEvening(
                      selectedEvening.filter((selectedItem) => selectedItem !== index)
                    );
                  } else {
                    // Select the day
                    setSelectedDays([...selectedDays, index]);
                    // Select AAMU, ILTA, and YÖ if they are not already selected
                    if (!selectedMorning.includes(index)) {
                      setSelectedMorning([...selectedMorning, index]);
                    }
                    if (!selectedAfternoon.includes(index)) {
                      setSelectedAfternoon([...selectedAfternoon, index]);
                    }
                    if (!selectedEvening.includes(index)) {
                      setSelectedEvening([...selectedEvening, index]);
                    }
                  }
                }}
                style={{
                  ...styles.rectangle,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: isFullySelected ? theme.colors.tag2 : theme.colors.button,
                }}
              >
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  {day.name} {day.number}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.column}>
          <Text
            onPress={() => {
              if (selectedMorning.length === 7) {
                setSelectedMorning([]);
              } else {
                setSelectedMorning([0, 1, 2, 3, 4, 5, 6]);
              }
            }}
            style={{
              ...styles.rectangle,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              backgroundColor:
                selectedMorning.length === 7 ? theme.colors.tag2 : theme.colors.button,
            }}
          >
            AAMU
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              onPress={() => {
                setSelectedMorning((prevSelectedAamu) => {
                  if (prevSelectedAamu.includes(item)) {
                    return prevSelectedAamu.filter((selectedItem) => selectedItem !== item);
                  } else {
                    return [...prevSelectedAamu, item];
                  }
                });
              }}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: selectedMorning.includes(item)
                  ? theme.colors.tag2
                  : theme.colors.tag4,
              }}
            >
              AAMU
            </Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text
            onPress={() => {
              if (selectedAfternoon.length === 7) {
                setSelectedAfternoon([]);
              } else {
                setSelectedAfternoon([0, 1, 2, 3, 4, 5, 6]);
              }
            }}
            style={{
              ...styles.rectangle,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              backgroundColor:
                selectedAfternoon.length === 7 ? theme.colors.tag2 : theme.colors.button,
            }}
          >
            ILTA
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              onPress={() => {
                setSelectedAfternoon((prevSelectedAfternoon) => {
                  if (prevSelectedAfternoon.includes(item)) {
                    return prevSelectedAfternoon.filter((selectedItem) => selectedItem !== item);
                  } else {
                    return [...prevSelectedAfternoon, item];
                  }
                });
              }}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: selectedAfternoon.includes(item)
                  ? theme.colors.tag2
                  : theme.colors.tag4,
              }}
            >
              ILTA
            </Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text
            onPress={() => {
              if (selectedEvening.length === 7) {
                setSelectedEvening([]);
              } else {
                setSelectedEvening([0, 1, 2, 3, 4, 5, 6]);
              }
            }}
            style={{
              ...styles.rectangle,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              backgroundColor:
                selectedEvening.length === 7 ? theme.colors.tag2 : theme.colors.button,
            }}
          >
            YÖ
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              onPress={() => {
                setSelectedEvening((prevSelectedEvening) => {
                  if (prevSelectedEvening.includes(item)) {
                    return prevSelectedEvening.filter((selectedItem) => selectedItem !== item);
                  } else {
                    return [...prevSelectedEvening, item];
                  }
                });
              }}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: selectedEvening.includes(item)
                  ? theme.colors.tag2
                  : theme.colors.tag4,
              }}
            >
              YÖ
            </Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            KEIKAT
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.tag1,
              }}
            >
              -
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    gap: 4,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  rectangle: {
    ...theme.textVariants.uiS,
    backgroundColor: theme.colors.button,
    color: 'white',
    paddingVertical: 8,
    textAlign: 'center',
    width: '100%',
  },
});
