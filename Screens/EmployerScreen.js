import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useJobAdvertisements } from '../hooks/usejobadvertisements';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FavoriteButton from '../components/FavoriteButton';

export default function EmployerScreen({ route }) {
  const { employer } = route.params;
  const { jobs } = useJobAdvertisements();
  // filter jobs with jobAdvertisement and profitcenter
  const filteredJobs = jobs.filter((job) => job.jobAdvertisement.profitCenter === employer);

  const imgNumber = employer?.length;
  const randomEmployerImage = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;
  const randomJobImage = `https://source.unsplash.com/random/&sig=${imgNumber + 1}?job`;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ ...theme.containerTop }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: randomJobImage }}
            resizeMode="cover"
            style={[styles.image, theme.outlineDark]}
          />
        </View>
        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 16, gap: 16 }}>
          <View style={[theme.outline, theme.dropShadow, styles.avatar]}>
            <Image style={styles.avatarImage} source={{ uri: randomEmployerImage }} />
          </View>
          <View
            style={{
              flex: 1,
              gap: 4,
            }}
          >
            <Text style={styles.title}>{employer}</Text>
            <Text style={{ ...theme.textVariants.textM, color: theme.colors.textSecondary }}>
              {filteredJobs.length} avointa työpaikkaa
            </Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View style={{ ...styles.buttonRound, borderColor: theme.colors.secondary }}>
            <MaterialCommunityIcons name="share-variant" size={34} color={theme.colors.secondary} />
          </View>
          <FavoriteButton size={36} />
        </View>
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <Text style={{ ...theme.textVariants.textXL, color: theme.colors.textPrimary }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam. {'\n'}
          </Text>
          <Text style={{ ...theme.textVariants.textM, color: theme.colors.textPrimary }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu nunc at eros
            imperdiet aliquet sit amet id nibh. Suspendisse at est vel orci maximus lacinia ac vel
            justo. Quisque id ante felis. Nullam eu nulla efficitur eros maximus dapibus at non
            quam. Maecenas euismod sodales orci at interdum. Morbi rutrum, odio nec ullamcorper
            pellentesque, elit eros consequat libero, sed condimentum purus metus ut tellus. Vivamus
            cursus consectetur blandit. Proin at metus ut erat convallis egestas sit amet at tortor.
            Aliquam imperdiet sapien lectus, congue vestibulum tortor ultrices a. Nunc massa nibh,
            varius vel sagittis sit amet, convallis non nisl. Nulla interdum vehicula tellus, et
            tincidunt mauris consequat at. Quisque ut leo ac magna pulvinar sagittis. Integer
            scelerisque molestie diam. Vivamus sollicitudin est sit amet nunc pharetra, at facilisis
            tortor euismod.
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="family-tree" size={30} color={theme.colors.button} />
            <Text>Lorem ipsum dolor sit amet</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="key-variant" size={30} color={theme.colors.button} />
            <Text style={{ ...theme.textVariants.uiM, color: theme.colors.textPrimary }}>
              Lorem ipsum dolor sit amet
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="play-circle-outline"
              size={30}
              color={theme.colors.button}
            />
            <Text>Lorem ipsum dolor sit amet</Text>
          </View>
        </View>
        <View style={styles.webIconContainer}>
          <MaterialCommunityIcons name="web" size={40} color={theme.colors.primary} />
          <MaterialCommunityIcons name="facebook" size={40} color={theme.colors.primary} />
          <MaterialCommunityIcons name="twitter" size={40} color={theme.colors.primary} />
          <MaterialCommunityIcons name="linkedin" size={40} color={theme.colors.primary} />
        </View>
        {filteredJobs.length > 0 && (
          <TouchableOpacity style={{ ...styles.buttonBig, ...theme.outlineDark }}>
            <Text style={{ ...theme.textVariants.uiM, color: 'white' }}>
              {filteredJobs.length} avointa työpaikkaa
            </Text>
            <MaterialCommunityIcons
              style={{ margin: -6 }}
              name="chevron-right"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        )}
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
  detailRow: {
    borderColor: theme.colors.outline,
    borderTopWidth: 1,
    flexDirection: 'row',
    flex: 1,
    gap: 16,
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
  webIconContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
});
