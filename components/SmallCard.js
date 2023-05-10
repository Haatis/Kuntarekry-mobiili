import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from './Tag';

export default function SmallCard({ job, cardType }) {
  const randomNum = Math.floor(Math.random() * 200) + 1;

  const imageURL = {
    uri: `https://picsum.photos/200/300?random=${randomNum}`,
  };

  if (cardType == null) {
    cardType = 'default';
  }

  const maxLength = 210;
  const truncatedDescription =
    job?.jobDesc?.length > maxLength
      ? job.jobDesc.slice(0, maxLength).replace(/[,.\s]*$/, '') + '...'
      : job?.jobDesc;
  const trimmedDescription = truncatedDescription?.trim().replace(/\s+/g, ' ');

  return (
    <View style={[theme.outline, theme.dropShadow, styles.card]}>
      <View style={styles.cardTop}>
        <Pressable style={[theme.outline, theme.dropShadow, styles.avatar]}>
          <Image style={styles.avatarImage} source={imageURL} />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={[theme.textVariants.textL, { color: 'black' }]}>{job.title}</Text>
          <Text style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}>
            {job.organization}
          </Text>
        </View>
        {
          {
            default: (
              <View style={[styles.button, { borderColor: theme.colors.secondary }]}>
                <MaterialCommunityIcons
                  name={'heart-outline'}
                  size={24}
                  color={theme.colors.secondary}
                />
              </View>
            ),
            hidden: <MaterialCommunityIcons name={'close-thick'} size={16} color={'black'} />,
            applied: null,
          }[cardType]
        }
      </View>
      <View style={styles.cardBottom}>
        <View style={styles.tagRow}>
          <Tag tagColor={theme.colors.tag2} tagText={job.employmentType} />
          <Tag tagColor={theme.colors.tag1} tagText={job.employment} />
          <Tag tagColor={theme.colors.tag1} tagText={job.location} />
          <MaterialCommunityIcons name={'chevron-down'} size={24} color={'black'} />
        </View>
        <Text style={[theme.textVariants.textM, styles.description]}>{trimmedDescription}</Text>
        {cardType === 'applied' ? (
          <View style={styles.dateTextContainer}>
            <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
              Haku päättyy: {job.publicationEnds}
            </Text>
            <Text style={[theme.textVariants.textS, { color: 'black' }]}>Haettu: 12.1.2020</Text>
          </View>
        ) : (
          <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
            Haku päättyy: {job.publicationEnds}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 40,
    width: 40,
  },
  avatarImage: {
    borderRadius: 30,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    width: '100%',
  },
  cardBottom: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  dateTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  description: {
    color: theme.colors.textSecondary,
    width: '100%',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  textContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
});
