import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { theme } from '../styles/theme';

export default function JobScreen({ route }) {
  const { job } = route.params;

  const jobImage = {
    uri: 'https://cdn.pixabay.com/photo/2019/02/06/16/32/architect-3979490_960_720.jpg',
  };
  const employerImage = {
    uri: 'https://cdn.pixabay.com/photo/2017/07/10/22/40/daisy-2491831_960_720.jpg',
  };
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');
  const publicationStarts = new Date(job.publicationStarts)?.toLocaleDateString('fi-FI');
  return (
    <View style={theme.containerTop}>
      <View style={styles.imageContainer}>
        <Image source={jobImage} resizeMode="cover" style={styles.image} />
        <View style={styles.dateTextContainer}>
          <Text style={[theme.textVariants.textS, { color: theme.colors.button, flex: 1 }]}>
            Haku päättyy {publicationEnds}
          </Text>
          <Text style={[theme.textVariants.textS, { color: 'black' }]}>
            Ilmoitettu {publicationStarts}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', width: '100%', paddingLeft: 16 }}>
        <Pressable style={[theme.outline, theme.dropShadow, styles.avatar]}>
          <Image style={styles.avatarImage} source={employerImage} />
        </Pressable>
        <View>
          <Text
            style={{
              fontFamily: 'SourceSansPro',
              color: 'black',
              fontSize: 20,
              paddingLeft: 8,
              marginTop: 4,
            }}
          >
            {job.title}
          </Text>
          <Text
            style={[theme.textVariants.textM, { color: theme.colors.textPrimary, paddingLeft: 8 }]}
          >
            {job.profitCenter}
          </Text>
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 16 }}>
        <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
          {job.jobDesc}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30,
    height: 50,
    width: 50,
  },
  avatarImage: {
    borderRadius: 30,
    flex: 1,
  },
  dateTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  image: {
    borderRadius: 8,
    height: '100%',
    width: '100%',
  },

  imageContainer: {
    height: 250,
    marginBottom: 24,
    width: '100%',
  },
});
