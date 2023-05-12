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

  React.useEffect(() => {
    setIsDrawerOpen(drawerStatus === 'open');
  }, [drawerStatus, setIsDrawerOpen]);
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
          <Tag tagColor={theme.colors.tag1} tagText="Kokoaikatyö" tagClose={true} />
          <Tag tagColor={theme.colors.tag1} tagText="Osa-aikatyö" tagClose={true} />
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
            <Tag tagColor={theme.colors.tag1} tagText={category.name} tagOpen={true} />
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
