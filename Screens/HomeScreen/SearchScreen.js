import { View, StyleSheet, Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';

function SearchContent({ navigation }) {
  const { jobs } = useJobAdvertisements();

  return (
    <>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 8,
          marginTop: 66,
        }}
        data={jobs}
        renderItem={({ item, index }) => <SmallCard key={index} job={item.jobAdvertisement} />}
      />
      <View style={{ position: 'absolute', width: '100%', paddingHorizontal: 8 }}>
        <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
          <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
            Haku: Kaikki ilmoitukset ({jobs.length})
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons name="magnify" size={30} color={theme.colors.textPrimary} />
            <MaterialCommunityIcons
              name="filter-outline"
              size={30}
              color={theme.colors.textPrimary}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </View>
      </View>
    </>
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
    height: 50,
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
});

export default SearchContent;
