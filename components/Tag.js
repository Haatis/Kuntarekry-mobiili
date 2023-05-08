import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Tag({ tagColor, tagText, tagClose, onPressClose }) {
  if (tagClose) {
    return (
      <Pressable
        onPress={onPressClose}
        style={[
          styles.tag,
          { backgroundColor: tagColor, flexDirection: 'row', justifyContent: 'space-between' },
        ]}
      >
        <Text style={[theme.textVariants.uiS, { color: theme.colors.textPrimary }]}>{tagText}</Text>
        <MaterialCommunityIcons name={'close-thick'} size={17} color={theme.colors.textPrimary} />
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.tag, { backgroundColor: tagColor }]}>
      <Text style={[theme.textVariants.uiS, { color: theme.colors.textPrimary }]}>{tagText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
