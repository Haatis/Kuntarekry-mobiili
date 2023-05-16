import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { theme } from '../styles/theme';
import Tag from './Tag';
import { useJobTasks } from '../hooks/usejobtasks';
import { Pressable } from 'react-native';

export function DrawerContent({ setIsDrawerOpen }) {
  const drawerStatus = useDrawerStatus();
  const { tasks } = useJobTasks();
  const [selectedCategory, setSelectedCategory] = React.useState(null); //keski esim hallinto ja toimistotyö
  const [selectedTab, setSelectedTab] = React.useState(null); // ylin, esim tehtäväalueet
  const [selectedFilters, setSelectedFilters] = React.useState([]); //alin esim Viestintä

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

  const jobCategories = tasks
    .filter((task) => !task.parent)
    .map((task) => ({
      name: task.name,
      jobs: tasks
        .filter((subTask) => subTask.parent === task.id)
        .map((subTask) => ({ name: subTask.name, parent: task.name })),
    }));

  return (
    <DrawerContentScrollView>
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
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tulokset 406</Text>
        </View>
        <Pressable onPress={() => handleOpenTab('Tehtäväalueet')} style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tehtäväalueet</Text>
          {selectedTab === 'Tehtäväalueet' ? (
            <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
          ) : (
            <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
          )}
        </Pressable>
        {selectedTab === 'Tehtäväalueet' &&
          jobCategories.map((category) => (
            <View style={styles.tagRow} key={category.name}>
              <Tag
                tagColor={theme.colors.tag4}
                tagText={category.name}
                tagOpen={true}
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
        <View style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Työnantaja</Text>
          <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
        </View>
        <View style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tyyppi</Text>
          <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
        </View>
        <View style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Työsuhde</Text>
          <MaterialCommunityIcons name={'chevron-up'} size={30} color={'white'} />
        </View>
        <View style={styles.tagRow}>
          <Tag tagColor={theme.colors.tag1} tagText="kokoaikatyö" />
          <Tag tagColor={theme.colors.tag1} tagText="Osa-aikatyö" />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = {
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
    width: '100%',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
};
