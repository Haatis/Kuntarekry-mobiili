import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useFilteredJobs } from '../../hooks/usejobfilters';
import SwipeableRow from '../../components/SwipeableRow';
import { useCallback, useEffect } from 'react';
import useSearchJobs from '../../hooks/usejobsearch';
import { useState, useRef } from 'react';
import { useDrawerStatus } from '../../hooks/usedrawerstatus';
import { useMemo } from 'react';

function SearchContent({ navigation }) {
  const status = useDrawerStatus();
  const filters = useFilteredJobs();
  const [searchText, setSearchText] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const searchInputRef = useRef(null);
  const searchJobs = useSearchJobs(filters.filteredJobs, lastSearch);
  const [sortedData, setSortedData] = useState([]);
  const [activeSortType, setActiveSortType] = useState('newest');
  const [showSortSelector, setShowSortSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const sortType = [
    { label: 'Uusin ensin', value: 'newest' },
    { label: 'Hakuaika päättyy', value: 'endTime' },
    { label: 'Työnantaja', value: 'employer' },
    { label: 'Sijainti', value: 'location' },
  ];

  const handleSearch = () => {
    if (searchText === '') {
      if (searchInputRef.current && !searchInputRef.current.isFocused()) {
        // Focus on the TextInput if search query is empty and it's not already focused
        searchInputRef.current.focus();
      } else {
        // Clear the search text if it's already focused
        setSearchText('');
        setLastSearch('');
        //defocus
        searchInputRef.current.blur();
      }
    } else {
      // Perform search logic here based on the searchText and filters
      console.log('Performing search with:', searchText);
      setLastSearch(searchText);
      setSearchText('');
    }
  };
  const renderItem = useCallback(
    ({ item, index }) => (
      <SwipeableRow>
        <SmallCard key={index} index={index} job={item.jobAdvertisement} />
      </SwipeableRow>
    ),
    []
  );

  useEffect(() => {
    if (!status) {
      let jobs = lastSearch ? searchJobs : filters.filteredJobs;
      switch (activeSortType) {
        case 'newest':
          setSortedData(
            jobs.slice().sort((a, b) => {
              return b.jobAdvertisement.publicationStarts.localeCompare(
                a.jobAdvertisement.publicationStarts
              );
            })
          );

          break;
        case 'endTime':
          setSortedData(
            jobs.slice().sort((a, b) => {
              return a.jobAdvertisement.publicationEnds.localeCompare(
                b.jobAdvertisement.publicationEnds
              );
            })
          );

          break;
        case 'employer':
          setSortedData(
            jobs.slice().sort((a, b) => {
              return a.jobAdvertisement.profitCenter?.localeCompare(
                b.jobAdvertisement.profitCenter
              );
            })
          );

          break;
        case 'location':
          alert('Sijainti ei ole käytössä');
          break;
      }
    }
  }, [lastSearch, activeSortType, filters.filteredJobs, status]);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ width: '100%' }}>
            <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
              <TextInput
                style={[theme.textVariants.uiM, { color: theme.colors.textPrimary, width: '80%' }]}
                placeholder={`${
                  filters.selectedFilters > 0 ? 'Suodatetut ilmoitukset' : 'Kaikki ilmoitukset'
                }${lastSearch ? ` hakusanalla "${lastSearch}"` : ''} (${
                  lastSearch ? searchJobs.length : filters.filteredJobs.length
                })`}
                onChangeText={setSearchText}
                value={searchText}
                onSubmitEditing={handleSearch}
                ref={searchInputRef}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={30}
                  color={theme.colors.textPrimary}
                  onPress={handleSearch}
                />
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons
                    name="filter-outline"
                    size={30}
                    color={theme.colors.textPrimary}
                    onPress={() => navigation.openDrawer()}
                  />
                  {filters.selectedFilters > 0 && (
                    <View style={styles.filterCircle}>
                      <Text style={styles.filterCount}>{filters.selectedFilters}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        contentContainerStyle={{
          paddingHorizontal: 8,
          gap: 4,
        }}
        windowSize={11}
        data={sortedData}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => setShowSortSelector(!showSortSelector)}
      >
        <MaterialCommunityIcons
          name="swap-vertical-bold"
          size={44}
          color={theme.colors.textPrimary}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      {showSortSelector && (
        <View style={styles.sortSelector}>
          <Text style={styles.sortHeader}>Lajittele</Text>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activeSortItem: {
    backgroundColor: theme.colors.secondary,
    color: 'white',
  },
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
    bottom: 80,
    position: 'absolute',
    right: 8,
    width: 240,
  },
});

export default SearchContent;
