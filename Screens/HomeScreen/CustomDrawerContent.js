import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { useDrawerStatus } from '@react-navigation/drawer';

export function CustomDrawerContent({ navigation, setIsDrawerOpen }) {
  const drawerStatus = useDrawerStatus();

  React.useEffect(() => {
    setIsDrawerOpen(drawerStatus === 'open');
  }, [drawerStatus, setIsDrawerOpen]);

  return (
    <DrawerContentScrollView>
      <View>
        <MaterialCommunityIcons
          name={'close'}
          size={30}
          color={theme.colors.textPrimary}
          onPress={() => navigation.closeDrawer()} // close drawer when close icon is pressed
        />
      </View>
      <View>
        <DrawerItem
          label="Filter 1"
          onPress={() => console.log('Filter 1 is selected')} // handle filter 1 selection
          icon={() => <MaterialCommunityIcons name="filter-outline" size={24} />}
        />
        <DrawerItem
          label="Filter 2"
          onPress={() => console.log('Filter 2 is selected')} // handle filter 2 selection
          icon={() => <MaterialCommunityIcons name="filter-outline" size={24} />}
        />
        <DrawerItem
          label="Filter 3"
          onPress={() => console.log('Filter 3 is selected')} // handle filter 3 selection
          icon={() => <MaterialCommunityIcons name="filter-outline" size={24} />}
        />
      </View>
    </DrawerContentScrollView>
  );
}
