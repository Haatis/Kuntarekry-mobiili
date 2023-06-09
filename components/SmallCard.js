import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { memo, useState } from 'react';
import TagRow from './TagRow';
import FavoriteButton from './FavoriteButton';
import { useJobBookmarks } from '../hooks/usejobbookmarks';

export default memo(SmallCard);
function SmallCard({ job, cardType = 'default' }) {
  const { hideJob, hiddenJobs } = useJobBookmarks();
  const imgNumber = job.organization?.length;
  const navigation = useNavigation();
  const imageURL = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;
  const [rowWidth, setRowWidth] = useState(0);

  const trimmedDesc = job.jobDesc?.trim().replace(/\s+/g, ' ');
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');

  const changeHiddenStatus = () => hideJob(job.id);
  const isHidden = hiddenJobs.has(job.id);

  return (
    <>
      {isHidden && cardType === 'default' ? (
        <View style={{ ...styles.card, paddingVertical: 16, gap: 8 }}>
          <View>
            <Text
              style={{
                ...theme.textVariants.textL,
                color: 'black',
                textAlign: 'center',
              }}
            >
              Työpaikka piilotettu
            </Text>
            <Text
              style={{
                ...theme.textVariants.textM,
                color: theme.colors.textSecondary,
                textAlign: 'center',
              }}
            >
              Tätä ilmoitusta ei näytetä enää sinulle.
            </Text>
          </View>
          <TouchableOpacity onPress={changeHiddenStatus}>
            <Text
              style={{ ...theme.textVariants.uiM, color: theme.colors.button, textAlign: 'center' }}
            >
              Kumoa
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: 'white', borderRadius: 8, width: '100%' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('JobScreen', { job: job })}
            style={styles.card}
          >
            <View style={styles.cardTop}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EmployerScreen', { employer: job.profitCenter })
                }
                style={styles.avatar}
              >
                <Image style={styles.avatarImage} source={{ uri: imageURL }} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={[theme.textVariants.textL, { color: 'black' }]}>{job.title}</Text>
                <Text
                  numberOfLines={2}
                  style={[theme.textVariants.textM, { color: theme.colors.textSecondary }]}
                >
                  {job.profitCenter}
                </Text>
              </View>
              {
                {
                  default: <FavoriteButton job={job} />,
                  hidden: (
                    <TouchableOpacity onPress={changeHiddenStatus}>
                      <MaterialCommunityIcons name="close-thick" size={16} color="black" />
                    </TouchableOpacity>
                  ),
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
              <Text numberOfLines={4} style={[theme.textVariants.textM, styles.description]}>
                {trimmedDesc}
              </Text>
              {cardType === 'applied' ? (
                <View style={styles.dateTextContainer}>
                  <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
                    Haku päättyy: {publicationEnds}
                  </Text>
                  <Text style={[theme.textVariants.textS, { color: 'black' }]}>
                    Haettu: 12.1.2020
                  </Text>
                </View>
              ) : (
                <Text style={[theme.textVariants.textS, { color: theme.colors.button }]}>
                  Haku päättyy: {publicationEnds}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    ...theme.outline,
    ...theme.dropShadow,
    borderRadius: 99,
    height: 40,
    // opacity 0.99 so that dropShadow is not visible during animation when swiping
    opacity: 0.99,
    width: 40,
  },
  avatarImage: {
    borderRadius: 99,
    flex: 1,
  },
  card: {
    ...theme.outline,
    ...theme.dropShadow,
    backgroundColor: 'white',
    borderRadius: 8,
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
    paddingHorizontal: 24,
  },
  textContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
});
