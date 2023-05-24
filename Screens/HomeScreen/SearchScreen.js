import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';
import { useFilters } from '../../hooks/usejobfilters';
import { useMemo } from 'react';
import SwipeableRow from '../../components/SwipeableRow';

function SearchContent({ navigation }) {
  const { jobs } = useJobAdvertisements();
  const { selectedFilters } = useFilters();

  const filteredJobs = useMemo(() => {
    if (selectedFilters.length === 0) {
      return jobs; // Return all jobs if no filters are selected
    }

    const matchingSijaintiFilters = selectedFilters.filter((filter) => filter.type === 'Sijainti');
    const matchingTehtavaalueetFilters = selectedFilters.filter(
      (filter) => filter.type === 'Tehtäväalueet'
    );

    return jobs.filter((job) => {
      const hasMatchingSijainti =
        matchingSijaintiFilters.length === 0 ||
        matchingSijaintiFilters.some((filter) => {
          if (filter.children) {
            const childrenFilters = filter.children.map((child) => child.name);
            return childrenFilters.includes(job.jobAdvertisement.location);
          } else {
            return job.jobAdvertisement.location === filter.filter;
          }
        });

      const hasMatchingTehtavaalueet =
        matchingTehtavaalueetFilters.length === 0 ||
        matchingTehtavaalueetFilters.some((filter) => {
          if (filter.children) {
            const childrenFilters = filter.children.map((child) => child.name);
            return childrenFilters.includes(job.jobAdvertisement.taskArea);
          } else {
            return job.jobAdvertisement.taskArea === filter.filter;
          }
        });

      return (
        (hasMatchingSijainti && matchingTehtavaalueetFilters.length === 0) ||
        (hasMatchingSijainti && hasMatchingTehtavaalueet)
      );
    });
  }, [jobs, selectedFilters]);
  return (
    <>
      <FlatList
        ListHeaderComponent={<View style={{ marginTop: 58 }}></View>}
        contentContainerStyle={{
          paddingHorizontal: 8,
          gap: 4,
        }}
        data={filteredJobs}
        renderItem={({ item, index }) => (
          <SwipeableRow>
            <SmallCard key={index} job={item.jobAdvertisement} />
          </SwipeableRow>
        )}
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
              {selectedFilters.length > 0 && (
                <View style={styles.filterCircle}>
                  {selectedFilters.length > 0 && (
                    <Text style={styles.filterCount}>{selectedFilters.length}</Text>
                  )}
                </View>
              )}
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
