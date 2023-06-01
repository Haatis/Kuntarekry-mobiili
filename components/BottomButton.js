import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function BottomButton({ buttonText, buttonAction }) {
  return (
    <TouchableOpacity style={styles.buttonBottom} onPress={buttonAction}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBottom: {
    backgroundColor: theme.colors.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  buttonText: {
    ...theme.textVariants.uiM,
    color: 'white',
    textAlign: 'center',
  },
});
