import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Tag from './Tags/Tag';
import TagDropDown from './Tags/TagDropDown';
import { theme } from '../styles/theme';
const FilterTab = ({
  handleOpenTab,
  currentTab,
  selectedTab,
  selectedTaskCount,
  jobTasks,
  selectedFilters,
  selectParentFilter,
  selectedCategory,
  handleOpenCategory,
  selectChildFilter,
  sortedLetters,
}) => {
  if (currentTab === 'Tehtäväalueet' || currentTab === 'Sijainti') {
    return (
      <View>
        <Pressable onPress={() => handleOpenTab(currentTab)} style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
            {currentTab} {selectedTaskCount !== 0 ? selectedTaskCount : ''}
          </Text>
          {selectedTab === currentTab ? (
            <MaterialCommunityIcons name="chevron-up" size={30} color="white" />
          ) : (
            <MaterialCommunityIcons name="chevron-down" size={30} color="white" />
          )}
        </Pressable>
        {selectedTab === currentTab &&
          jobTasks.map((category) => {
            const selectedChildCount = category.children.filter((child) =>
              selectedFilters.some((selectedFilter) => selectedFilter.filter === child.name)
            ).length;

            return (
              <View style={styles.tagRow} key={category.name}>
                <TagDropDown
                  tagColor={theme.colors.tag4}
                  tagText={
                    selectedChildCount > 0
                      ? `${category.name} (${selectedChildCount})`
                      : category.name
                  }
                  onPress={() => handleOpenCategory(category.name)}
                  onPress2={() => selectParentFilter(category.name, category.children, currentTab)}
                  selected={selectedCategory === category.name}
                  selected2={selectedFilters.some(
                    (selectedFilter) => selectedFilter.filter === category.name
                  )}
                />
                {selectedCategory === category.name &&
                  category.children.map((child) => (
                    <Tag
                      key={child.name}
                      tagColor={theme.colors.tag1}
                      tagText={child.name}
                      onPress={() => selectChildFilter(child.name, child.parent, currentTab)}
                      selected={selectedFilters.some(
                        (selectedFilter) => selectedFilter.filter === child.name
                      )}
                    />
                  ))}
              </View>
            );
          })}
      </View>
    );
  } else {
    return (
      <View>
        <Pressable onPress={() => handleOpenTab(currentTab)} style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
            {currentTab} {selectedTaskCount !== 0 ? selectedTaskCount : ''}
          </Text>
          {selectedTab === currentTab ? (
            <MaterialCommunityIcons name="chevron-up" size={30} color="white" />
          ) : (
            <MaterialCommunityIcons name="chevron-down" size={30} color="white" />
          )}
        </Pressable>
        {selectedTab === currentTab && (
          <View style={styles.tagRow}>
            {sortedLetters.map((letter, index) => {
              const selectedChildCount = jobTasks[letter].filter((organisation) =>
                selectedFilters.some((selectedFilter) => selectedFilter.filter === organisation)
              ).length;

              return (
                <View style={styles.tagRow} key={index}>
                  <TagDropDown
                    tagColor={theme.colors.tag4}
                    tagText={selectedChildCount > 0 ? `${letter} (${selectedChildCount})` : letter}
                    onPress={() => handleOpenCategory(index)}
                    onPress2={() => handleOpenCategory(index)}
                    selected={selectedCategory === index}
                  />
                  {selectedCategory === index &&
                    jobTasks[letter].map((organisation) => (
                      <Tag
                        key={organisation}
                        tagColor={theme.colors.tag1}
                        tagText={organisation}
                        onPress={() => selectChildFilter(organisation, 'Työnantaja')}
                        selected={selectedFilters.some(
                          (selectedFilter) => selectedFilter.filter === organisation
                        )}
                      />
                    ))}
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
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

export default FilterTab;
