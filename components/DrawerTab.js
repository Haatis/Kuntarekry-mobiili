import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Tag from './Tags/Tag';

const DrawerTab = ({
  tabName,
  selectedTab,
  handleOpenTab,
  count,
  data,
  selectFilter,
  selectedFilters,
  theme,
}) => {
  return (
    <View>
      <Pressable onPress={() => handleOpenTab(tabName)} style={styles.filterRow}>
        <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
          {tabName} {count !== 0 ? count : ''}
        </Text>
        {selectedTab === tabName ? (
          <MaterialCommunityIcons name="chevron-up" size={30} color="white" />
        ) : (
          <MaterialCommunityIcons name="chevron-down" size={30} color="white" />
        )}
      </Pressable>
      {selectedTab === tabName && (
        <View style={styles.tagRow}>
          {data.map((type, index) => (
            <View style={styles.tagRow} key={index}>
              <Tag
                tagColor={theme.colors.tag1}
                tagText={type}
                onPress={() => selectFilter(type, tabName)}
                selected={selectedFilters.some((selectedFilter) => selectedFilter.filter === type)}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = {
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
};

export default DrawerTab;
