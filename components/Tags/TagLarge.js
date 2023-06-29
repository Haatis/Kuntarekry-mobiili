import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TagLarge({ tagColor, tagText, tagClose, onPressClose, tagPlus }) {
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
  } else if (tagPlus) {
    return (
      <TouchableOpacity
        onPress={onPressClose}
        style={[
          styles.tagPlus,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: theme.colors.outlineDark,
            borderWidth: 2,
            backgroundColor: tagColor,
          },
        ]}
      >
        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>{tagText}</Text>
        <MaterialCommunityIcons
          name="plus"
          size={20}
          color={theme.colors.textPrimary}
          style={{ marginLeft: 8, marginTop: 0 }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPressClose} style={[styles.tag, { backgroundColor: tagColor }]}>
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
  tagPlus: {
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
