import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TagLarge({ tagColor, tagText, tagClose, onPressClose }) {
  if (tagClose) {
    return (
      <Pressable
        onPress={onPressClose}
        style={[
          styles.tag,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: theme.colors.outline,
            borderWidth: 1,
          },
        ]}
      >
        <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
          {tagText}
        </Text>
        <MaterialCommunityIcons
          name={'close-thick'}
          size={17}
          color={theme.colors.textPrimary}
          style={{ marginLeft: 8 }}
        />
      </Pressable>
    );
  }

  return (
    <Pressable style={[styles.tag, { backgroundColor: tagColor }]}>
      <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>{tagText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});