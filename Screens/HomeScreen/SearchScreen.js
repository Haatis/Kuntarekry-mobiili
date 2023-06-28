import { View, StyleSheet, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useState, useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useFilteredJobs } from '../../hooks/usejobfilters';
import SwipeableRow from '../../components/SwipeableRow';
import useSearchJobs from '../../hooks/usejobsearch';
import SearchBar from '../../components/SearchBar';

function SearchContent({ navigation }) {
  const filters = useFilteredJobs();
  const [lastSearch, setLastSearch] = useState('');
  const searchJobs = useSearchJobs(filters.filteredJobs, lastSearch);
  const [activeSortType, setActiveSortType] = useState('newest');
  const [showSortSelector, setShowSortSelector] = useState(false);
  const jobs = lastSearch ? searchJobs : filters.filteredJobs;
  const sortType = [
    { label: 'Uusin ensin', value: 'newest' },
    { label: 'Hakuaika päättyy', value: 'endTime' },
    { label: 'Työnantaja', value: 'employer' },
    { label: 'Sijainti', value: 'location' },
  ];

  const renderItem = useCallback(
    ({ item }) => (
      <View style={{ marginBottom: 8 }}>
        <SwipeableRow job={item.jobAdvertisement}>
          <SmallCard job={item.jobAdvertisement} />
        </SwipeableRow>
      </View>
    ),
    []
  );

  const sortedData = useMemo(() => {
    switch (activeSortType) {
      case 'newest':
        return jobs.sort((a, b) =>
          b.jobAdvertisement.publicationStarts.localeCompare(a.jobAdvertisement.publicationStarts)
        );
      case 'endTime':
        return jobs.sort((a, b) =>
          a.jobAdvertisement.publicationEnds.localeCompare(b.jobAdvertisement.publicationEnds)
        );
      case 'employer':
        return jobs.sort((a, b) =>
          a.jobAdvertisement.profitCenter?.localeCompare(b.jobAdvertisement.profitCenter)
        );
      case 'location':
        alert('Sijainti ei ole käytössä');
        return jobs; // or return sorted data without any changes
      default:
        return jobs;
    }
  }, [jobs, activeSortType]);

  return (
    <>
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <FlashList
          contentContainerStyle={{
            paddingTop: 64,
            paddingHorizontal: 8,
            backgroundColor: 'white',
          }}
          data={sortedData}
          renderItem={renderItem}
          estimatedItemSize={200}
        />
      </View>
      <View style={{ backgroundColor: 'transparent', position: 'absolute', width: '100%' }}>
        <SearchBar
          setLastSearch={setLastSearch}
          handleOpenDrawer={() => navigation.openDrawer()}
          filterCount={filters.selectedFilters}
          lastSearch={lastSearch}
          filters={filters}
          searchJobs={searchJobs}
        />
      </View>
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => setShowSortSelector(!showSortSelector)}
      >
        <MaterialCommunityIcons
          name="swap-vertical-bold"
          size={44}
          color={theme.colors.textPrimary}
        />
      </TouchableOpacity>
      <Modal transparent={true} visible={showSortSelector} animationType="fade">
        <Pressable
          onPress={() => {
            setShowSortSelector(false);
          }}
          style={{ flex: 1 }}
        >
          <View style={styles.sortSelector}>
            <Pressable>
              <Text style={styles.sortHeader}>Lajittele</Text>
            </Pressable>
            {sortType.map((sortType) => (
              <TouchableOpacity
                key={sortType.value}
                onPress={() => {
                  setActiveSortType(sortType.value);
                  setShowSortSelector(false);
                }}
              >
                <Text
                  style={[
                    styles.sortItem,
                    sortType.value === activeSortType ? styles.activeSortItem : null,
                  ]}
                >
                  {sortType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  activeSortItem: {
    backgroundColor: theme.colors.secondary,
    color: 'white',
  },
  orderButton: {
    ...theme.dropShadow,
    ...theme.outlineDark,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 99,
    bottom: 16,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 60,
  },
  sortHeader: {
    ...theme.textVariants.uiS,
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    color: theme.colors.textPrimary,
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
  sortItem: {
    ...theme.textVariants.uiAltS,
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    color: theme.colors.textPrimary,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sortSelector: {
    ...theme.outline,
    ...theme.dropShadow,
    backgroundColor: 'white',
    borderRadius: 8,
    bottom: 140,
    position: 'absolute',
    right: 8,
    width: 240,
  },
});

export default SearchContent;
