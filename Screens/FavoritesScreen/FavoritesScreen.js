import React from 'react';
import AppliedTab from './AppliedTab';
import HiddenTab from './HiddenTab';
import FavoritesTab from './FavoritesTab';
import TopTabNavigator from '../../components/TopTabNav';

const tabs = [
  {
    name: 'Suosikit',
    component: FavoritesTab,
  },
  {
    name: 'Piilotetut',
    component: HiddenTab,
  },
  {
    name: 'Haetut',
    component: AppliedTab,
  },
];
const tabss = 'asd';

export default function FavoritesScreen() {
  return <TopTabNavigator tabs={tabs} />;
}
