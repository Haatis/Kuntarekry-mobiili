import { View, Text } from 'react-native';
import { Button } from 'react-native';
import { useOnboarding } from '../../hooks/useonboarding';

export default function WelcomeScreen() {
  const { finishOnboarding } = useOnboarding();
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <Button title="Finish onboarding" onPress={() => finishOnboarding()} />
    </View>
  );
}
