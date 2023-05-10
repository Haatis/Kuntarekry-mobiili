import { View } from 'react-native';
import Notification from '../../components/NotificationCard';
import { useJobAdvertisements } from '../../hooks/usejobadvertisements';
import { theme } from '../../styles/theme';

export default function AlertScreen() {
  const { jobs } = useJobAdvertisements();

  return (
    <View style={theme.containerList}>
      <Notification job={jobs[0].jobAdvertisement} cardType="danger" />
      <Notification job={jobs[1].jobAdvertisement} cardType="success" />
    </View>
  );
}
