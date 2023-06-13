import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import Tag from './Tags/Tag';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TagRow({ rowWidth, job, renderDetailTags = true, renderTypeTags = true }) {
  const [showAllTags, setShowAllTags] = useState(false);
  const [contentWidth, setContentWidth] = useState(null);

  const checkContentWidth = (event) => setContentWidth(event.nativeEvent.layout.width);

  // Check content width and while checking the opacity of the component is 0 to reduce flickering effect
  if (contentWidth === null) {
    return (
      <View style={{ ...styles.tagsShort, opacity: 0 }} onLayout={checkContentWidth}>
        {renderTypeTags && (
          <>
            <Tag tagText={job.employmentType} />
            <Tag tagText={job.employmentCategory} />
            <Tag tagText={job.employment} />
          </>
        )}
        {renderDetailTags && (
          <>
            <Tag tagText={job.location} />
            <Tag tagText={job.region} />
            <Tag tagText={job.taskArea} />
          </>
        )}
      </View>
    );
  }

  if (showAllTags) {
    return (
      <>
        <View style={styles.tagsAll}>
          {renderTypeTags && (
            <>
              <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
              <Tag tagColor={theme.colors.tag5} tagText={job.employmentCategory} />
              <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
            </>
          )}
          {renderDetailTags && (
            <>
              <Tag tagColor={theme.colors.tag3} tagText={job.location} />
              <Tag tagColor={theme.colors.tag3} tagText={job.region} />
              <Tag tagColor={theme.colors.tag4} tagText={job.taskArea} />
            </>
          )}
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
          {renderTypeTags && (
            <>
              <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
              <Tag tagColor={theme.colors.tag5} tagText={job.employmentCategory} />
              <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
            </>
          )}
          {renderDetailTags && (
            <>
              <Tag tagColor={theme.colors.tag3} tagText={job.location} />
              <Tag tagColor={theme.colors.tag3} tagText={job.region} />
              <Tag tagColor={theme.colors.tag4} tagText={job.taskArea} />
            </>
          )}
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
        {renderTypeTags && (
          <>
            <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
            <Tag tagColor={theme.colors.tag5} tagText={job.employmentCategory} />
            <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
          </>
        )}
        {renderDetailTags && (
          <>
            <Tag tagColor={theme.colors.tag3} tagText={job.location} />
            <Tag tagColor={theme.colors.tag3} tagText={job.region} />
            <Tag tagColor={theme.colors.tag4} tagText={job.taskArea} />
          </>
        )}
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
