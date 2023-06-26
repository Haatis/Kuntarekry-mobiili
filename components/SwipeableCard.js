import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TagRow from './TagRow';
import { useState } from 'react';

export default function SwipeableCard({ job }) {
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');
  const navigation = useNavigation();

  const imgNumber = job.organization?.length;
  const randomEmployerImage = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;
  const randomJobImage = `https://source.unsplash.com/random/&sig=${imgNumber}?job`;

  const [rowWidth, setRowWidth] = useState(0);

  return (
    <View style={[theme.outline, theme.dropShadow, styles.card]}>
      <ImageBackground
        imageStyle={styles.image}
        style={styles.imageContainer}
        source={{ uri: randomJobImage }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient2}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('JobScreen', { job: job })}
              style={styles.cardTop}
            >
              <TouchableOpacity style={[theme.outline, theme.dropShadow, styles.avatar]}>
                <Image style={styles.avatarImage} source={{ uri: randomEmployerImage }} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={[theme.textVariants.textXL, { color: 'white' }]}>{job.title}</Text>
                <Text style={[theme.textVariants.textM, { color: 'white' }]}>
                  {job.profitCenter}
                </Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={40} color="white" />
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
        {job.percentage > 0 && (
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: theme.colors.secondary,
              paddingHorizontal: 8,
              borderTopLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Text style={[theme.textVariants.textM, { color: 'white', textAlign: 'center' }]}>
              {job.percentage + '%'} Vastaavuus
            </Text>
            <Text style={[theme.textVariants.textM, { color: 'white', textAlign: 'center' }]}>
              profiiliisi
            </Text>
          </View>
        )}
      </ImageBackground>
      <View
        style={styles.cardBottom}
        onLayout={(event) => setRowWidth(event.nativeEvent.layout.width)}
      >
        <Text style={[theme.textVariants.textM, { color: theme.colors.button }]}>
          Haku päättyy: {publicationEnds}
        </Text>
        <View style={styles.tagRow}>
          <TagRow rowWidth={rowWidth} job={job} />
        </View>
        <Text
          numberOfLines={7}
          style={[theme.textVariants.textM, { flex: 1, color: theme.colors.textPrimary }]}
        >
          {job.jobDesc}
        </Text>
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
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
  },
  cardBottom: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
  },
  gradient: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
  gradient2: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '50%',
  },

  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: '100%',
  },
  imageContainer: {
    height: '45%',
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
