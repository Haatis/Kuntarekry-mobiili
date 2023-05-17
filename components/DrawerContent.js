import React from 'react';
import { View, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { theme } from '../styles/theme';
import Tag from './Tags/Tag';
import { useJobTasks } from '../hooks/usejobtasks';
import { Pressable } from 'react-native';
import TagDropDown from './Tags/TagDropDown';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { useJobOrganisations } from '../hooks/usejoborganisations';

export function DrawerContent({ setIsDrawerOpen }) {
  const drawerStatus = useDrawerStatus();
  const { tasks } = useJobTasks();
  const { jobs } = useJobAdvertisements();
  const { organisations } = useJobOrganisations();
  const jobsLength = jobs.length;
  const [selectedCategory, setSelectedCategory] = React.useState(null); //keski esim hallinto ja toimistotyö
  const [selectedTab, setSelectedTab] = React.useState(null); // ylin, esim tehtäväalueet
  const [selectedFilters, setSelectedFilters] = React.useState([]); //alin esim Viestintä
  const selectedFiltersCount = selectedFilters.length;

  React.useEffect(() => {
    setIsDrawerOpen(drawerStatus === 'open');
  }, [drawerStatus, setIsDrawerOpen]);

  const handleOpenCategory = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };
  const handleOpenTab = (tabName) => {
    if (selectedTab === tabName) {
      setSelectedTab(null);
    } else {
      setSelectedTab(tabName);
    }
  };

  const selectFilter = (filter, parent, children) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((selectedFilter) => selectedFilter !== filter)
      );
    } else {
      setSelectedFilters((prevFilters) => [...prevFilters, filter]);
    }

    if (parent) {
      const isParentSelected = selectedFilters.includes(parent);

      if (isParentSelected) {
        setSelectedFilters((prevFilters) =>
          prevFilters.filter((selectedFilter) => selectedFilter !== parent)
        );
      } else if (children) {
        setSelectedFilters((prevFilters) =>
          prevFilters.filter((selectedFilter) => {
            const childNames = children.map((child) => child.name);
            return !childNames.includes(selectedFilter);
          })
        );
      }
    } else if (children) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((selectedFilter) => {
          const childNames = children.map((child) => child.name);
          return !childNames.includes(selectedFilter);
        })
      );
    }
  };

  const jobTasks = tasks
    .filter((task) => !task.parent)
    .map((task) => ({
      name: task.name,
      jobs: tasks
        .filter((subTask) => subTask.parent === task.id)
        .map((subTask) => ({ name: subTask.name, parent: task.name })),
    }));

  const jobOrganisations = organisations.map((org) => org.name);

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View style={{ marginLeft: 16, marginTop: 16, marginRight: 16 }}>
          {selectedFilters.length > 0 && (
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Valitut suodattimet</Text>
          )}
          <View style={styles.tagRow}>
            {selectedFilters.map((filter) => (
              <Tag
                key={filter}
                tagColor={theme.colors.tag1}
                tagText={filter}
                onPress={() => selectFilter(filter)}
                selected={selectedFilters.includes(filter)}
              />
            ))}
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tulokset {jobsLength} </Text>
          </View>
          <Pressable onPress={() => handleOpenTab('Tehtäväalueet')} style={styles.filterRow}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
              Tehtäväalueet {selectedFiltersCount}
            </Text>
            {selectedTab === 'Tehtäväalueet' ? (
              <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
            ) : (
              <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
            )}
          </Pressable>
          {selectedTab === 'Tehtäväalueet' &&
            jobTasks.map((category) => (
              <View style={styles.tagRow} key={category.name}>
                <TagDropDown
                  tagColor={theme.colors.tag4}
                  tagText={category.name}
                  onPress={() => handleOpenCategory(category.name)}
                  onPress2={() => selectFilter(category.name, null, category.jobs)}
                  selected={selectedCategory === category.name}
                  selected2={selectedFilters.includes(category.name)}
                />
                {selectedCategory === category.name &&
                  category.jobs.map((job) => (
                    <Tag
                      key={job.name}
                      tagColor={theme.colors.tag1}
                      tagText={job.name}
                      onPress={() => selectFilter(job.name, job.parent, null)}
                      selected={selectedFilters.includes(job.name)}
                    />
                  ))}
              </View>
            ))}
          <Pressable onPress={() => handleOpenTab('Työnantaja')} style={styles.filterRow}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
              Työnantaja {selectedFiltersCount}
            </Text>
            {selectedTab === 'Työnantaja' ? (
              <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
            ) : (
              <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
            )}
          </Pressable>
          {selectedTab === 'Työnantaja' && (
            <FlatList
              data={jobOrganisations}
              style={styles.tagRow}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Tag
                  key={item}
                  tagColor={theme.colors.tag1}
                  tagText={item}
                  onPress={() => selectFilter(item)}
                  selected={selectedFilters.includes(item)}
                  style={styles.tag}
                />
              )}
              windowSize={5} // Adjust the number based on performance needs
            />
          )}
        </View>
      )}
      data={[]} // Add data if needed for the outer FlatList
      renderItem={() => null} // Add renderItem if needed for the outer FlatList
    />
  );
}

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
