import { View } from 'react-native';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import TestData from '../../components/TestData';

export default function HiddenTab() {
  return (
    <View style={theme.containerList}>
      <SmallCard
        employerImage={TestData.image[0]}
        employer={TestData.employer[0]}
        endDate={TestData.endDate[0]}
        description={TestData.description[0]}
      />
      <SmallCard
        employerImage={TestData.image[1]}
        employer={TestData.employer[1]}
        endDate={TestData.endDate[1]}
        description={TestData.description[1]}
      />
    </View>
  );
}
