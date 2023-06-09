import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TagDropDown({ tagColor, tagText, onPress, onPress2, selected, selected2 }) {
  return (
    <TouchableOpacity
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
            color: selected2 ? 'white' : theme.colors.textPrimary,
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 8,
          },
        ]}
      >
        {tagText}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          borderBottomRightRadius: 4,
          borderTopRightRadius: 4,
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}
      >
        {selected ? (
          <MaterialCommunityIcons
            name="chevron-up"
            size={16}
            color={selected2 ? 'white' : theme.colors.textPrimary}
          />
        ) : (
          <MaterialCommunityIcons
            name="chevron-down"
            size={16}
            color={selected2 ? 'white' : theme.colors.textPrimary}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagOpen: {
    borderRadius: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
