import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DAY_NAMES = ['MA', 'TI', 'KE', 'TO', 'PE', 'LA', 'SU'];

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
          {DAY_NAMES.map((day) => (
            <Text
              key={day}
              style={{
                color: 'white',
                backgroundColor: theme.colors.button,
                paddingVertical: 8,
                width: '100%',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            >
              {day}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: { flex: 1 },
  column: { flex: 1, gap: 8 },
});
