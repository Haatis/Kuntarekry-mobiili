import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import TestData from '../../components/TestData';

export default function SearchScreen() {
  return (
    <View style={theme.containerTop}>
      <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
          Haku: Kaikki ilmoitukset (2400)
        </Text>

        <MaterialCommunityIcons name={'magnify'} size={30} color={theme.colors.textPrimary} />
        <MaterialCommunityIcons
          name={'filter-outline'}
          size={30}
          color={theme.colors.textPrimary}
        />
      </View>
      <SmallCard
        employerImage={TestData.image[0]}
        employer={TestData.employer[0]}
        endDate={TestData.endDate[0]}
        description={TestData.description[0]}
      />
      <SmallCard
        employerImage={TestData.image[1]}
        employer={TestData.employer[1]}
        endDate={TestData.endDate[1]}
        description={TestData.description[1]}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
});
