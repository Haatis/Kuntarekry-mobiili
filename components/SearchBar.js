import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { useState, useRef } from 'react';
import Tag from './Tags/Tag';

const SearchBar = ({ setLastSearch, handleOpenDrawer, lastSearch, filters, searchJobs }) => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
  const filterCount = filters.selectedFilters;
  const handleSearch = () => {
    if (searchText === '') {
      if (searchInputRef.current && !searchInputRef.current.isFocused()) {
        // Focus on the TextInput if search query is empty and it's not already focused
        searchInputRef.current.focus();
      } else {
        // Clear the search text if it's already focused
        searchInputRef.current.blur();
      }
    } else {
      // Perform search logic here based on the searchText and filters
      setLastSearch(searchText);
      setSearchText('');
    }
  };
  return (
    <View style={styles.createButton}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ ...theme.textVariants.uiM, color: theme.colors.textPrimary }}
          placeholder={`${
            lastSearch
              ? 'Ilmoitukset hakusanalla'
              : filters.selectedFilters > 0
              ? 'Suodatetut ilmoitukset'
              : 'Kaikki ilmoitukset'
          } (${lastSearch ? searchJobs.length : filters.filteredJobs.length}) `}
          placeholderTextColor={theme.colors.textSecondary}
          onChangeText={setSearchText}
          value={searchText}
          onSubmitEditing={handleSearch}
          ref={searchInputRef}
        />
        {lastSearch && (
          <Tag
            tagText={lastSearch}
            tagColor={theme.colors.tag3}
            tagClose={true}
            onPress={() => setLastSearch('')}
          />
        )}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleSearch}>
          <MaterialCommunityIcons name="magnify" size={30} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenDrawer} style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons
            name="filter-outline"
            size={30}
            color={theme.colors.textPrimary}
          />
          {filterCount > 0 && (
            <View style={styles.filterCircle}>
              <Text style={styles.filterCount}>{filterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createButton: {
    ...theme.outline,
    ...theme.dropShadow,
    alignItems: 'center',
    borderRadius: 99,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
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

export default SearchBar;
