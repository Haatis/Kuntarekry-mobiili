import AppliedTab from './AppliedTab';
import HiddenTab from './HiddenTab';
import FavoritesTab from './FavoritesTab';
import TopTabNavigator from '../../components/TopTabNav';

const tabs = [
  {
    name: 'Suosikitt',
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

export default function FavoritesScreen() {
  return <TopTabNavigator tabs={tabs} />;
}
