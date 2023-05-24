import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Tag from './Tags/Tag';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TagRow({ contentWidth, rowWidth, job }) {
  const [showAllTags, setShowAllTags] = useState(false);
  if (showAllTags) {
    return (
      <>
        <View style={styles.tagsAll}>
          <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
          <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
          <Tag tagColor={theme.colors.tag1} tagText={job.location} />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: theme.colors.outlineDark,
            borderRadius: 99,
            height: 24,
          }}
          onPress={() => setShowAllTags(!showAllTags)}
        >
          <MaterialCommunityIcons name="chevron-up" size={24} color="black" />
        </TouchableOpacity>
      </>
    );
  } else if (contentWidth > rowWidth) {
    return (
      <>
        <View style={styles.tagsLong}>
          <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
          <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
          <Tag tagColor={theme.colors.tag1} tagText={job.location} />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: theme.colors.outlineDark,
            borderRadius: 99,
          }}
          onPress={() => setShowAllTags(!showAllTags)}
        >
          <MaterialCommunityIcons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </>
    );
  } else {
    return (
      <View style={styles.tagsShort}>
        <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
        <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
        <Tag tagColor={theme.colors.tag1} tagText={job.location} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagsAll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  tagsLong: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  tagsShort: {
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
  },
});
