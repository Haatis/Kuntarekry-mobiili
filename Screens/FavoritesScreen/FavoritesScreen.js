import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AppliedTab from './AppliedTab';
import HiddenTab from './HiddenTab';
import FavoritesTab from './FavoritesTab';
import { theme } from '../../styles/theme';

export default function FavoritesScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabelStyle: [{ textTransform: 'none' }, theme.textVariants.ui],
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.inactive,
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: theme.colors.inactiveNav,
            height: 50,
            elevation: 0,
          },
          tabBarPressColor: 'transparent',
        })}
      >
        <Tab.Screen
          name="Suosikit"
          component={FavoritesTab}
          options={{
            tabBarIndicatorStyle: {
              height: '100%',
              backgroundColor: 'white',
              borderBottomWidth: 2,
              borderColor: theme.colors.primary,
            },
          }}
        />
        <Tab.Screen
          name="Piilotetut"
          component={HiddenTab}
          options={{
            tabBarIndicatorStyle: {
              height: '100%',
              backgroundColor: 'white',
              borderBottomWidth: 2,
              borderColor: theme.colors.primary,
            },
          }}
        />
        <Tab.Screen
          name="Haetut"
          component={AppliedTab}
          options={{
            tabBarIndicatorStyle: {
              height: '100%',
              backgroundColor: 'white',
              borderBottomWidth: 2,
              borderColor: theme.colors.primary,
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
