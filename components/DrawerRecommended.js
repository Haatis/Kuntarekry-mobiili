import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Tag from './Tags/Tag';

const DrawerRecommended = ({
  tabName,
  selectedTab,
  handleOpenTab,
  count,
  data,
  data2,
  selectedFilters,
  selectChildFilter,
  selectParentFilter,
  theme,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => handleOpenTab(tabName)} style={styles.filterRow}>
        <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
          {tabName} {count !== 0 ? count : ''}
        </Text>
        {selectedTab === tabName ? (
          <MaterialCommunityIcons name="chevron-up" size={30} color="white" />
        ) : (
          <MaterialCommunityIcons name="chevron-down" size={30} color="white" />
        )}
      </TouchableOpacity>
      {selectedTab === tabName && (
        <>
          <View style={styles.tagRow}>
            {data.map((type, index) => (
              <View style={styles.tagRow} key={index}>
                <Tag
                  tagColor={theme.colors.tag1}
                  tagText={type.name}
                  onPress={() => selectChildFilter(type.name, type.parent, 'Tehtäväalueet')}
                  selected={selectedFilters.some(
                    (selectedFilter) => selectedFilter.filter === type.name
                  )}
                />
              </View>
            ))}
            {data
              .filter(
                (type, index, array) => array.findIndex((t) => t.parent === type.parent) === index
              )
              .map((type, index) => (
                <View style={styles.tagRow} key={index}>
                  <Tag
                    tagColor={theme.colors.tag1}
                    tagText={type.parent}
                    onPress={() => selectParentFilter(type.parent, '', 'Tehtäväalueet')}
                    selected={selectedFilters.some(
                      (selectedFilter) => selectedFilter.filter === type.parent
                    )}
                  />
                </View>
              ))}
          </View>
          <View style={styles.tagRow}>
            <View style={styles.tagRow}>
              <Tag
                tagColor={theme.colors.tag1}
                tagText={data2.name}
                onPress={() => selectChildFilter(data2.name, data2.parent, 'Sijainti')}
                selected={selectedFilters.some(
                  (selectedFilter) => selectedFilter.filter === data2.name
                )}
              />
              <Tag
                tagColor={theme.colors.tag1}
                tagText={data2.parent}
                onPress={() => selectParentFilter(data2.parent, '', 'Sijainti')}
                selected={selectedFilters.some(
                  (selectedFilter) => selectedFilter.filter === data2.parent
                )}
              />
            </View>
          </View>
        </>
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

export default DrawerRecommended;
