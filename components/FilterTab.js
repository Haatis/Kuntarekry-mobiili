import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TagDropDown from './Tags/TagDropDown';
import Tag from './Tags/Tag';
import { theme } from '../styles/theme';

export function FilterTab({
  tabName,
  selectedTab,
  handleOpenTab,
  count,
  data,
  selectFilter,
  selectedFilters,
}) {
  const handleOpen = () => {
    handleOpenTab(tabName);
  };

  return (
    <Pressable onPress={handleOpen} style={styles.filterRow}>
      <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
        {tabName} {count !== 0 ? count : ''}
      </Text>
      {selectedTab === tabName ? (
        <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
      ) : (
        <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
      )}
      {selectedTab === tabName && (
        <View style={styles.tagRow}>
          {data.map((item) => (
            <Tag
              key={item}
              tagColor={theme.colors.tag1}
              tagText={item}
              onPress={() => selectFilter(item, tabName)}
              selected={selectedFilters.some((selectedFilter) => selectedFilter.filter === item)}
            />
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = {
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
};
