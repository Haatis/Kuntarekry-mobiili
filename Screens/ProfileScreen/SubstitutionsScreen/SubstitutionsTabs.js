import TopTabNavigator from '../../../components/TopTabNav';
import SubstitutionsScreen from './SubstitutionsScreen';
import UsabilityScreen from './UsabilityScreen';

const tabs = [
  {
    name: 'Omat keikat',
    component: SubstitutionsScreen,
  },
  {
    name: 'Käytettävyys',
    component: UsabilityScreen,
  },
];

export default function SubstitutionsTabs() {
  return <TopTabNavigator tabs={tabs} />;
}
