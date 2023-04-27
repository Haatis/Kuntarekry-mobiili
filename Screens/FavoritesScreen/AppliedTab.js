import { View } from 'react-native';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import TestData from '../../components/TestData';

export default function AppliedTab() {
  return (
    <View style={theme.containerList}>
      <SmallCard cardType={'applied'} job={TestData.jobs[0]} />
      <SmallCard cardType={'applied'} job={TestData.jobs[1]} />
    </View>
  );
}
