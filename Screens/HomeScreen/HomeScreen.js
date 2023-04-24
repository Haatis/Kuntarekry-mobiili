import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchScreen from './SearchScreen';
import CardScreen from './CardScreen';

export default function HomeScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
      >
        <Tab.Screen name="Kortit" component={CardScreen} />
        <Tab.Screen name="Haku" component={SearchScreen} />
      </Tab.Navigator>
    </>
  );
}
