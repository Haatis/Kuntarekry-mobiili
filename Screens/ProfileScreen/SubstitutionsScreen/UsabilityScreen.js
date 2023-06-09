import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
          {DAYS.map((day) => (
            <Text
              key={day.name}
              style={{
                ...styles.rectangle,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            >
              {day.name} {day.number}
            </Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            AAMU
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.tag4,
              }}
            >
              AAMU
            </Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            ILTA
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.tag4,
              }}
            >
              ILTA
            </Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text style={{ ...styles.rectangle, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
            YÖ
          </Text>
          {Array.from({ length: 7 }, (_, i) => i).map((item) => (
            <Text
              key={item}
              style={{
                ...styles.rectangle,
                color: theme.colors.textPrimary,
                backgroundColor: theme.colors.tag4,
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
