import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const SearchBar = ({
  searchText,
  setSearchText,
  handleSearch,
  handleOpenDrawer,
  filterCount,
  lastSearch,
  searchInputRef,
  filters,
  searchJobs,
}) => {
  return (
    <View style={styles.createButton}>
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
