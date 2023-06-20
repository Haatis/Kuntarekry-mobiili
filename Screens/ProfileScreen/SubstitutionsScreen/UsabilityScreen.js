import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import moment from 'moment';

const DAYS = [
  { name: 'MA' },
  { name: 'TI' },
  { name: 'KE' },
  { name: 'TO' },
  { name: 'PE' },
  { name: 'LA' },
  { name: 'SU' },
];

export default function UsabilityScreen() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMorning, setSelectedMorning] = useState([]);
  const [selectedAfternoon, setSelectedAfternoon] = useState([]);
  const [selectedEvening, setSelectedEvening] = useState([]);

  const currentWeek = moment().isoWeek();

  // Get the dates for the current week from Monday to Sunday
  const currentWeekDates = [];
  const startOfWeek = moment().isoWeekday(1); // Monday
  for (let i = 0; i < 7; i++) {
    const date = startOfWeek.clone().add(i, 'days');
    const dayName = DAYS[i].name;
    const formattedDate = date.format('D.M');
    const dayObject = { dayName, formattedDate };
    currentWeekDates.push(dayObject);
  }

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
          Viikko {currentWeek}
        </Text>
        <MaterialCommunityIcons name="chevron-double-right" size={32} color="black" />
      </View>
      <View style={styles.calendar}>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, backgroundColor: 'transparent' }}></Text>
          {currentWeekDates.map((day, index) => {
            const isDaySelected = selectedDays.includes(index);
            const isMorningSelected = selectedMorning.includes(index);
            const isAfternoonSelected = selectedAfternoon.includes(index);
            const isEveningSelected = selectedEvening.includes(index);
            const isFullySelected = isMorningSelected && isAfternoonSelected && isEveningSelected;

            return (
              <TouchableOpacity
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
                    // Toggle the day selection
                    if (isDaySelected) {
                      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== index));
                    } else {
                      setSelectedDays([...selectedDays, index]);
                    }
                    // Select AAMU if it is not already selected
                    if (!isMorningSelected) {
                      setSelectedMorning([...selectedMorning, index]);
                    }
                    // Select ILTA if it is not already selected
                    if (!isAfternoonSelected) {
                      setSelectedAfternoon([...selectedAfternoon, index]);
                    }
                    // Select YÖ if it is not already selected
                    if (!isEveningSelected) {
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
                  backgroundColor: isFullySelected ? theme.colors.danger : theme.colors.button,
                }}
              >
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  {day.dayName} {day.formattedDate}{' '}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => {
              if (selectedMorning.length === 7) {
                setSelectedMorning([]);
              } else {
                setSelectedMorning([0, 1, 2, 3, 4, 5, 6]);
              }
            }}
          >
            <Text
              style={{
                ...styles.rectangle,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor:
                  selectedMorning.length === 7 ? theme.colors.danger : theme.colors.button,
              }}
            >
              AAMU
            </Text>
          </TouchableOpacity>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <TouchableOpacity
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
            >
              <Text
                style={{
                  ...styles.rectangle,
                  color: selectedMorning.includes(item) ? 'white' : theme.colors.textPrimary,
                  backgroundColor: selectedMorning.includes(item)
                    ? theme.colors.danger
                    : theme.colors.tag4,
                }}
              >
                AAMU
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => {
              if (selectedAfternoon.length === 7) {
                setSelectedAfternoon([]);
              } else {
                setSelectedAfternoon([0, 1, 2, 3, 4, 5, 6]);
              }
            }}
          >
            <Text
              style={{
                ...styles.rectangle,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor:
                  selectedAfternoon.length === 7 ? theme.colors.danger : theme.colors.button,
              }}
            >
              ILTA
            </Text>
          </TouchableOpacity>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <TouchableOpacity
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
            >
              <Text
                style={{
                  ...styles.rectangle,
                  color: selectedAfternoon.includes(item) ? 'white' : theme.colors.textPrimary,
                  backgroundColor: selectedAfternoon.includes(item)
                    ? theme.colors.danger
                    : theme.colors.tag4,
                }}
              >
                ILTA
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => {
              if (selectedEvening.length === 7) {
                setSelectedEvening([]);
              } else {
                setSelectedEvening([0, 1, 2, 3, 4, 5, 6]);
              }
            }}
          >
            <Text
              style={{
                ...styles.rectangle,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor:
                  selectedEvening.length === 7 ? theme.colors.danger : theme.colors.button,
              }}
            >
              YÖ
            </Text>
          </TouchableOpacity>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <TouchableOpacity
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
            >
              <Text
                style={{
                  ...styles.rectangle,

                  color: selectedEvening.includes(item) ? 'white' : theme.colors.textPrimary,
                  backgroundColor: selectedEvening.includes(item)
                    ? theme.colors.danger
                    : theme.colors.tag4,
                }}
              >
                YÖ
              </Text>
            </TouchableOpacity>
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
