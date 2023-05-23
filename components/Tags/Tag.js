import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function TagContent({ item, selected }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[theme.textVariants.uiS, { color: theme.colors.textPrimary }]}>{item}</Text>
      {selected && (
        <MaterialCommunityIcons name={'close-thick'} size={17} color={theme.colors.textPrimary} />
      )}
    </View>
  );
}

const MemoizedTagContent = React.memo(TagContent);

export default function Tag({ tagColor, tagText, tagClose, onPress, selected, larger }) {
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
        <MaterialCommunityIcons name="close-thick" size={17} color={theme.colors.textPrimary} />
      </Pressable>
    );
  }

  if (tagText == null) return null;
  const tags = tagText.split(', ').filter((tag) => tag.length > 0);
  const TagComponent = larger ? styles.tagL : styles.tag;

  return tags.map((item) => (
    <Pressable key={item} onPress={onPress} style={[TagComponent, { backgroundColor: tagColor }]}>
      <MemoizedTagContent item={item} selected={selected} />
    </Pressable>
  ));
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagL: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
