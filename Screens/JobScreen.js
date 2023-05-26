import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function JobScreen({ route }) {
  const { job } = route.params;

  const imgNumber = job.organization?.length;
  const randomEmployerImage = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;
  const randomJobImage = `https://source.unsplash.com/random/&sig=${imgNumber}?job`;
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');
  const publicationStarts = new Date(job.publicationStarts)?.toLocaleDateString('fi-FI');
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ ...theme.containerTop }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: randomJobImage }}
            resizeMode="cover"
            style={[styles.image, theme.outlineDark]}
          />
          <View style={styles.dateTextContainer}>
            <Text style={{ ...theme.textVariants.textS, color: theme.colors.button, flex: 1 }}>
              Haku päättyy {publicationEnds}
            </Text>
            <Text style={[theme.textVariants.textS, { color: 'black' }]}>
              Ilmoitettu {publicationStarts}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 16, gap: 16 }}>
          <TouchableOpacity style={[theme.outline, theme.dropShadow, styles.avatar]}>
            <Image style={styles.avatarImage} source={{ uri: randomEmployerImage }} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}
          >
            <Text style={styles.title}>{job.title}</Text>
            <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
              {job.profitCenter}
            </Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={{ ...styles.buttonRound, borderColor: theme.colors.danger }}>
            <MaterialCommunityIcons name="close-thick" size={40} color={theme.colors.danger} />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonRound, borderColor: theme.colors.secondary }}>
            <MaterialCommunityIcons name="share-variant" size={34} color={theme.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonRound, borderColor: theme.colors.secondary }}>
            <MaterialCommunityIcons name="heart-outline" size={34} color={theme.colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
            {job.jobDesc}
          </Text>
        </View>
        <TouchableOpacity style={{ ...styles.buttonBig, ...theme.outlineDark }}>
          <Text style={{ ...theme.textVariants.uiM, color: 'white' }}>Tutustu työnantajaan</Text>
          <MaterialCommunityIcons
            style={{ margin: -6 }}
            name="chevron-right"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="family-tree" size={30} color={theme.colors.button} />
            <Text>{job.organization}</Text>
          </View>
        </View>
        <View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="key-variant" size={30} color={theme.colors.button} />
            <Text>{job.id}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  buttonBig: {
    alignItems: 'center',
    backgroundColor: theme.colors.button,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 4,
    height: 48,
    paddingHorizontal: 16,
  },
  buttonRound: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 99,
    borderWidth: 2,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  detailRow: {
    alignContent: 'center',
    borderColor: theme.colors.outline,
    borderTopWidth: 1,
    flexDirection: 'row',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 8,
  },
  image: {
    borderRadius: 8,
    height: 250,
    width: '100%',
  },
  imageContainer: {
    width: '100%',
  },
  title: {
    color: 'black',
    fontFamily: 'SourceSansPro',
    fontSize: 20,
  },
});
