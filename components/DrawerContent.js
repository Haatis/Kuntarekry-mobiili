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
  const [selectedTaskCount, setSelectedTaskCount] = React.useState(0);
  const [selectedOrganisationCount, setSelectedOrganisationCount] = React.useState(0);

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

  const selectParentFilter = (filter, children, type) => {
    const isChildSelected = children.some((child) =>
      selectedFilters.some((item) => item.filter === child.name)
    );

    if (isChildSelected) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter(
          (selectedFilter) => !children.some((child) => child.name === selectedFilter.filter)
        )
      );
    }

    const isParentSelected = selectedFilters.some((item) => item.filter === filter);

    if (isParentSelected) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
      );
    } else {
      setSelectedFilters((prevFilters) => [...prevFilters, { filter, type }]);
    }
  };

  const selectChildFilter = (filter, parent, type) => {
    const isParentSelected = selectedFilters.some(
      (selectedFilter) => selectedFilter.filter === parent
    );

    if (isParentSelected) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((selectedFilter) => selectedFilter.filter !== parent)
      );
    }

    const isChildSelected = selectedFilters.some((item) => item.filter === filter);
    if (isChildSelected) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((selectedFilter) => selectedFilter.filter !== filter)
      );
    } else {
      setSelectedFilters((prevFilters) => [...prevFilters, { filter, type }]);
    }
  };

  const selectFilter = (filter, type) => {
    if (selectedFilters.some((item) => item.filter === filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item.filter !== filter));
    } else {
      setSelectedFilters([...selectedFilters, { filter, type }]);
    }
  };

  React.useEffect(() => {
    countTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  const countTypes = () => {
    const taskCount = selectedFilters.filter((item) => item.type === 'Tehtäväalueet').length;
    const organisationCount = selectedFilters.filter((item) => item.type === 'Työnantaja').length;

    setSelectedTaskCount(taskCount);
    setSelectedOrganisationCount(organisationCount);
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

  const sortedOrganisations = {};
  for (let i = 0; i < jobOrganisations.length; i++) {
    const firstLetter = jobOrganisations[i][0];
    if (sortedOrganisations[firstLetter]) {
      sortedOrganisations[firstLetter].push(jobOrganisations[i]);
    } else {
      sortedOrganisations[firstLetter] = [jobOrganisations[i]];
    }
  }

  const sortedLetters = Object.keys(sortedOrganisations);

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
                key={filter.filter} // Use the 'filter' property as the key
                tagColor={theme.colors.tag1}
                tagText={filter.filter} // Access the 'filter' property for the tag text
                onPress={() => selectFilter(filter.filter, filter.type)} // Pass both 'filter' and 'type' to selectFilter
                selected={selectedFilters.some(
                  (selectedFilter) => selectedFilter.filter === filter.filter
                )} // Check if 'filter' exists in selectedFilters
              />
            ))}
          </View>
          <View style={{ marginTop: 16 }}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tulokset {jobsLength} </Text>
          </View>
          <Pressable onPress={() => handleOpenTab('Tehtäväalueet')} style={styles.filterRow}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
              Tehtäväalueet {selectedTaskCount}
            </Text>
            {selectedTab === 'Tehtäväalueet' ? (
              <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
            ) : (
              <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
            )}
          </Pressable>
          {selectedTab === 'Tehtäväalueet' &&
            jobTasks.map((category) => {
              const selectedChildCount = category.jobs.filter((job) =>
                selectedFilters.some((selectedFilter) => selectedFilter.filter === job.name)
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
                    onPress2={() =>
                      selectParentFilter(category.name, category.jobs, 'Tehtäväalueet')
                    }
                    selected={selectedCategory === category.name}
                    selected2={selectedFilters.some(
                      (selectedFilter) => selectedFilter.filter === category.name
                    )}
                  />
                  {selectedCategory === category.name &&
                    category.jobs.map((job) => (
                      <Tag
                        key={job.name}
                        tagColor={theme.colors.tag1}
                        tagText={job.name}
                        onPress={() => selectChildFilter(job.name, job.parent, 'Tehtäväalueet')}
                        selected={selectedFilters.some(
                          (selectedFilter) => selectedFilter.filter === job.name
                        )}
                      />
                    ))}
                </View>
              );
            })}
          <Pressable onPress={() => handleOpenTab('Työnantaja')} style={styles.filterRow}>
            <Text style={[theme.textVariants.uiL, { color: 'white' }]}>
              Työnantaja {selectedOrganisationCount}
            </Text>
            {selectedTab === 'Työnantaja' ? (
              <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
            ) : (
              <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
            )}
          </Pressable>
          {selectedTab === 'Työnantaja' && (
            <View style={styles.tagRow}>
              {sortedLetters.map((letter, index) => (
                <View style={styles.tagRow} key={index}>
                  <TagDropDown
                    tagColor={theme.colors.tag4}
                    tagText={letter}
                    onPress={() => handleOpenCategory(index)}
                    onPress2={() => handleOpenCategory(index)}
                    selected={selectedCategory === index}
                  />
                  {selectedCategory === index &&
                    sortedOrganisations[letter].map((organisation) => (
                      <Tag
                        key={organisation}
                        tagColor={theme.colors.tag1}
                        tagText={organisation}
                        onPress={() => selectFilter(organisation, 'Työnantaja')}
                        selected={selectedFilters.some(
                          (selectedFilter) => selectedFilter.filter === organisation
                        )}
                      />
                    ))}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
      data={[]}
      renderItem={() => null}
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
