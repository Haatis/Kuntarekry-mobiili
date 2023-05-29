import { View, StyleSheet, Text, FlatList, Pressable, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useFilteredJobs } from '../../hooks/usejobfilters';
import SwipeableRow from '../../components/SwipeableRow';
import { useCallback } from 'react';
import useSearchJobs from '../../hooks/usejobsearch';
import { useState, useRef } from 'react';

function SearchContent({ navigation }) {
  const filters = useFilteredJobs();
  const [searchText, setSearchText] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const searchInputRef = useRef(null);
  const searchJobs = useSearchJobs(filters.filteredJobs, lastSearch);
  const data = lastSearch ? searchJobs : filters.filteredJobs;

  const handleSearch = () => {
    if (searchText === '') {
      if (searchInputRef.current && !searchInputRef.current.isFocused()) {
        // Focus on the TextInput if search query is empty and it's not already focused
        searchInputRef.current.focus();
      } else {
        // Clear the search text if it's already focused
        setSearchText('');
        setLastSearch('');
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
  return (
    <>
      <FlatList
        ListHeaderComponent={<View style={{ marginTop: 58 }}></View>}
        contentContainerStyle={{
          paddingHorizontal: 8,
          gap: 4,
        }}
        windowSize={11}
        data={data}
        renderItem={renderItem}
      />
      <View style={{ position: 'absolute', width: '100%', paddingHorizontal: 8 }}>
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
            <Pressable style={{ flexDirection: 'row' }}>
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
