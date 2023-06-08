import CardScreen from '../../HomeScreen/CardScreen';
import TopTabNavigator from '../../../components/TopTabNav';
import UsabilityScreen from './UsabilityScreen';

const tabs = [
  {
    name: 'Kortit',
    component: CardScreen,
  },
  {
    name: 'Käytettävyys',
    component: UsabilityScreen,
  },
];

export default function SubstitutionsScreen() {
  return <TopTabNavigator tabs={tabs} />;
}
