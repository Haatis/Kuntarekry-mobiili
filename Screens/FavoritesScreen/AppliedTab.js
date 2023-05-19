import { View } from 'react-native';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';

export default function AppliedTab() {
  const { jobs } = useJobAdvertisements();

  return (
    <View style={theme.containerList}>
      <SmallCard cardType="applied" job={jobs[0].jobAdvertisement} />
      <SmallCard cardType="applied" job={jobs[1].jobAdvertisement} />
    </View>
  );
}
