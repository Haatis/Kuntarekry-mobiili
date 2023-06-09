import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';

const DAYS = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

export default function UsabilityScreen() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedMorning, setSelectedMorning] = useState([]);
  const [selectedAfternoon, setSelectedAfternoon] = useState([]);
  const [selectedEvening, setSelectedEvening] = useState([]);

  const getCurrentWeek = () => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((currentDate - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7
    );
    return weekNumber;
  };

  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  const getWeekDates = (weekNumber) => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() + (1 - startDate.getDay()) + (weekNumber - 1) * 7); // Calculate start date of the week

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      dates.push(currentDate);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeek);

  const handlePreviousWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek + 1);
  };

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
        <MaterialCommunityIcons
          name="chevron-double-left"
          size={32}
          color="black"
          onPress={handlePreviousWeek}
        />
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
        <MaterialCommunityIcons
          name="chevron-double-right"
          size={32}
          color="black"
          onPress={handleNextWeek}
        />
      </View>
      <View style={styles.calendar}>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, backgroundColor: 'transparent' }}></Text>
          {weekDates.map((date, index) => {
            const formattedDate = date.getDate() + '.' + (date.getMonth() + 1);
            const isDaySelected = selectedDays.includes(index);
            const isMorningSelected = selectedMorning.includes(index);
            const isAfternoonSelected = selectedAfternoon.includes(index);
            const isEveningSelected = selectedEvening.includes(index);
            const isFullySelected = isMorningSelected && isAfternoonSelected && isEveningSelected;

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
                <Text style={{ textAlign: 'center', color: 'white' }}>{DAYS[index]}</Text>
                <Text style={{ textAlign: 'center', color: 'white' }}>{formattedDate}</Text>
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
                selectedMorning.length === 7 ? theme.colors.danger : theme.colors.button,
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
                color: selectedMorning.includes(item) ? 'white' : theme.colors.textPrimary,
                backgroundColor: selectedMorning.includes(item)
                  ? theme.colors.danger
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
                selectedAfternoon.length === 7 ? theme.colors.danger : theme.colors.button,
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
                color: selectedAfternoon.includes(item) ? 'white' : theme.colors.textPrimary,
                backgroundColor: selectedAfternoon.includes(item)
                  ? theme.colors.danger
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
                selectedEvening.length === 7 ? theme.colors.danger : theme.colors.button,
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
                color: selectedEvening.includes(item) ? 'white' : theme.colors.textPrimary,
                backgroundColor: selectedEvening.includes(item)
                  ? theme.colors.danger
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
