import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { Text } from 'react-native';
import { theme } from '../../styles/theme';
import Tag from '../../components/Tag';

export function CustomDrawerContent({ setIsDrawerOpen }) {
  const drawerStatus = useDrawerStatus();

  React.useEffect(() => {
    setIsDrawerOpen(drawerStatus === 'open');
  }, [drawerStatus, setIsDrawerOpen]);

  return (
    <DrawerContentScrollView>
      <View style={{ marginLeft: 16, marginTop: 16, marginRight: 16 }}>
        <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Valitut suodattimet</Text>
        <View style={styles.tagRow}>
          <Tag tagColor={theme.colors.tag1} tagText="Kokoaikatyö" />
          <Tag tagColor={theme.colors.tag1} tagText="Osa-aikatyö" />
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tulokset 406</Text>
        </View>
        <View style={styles.filterRow}>
          <Text style={[theme.textVariants.uiL, { color: 'white' }]}>Tehtäväalueet</Text>
          <MaterialCommunityIcons name={'chevron-down'} size={30} color={'white'} />
        </View>
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
          <Tag tagColor={theme.colors.tag1} tagText="kokoaikatyö" tagClose={true} />
          <Tag tagColor={theme.colors.tag1} tagText="Osa-aikatyö" tagClose={true} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = {
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
};
