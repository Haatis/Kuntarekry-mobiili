import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';
import { useFilters } from '../../hooks/usejobfilters';

function SearchContent({ navigation }) {
  const { jobs } = useJobAdvertisements();
  const { selectedFilters } = useFilters();

  const filteredJobs = jobs.filter((job) => {
    if (selectedFilters.length === 0) {
      return true;
    }

    return selectedFilters.some((filter) => {
      if (filter.type === 'Sijainti') {
        return job.jobAdvertisement.location === filter.filter;
      }

      return true;
    });
  });

  return (
    <>
      <FlatList
        ListHeaderComponent={<View style={{ marginTop: 66 }}></View>}
        contentContainerStyle={{
          paddingHorizontal: 8,
        }}
        data={filteredJobs}
        renderItem={({ item, index }) => <SmallCard key={index} job={item.jobAdvertisement} />}
      />
      <View style={{ position: 'absolute', width: '100%', paddingHorizontal: 8 }}>
        <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
          <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
            Haku: {selectedFilters.length > 0 ? 'Suodatetut ilmoitukset' : 'Kaikki ilmoitukset'} (
            {filteredJobs.length})
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="magnify" size={30} color={theme.colors.textPrimary} />
            <Pressable style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons
                name="filter-outline"
                size={30}
                color={theme.colors.textPrimary}
                onPress={() => navigation.openDrawer()}
              />
              <View style={styles.filterCircle}>
                {selectedFilters.length > 0 && (
                  <Text style={styles.filterCount}>{selectedFilters.length}</Text>
                )}
              </View>
            </Pressable>
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
  filterCircle: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    marginLeft: -11,
    marginRight: 8,
    marginTop: -8,
    pointerEvents: 'none',
    width: 20,
  },
  filterCount: {
    color: 'white',
    fontSize: 12,
  },
});

export default SearchContent;
