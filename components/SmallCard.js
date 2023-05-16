import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from './Tags/Tag';
import { useNavigation } from '@react-navigation/native';

export default function SmallCard({ job, cardType }) {
  const imgNumber = job.organization?.length;
  const navigation = useNavigation();

  const imageURL = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;

  if (cardType == null) {
    cardType = 'default';
  }
  const trimmedDesc = job.jobDesc?.trim().replace(/\s+/g, ' ');
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');

  return (
    <Pressable
      onPress={() => navigation.navigate('JobScreen', { job: job })}
      style={[theme.outline, theme.dropShadow, styles.card]}
    >
      <View style={styles.cardTop}>
        <Pressable style={[theme.outline, theme.dropShadow, styles.avatar]}>
          <Image style={styles.avatarImage} source={{ uri: imageURL }} />
        </Pressable>
        <View style={styles.textContainer}>
          <Text style={[theme.textVariants.textL, { color: 'black' }]}>{job.title}</Text>
          <Text
            numberOfLines={2}
            style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}
          >
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
        <Text numberOfLines={4} style={[theme.textVariants.textM, styles.description]}>
          {trimmedDesc}
        </Text>
        {cardType === 'applied' ? (
          <View style={styles.dateTextContainer}>
            <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
              Haku päättyy: {publicationEnds}
            </Text>
            <Text style={[theme.textVariants.textS, { color: 'black' }]}>Haettu: 12.1.2020</Text>
          </View>
        ) : (
          <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
            Haku päättyy: {publicationEnds}
          </Text>
        )}
      </View>
    </Pressable>
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
