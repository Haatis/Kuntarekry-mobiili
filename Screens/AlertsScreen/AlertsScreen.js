import { View } from 'react-native';
import NotificationCard from '../../components/NotificationCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';
import { theme } from '../../styles/theme';

export default function AlertScreen() {
  const { jobs } = useJobAdvertisements();

  return (
    <View style={theme.containerList}>
      <NotificationCard job={jobs[0].jobAdvertisement} cardType="danger" />
      <NotificationCard job={jobs[1].jobAdvertisement} cardType="success" />
    </View>
  );
}
