import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TagLarge({ tagColor, tagText, tagClose, onPressClose }) {
  if (tagClose) {
    return (
      <TouchableOpacity
        onPress={onPressClose}
        style={[
          styles.tag,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: theme.colors.outline,
            borderWidth: 1,
            backgroundColor: tagColor,
          },
        ]}
      >
        <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
          {tagText}
        </Text>
        <MaterialCommunityIcons
          name="close-thick"
          size={16}
          color={theme.colors.textPrimary}
          style={{ marginLeft: 8, marginTop: 1 }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.tag, { backgroundColor: tagColor }]}>
      <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>{tagText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
