import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchScreen from './SearchScreen';
import CardScreen from './CardScreen';
import { theme } from '../../styles/theme';

export default function HomeScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: [{ textTransform: 'none' }, theme.textVariants.ui],
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.inactive,
          swipeEnabled: false,
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            height: 100,
          },
          tabBarStyle: { backgroundColor: theme.colors.inactiveNav },
        }}
      >
        <Tab.Screen name="Kortit" component={CardScreen} />
        <Tab.Screen name="Haku" component={SearchScreen} />
      </Tab.Navigator>
    </>
  );
}
