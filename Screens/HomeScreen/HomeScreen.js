import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchScreen from './SearchScreen';
import CardScreen from './CardScreen';
import { theme } from '../../styles/theme';

export default function HomeScreen() {
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
          name="Kortit"
          component={CardScreen}
          options={{
            tabBarIndicatorStyle: {
              height: '100%',
              width: '60%',
              elevation: 5,
              backgroundColor: 'white',
            },
          }}
        />
        <Tab.Screen
          name="Haku"
          component={SearchScreen}
          options={{
            tabBarIndicatorStyle: {
              width: '60%',
              height: '100%',
              backgroundColor: 'white',
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
