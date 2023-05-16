import { Pressable, Text, StyleSheet, View } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Tag({ tagColor, tagText, tagClose, onPress, selected }) {
  if (tagClose) {
    return (
      <Pressable
        onPress={onPress}
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

  if (tagText == null) return;
  const tags = tagText.split(', ').filter((tag) => tag.length > 0);
  return tags.map((item) => (
    <Pressable key={item} onPress={onPress} style={[styles.tag, { backgroundColor: tagColor }]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={[theme.textVariants.uiS, { color: theme.colors.textPrimary }]}>{item}</Text>
        {selected && (
          <MaterialCommunityIcons name={'close-thick'} size={17} color={theme.colors.textPrimary} />
        )}
      </View>
    </Pressable>
  ));
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
