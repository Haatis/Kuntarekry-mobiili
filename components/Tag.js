import { Pressable, Text, StyleSheet, View } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Tag({
  tagColor,
  tagText,
  tagClose,
  tagOpen,
  onPress,
  onPress2,
  selected,
  selected2,
}) {
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
  } else if (tagOpen) {
    return (
      <Pressable
        onPress={onPress2}
        style={[
          styles.tagOpen,
          { backgroundColor: tagColor, flexDirection: 'row', justifyContent: 'space-between' },
          selected && { width: '100%' },
          selected2 && { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
        ]}
      >
        <Text
          style={[
            theme.textVariants.uiS,
            {
              color: theme.colors.textPrimary,
              borderRadius: 4,
              paddingHorizontal: 8,
              paddingVertical: 4,
            },
          ]}
        >
          {tagText}
        </Text>
        <Pressable
          onPress={onPress}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            borderBottomRightRadius: 4,
            borderTopRightRadius: 4,
            paddingHorizontal: 4,
            paddingVertical: 4,
          }}
        >
          {selected ? (
            <MaterialCommunityIcons
              name={'chevron-up'}
              size={17}
              color={theme.colors.textPrimary}
            />
          ) : (
            <MaterialCommunityIcons
              name={'chevron-down'}
              size={17}
              color={theme.colors.textPrimary}
            />
          )}
        </Pressable>
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
  tagOpen: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
