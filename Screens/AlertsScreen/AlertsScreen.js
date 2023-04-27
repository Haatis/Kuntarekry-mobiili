import { View } from 'react-native';
import Notification from '../../components/NotificationCard';
import TestData from '../../components/TestData';
import { theme } from '../../styles/theme';

export default function AlertScreen() {
  return (
    <View style={theme.containerList}>
      <Notification job={TestData.jobs[0]} cardType="danger" />
      <Notification job={TestData.jobs[1]} cardType="success" />
    </View>
  );
}
