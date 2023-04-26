import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import React from 'react';

export default function Tag({ tagColor, tagText }) {
  return (
    <Pressable style={[styles.tag, { backgroundColor: tagColor }]}>
      <Text style={[theme.textVariants.ui, { color: theme.colors.textPrimary }]}>{tagText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
