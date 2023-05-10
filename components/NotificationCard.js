import { Pressable, Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from './Tag';

export default function Notification({ job, cardType }) {
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');
  const publicationStarts = new Date(job.publicationStarts)?.toLocaleDateString('fi-FI');

  return (
    <View style={[theme.outline, theme.dropShadow, styles.card]}>
      <View style={styles.cardTop}>
        <Pressable style={[theme.outline, theme.dropShadow, styles.avatar]}>
          <Image style={styles.avatarImage} source={job.image} />
        </Pressable>
        <View style={styles.textContainer}>
          {cardType === 'danger' ? (
            <Text style={[theme.textVariants.textL, { color: theme.colors.danger }]}>
              Haku päättyy pian:
            </Text>
          ) : (
            <Text style={[theme.textVariants.textL, { color: theme.colors.primary }]}>
              Uusi ilmoitus sinulle:
            </Text>
          )}
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
          <Tag tagColor={theme.colors.tag2} tagText="Vakinainen" />
          <Tag tagColor={theme.colors.tag1} tagText="Kokoaikatyö" />
          <Tag tagColor={theme.colors.tag1} tagText="Suomi" />
          <MaterialCommunityIcons name={'chevron-down'} size={24} color={'black'} />
        </View>
        <View style={styles.dateTextContainer}>
          <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
            Haku päättyy: {publicationEnds}
          </Text>
          <Text style={[theme.textVariants.textS, { color: 'black' }]}>
            Ilmoitettu: {publicationStarts}
          </Text>
        </View>
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
