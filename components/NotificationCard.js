import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TagRow from './TagRow';

export default function NotificationCard({ job, cardType }) {
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');
  const publicationStarts = new Date(job.publicationStarts)?.toLocaleDateString('fi-FI');
  const navigation = useNavigation();

  const imgNumber = job.profitCenter.length;
  const randomEmployerImage = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;

  const [rowWidth, setRowWidth] = useState(0);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('JobScreen', { job: job })}
      style={styles.card}
    >
      <View style={styles.cardTop}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EmployerScreen', { employer: job.profitCenter })}
          style={styles.avatar}
        >
          <Image style={styles.avatarImage} source={{ uri: randomEmployerImage }} />
        </TouchableOpacity>
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
            {job.profitCenter}
          </Text>
        </View>
        {
          {
            default: (
              <View style={[styles.button, { borderColor: theme.colors.secondary }]}>
                <MaterialCommunityIcons
                  name="heart-outline"
                  size={24}
                  color={theme.colors.secondary}
                />
              </View>
            ),
            hidden: <MaterialCommunityIcons name="close-thick" size={16} color="black" />,
            applied: null,
          }[cardType]
        }
      </View>
      <View
        style={styles.cardBottom}
        onLayout={(event) => setRowWidth(event.nativeEvent.layout.width)}
      >
        <View style={styles.tagRow}>
          <TagRow rowWidth={rowWidth} job={job} />
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    ...theme.outline,
    ...theme.dropShadow,
    borderRadius: 30,
    height: 40,
    // opacity 0.99 so that the dropShadow is not visible when pressing TouchableOpacity
    opacity: 0.99,
    width: 40,
  },
  avatarImage: {
    borderRadius: 30,
    flex: 1,
  },
  button: {
    alignItems: 'center',
    borderRadius: 99,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  card: {
    ...theme.outline,
    ...theme.dropShadow,
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
    paddingHorizontal: 24,
  },
  textContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
});
