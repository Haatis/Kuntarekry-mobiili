import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { theme } from '../styles/theme';
import Tag from './Tag';
import { useJobTasks } from '../hooks/usejobtasks';

export function DrawerContent({ setIsDrawerOpen }) {
  const drawerStatus = useDrawerStatus();
  const { tasks } = useJobTasks();
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedFilters, setSelectedFilters] = React.useState([]);

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

  const selectFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((selectedFilter) => selectedFilter !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const jobCategories = tasks
    .filter((task) => !task.parent)
    .map((task) => ({
      name: task.name,
      jobs: tasks
        .filter((subTask) => subTask.parent === task.id)
        .map((subTask) => ({ name: subTask.name })),
    }));

  return (
    <DrawerContentScrollView>
      <View style={{ marginLeft: 16, marginTop: 16, marginRight: 16 }}>
        <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Valitut suodattimet</Text>
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
        <View style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tehtäväalueet</Text>
          <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
        </View>
        {jobCategories.map((category) => (
          <View style={styles.tagRow} key={category.name}>
            <Tag
              tagColor={theme.colors.tag4}
              tagText={category.name}
              tagOpen={true}
              onPress={() => handleOpenCategory(category.name)}
              onPress2={() => selectFilter(category.name)}
              selected={selectedCategory === category.name}
              selected2={selectedFilters.includes(category.name)}
            />
            {selectedCategory === category.name &&
              category.jobs.map((job) => (
                <Tag
                  key={job.name}
                  tagColor={theme.colors.tag1}
                  tagText={job.name}
                  onPress={() => selectFilter(job.name)}
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
