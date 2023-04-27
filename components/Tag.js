import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
export default function Tag({ tagColor, tagText }) {
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
