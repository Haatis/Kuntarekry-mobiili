import { View, Text } from 'react-native';
import { theme } from '../../../styles/theme';

export default function SubstitutionsScreen() {
  return (
    <View style={theme.containerTop}>
      <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
        Omat keikat -osiossa näet kaikki sijaisuudet, joihin sinut on valittu.
      </Text>
    </View>
  );
}
