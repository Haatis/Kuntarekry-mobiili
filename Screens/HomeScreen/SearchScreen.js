import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import TestData from '../../components/TestData';

function SearchContent({ navigation }) {
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
          onPress={() => navigation.openDrawer()} // open drawer when filter icon is pressed
        />
      </View>
      <SmallCard job={TestData.jobs[0]} />
      <SmallCard job={TestData.jobs[1]} />
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

export default SearchContent;
