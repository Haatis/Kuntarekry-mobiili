import SearchScreen from './SearchScreen';
import CardScreen from './CardScreen';
import TopTabNavigator from '../../components/TopTabNav';

const tabs = [
  {
    name: 'Kortit',
    component: CardScreen,
  },
  {
    name: 'Haku',
    component: SearchScreen,
  },
];

export default function HomeScreen() {
  return <TopTabNavigator tabs={tabs} />;
}
