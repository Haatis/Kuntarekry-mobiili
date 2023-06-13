import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../styles/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TagRow from '../components/TagRow';
import { useEffect, useState } from 'react';
import BottomButton from '../components/BottomButton';

export default function JobScreen({ route }) {
  const { job } = route.params;

  const imgNumber = job.organization?.length;
  const randomEmployerImage = `https://source.unsplash.com/random/&sig=${imgNumber}?finland`;
  const randomJobImage = `https://source.unsplash.com/random/&sig=${imgNumber}?job`;
  const publicationEnds = new Date(job.publicationEnds)?.toLocaleDateString('fi-FI');
  const publicationStarts = new Date(job.publicationStarts)?.toLocaleDateString('fi-FI');

  const [rowWidth, setRowWidth] = useState(0);

  const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState('');
    const MINUTE_MS = 60000;
    useEffect(() => {
      const calcNewYear = setInterval(() => {
        const dateEnding = new Date(job.publicationEnds);
        const dateNow = new Date();

        let minutes = Math.floor((dateEnding - dateNow) / MINUTE_MS);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        hours = hours - days * 24;
        minutes = minutes - days * 24 * 60 - hours * 60;

        if (days > 2) {
          setTimeLeft(`(${days} pv)`);
        } else if (days > 0) {
          setTimeLeft(`(${days} pv ${hours} h)`);
        } else {
          setTimeLeft(`(${hours} h ${minutes} min)`);
        }
      }, 1000);

      return () => {
        clearInterval(calcNewYear);
      };
    }, []);
    return timeLeft;
  };

  return (
    <>
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
            <TouchableOpacity
              style={{ ...styles.buttonRound, borderColor: theme.colors.secondary }}
            >
              <MaterialCommunityIcons
                name="share-variant"
                size={34}
                color={theme.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.buttonRound, borderColor: theme.colors.secondary }}
            >
              <MaterialCommunityIcons
                name="heart-outline"
                size={34}
                color={theme.colors.secondary}
              />
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
          <View style={{ width: '100%' }}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="family-tree" size={30} color={theme.colors.button} />
              <Text>{job.organization}</Text>
            </View>
            <View
              style={styles.detailRow}
              onLayout={(event) => setRowWidth(event.nativeEvent.layout.width)}
            >
              <MaterialCommunityIcons
                name="file-multiple-outline"
                size={30}
                color={theme.colors.button}
              />
              <View style={styles.tagRow}>
                <TagRow rowWidth={rowWidth} job={job} renderDetailTags={false} />
              </View>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="key-variant" size={30} color={theme.colors.button} />
              <Text style={{ ...theme.textVariants.uiM, color: theme.colors.textPrimary }}>
                {job.id}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons
                name="play-circle-outline"
                size={30}
                color={theme.colors.button}
              />
              <Text>{job.jobDuration}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="currency-eur" size={30} color={theme.colors.button} />
              <Text>{job.salary}</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="calendar-month" size={30} color={theme.colors.button} />
              <Text>
                {publicationStarts} - {publicationEnds}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons
                name="tag-multiple-outline"
                size={30}
                color={theme.colors.button}
              />
              <View style={styles.tagRow}>
                <TagRow rowWidth={rowWidth} job={job} renderTypeTags={false} />
              </View>
            </View>
            <View>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="email" size={30} color={theme.colors.button} />
                <Text style={{ ...theme.textVariants.textXL }}>Yhteystietomme</Text>
              </View>
              <Text style={{ ...theme.textVariants.textM, padding: 8 }}>{job.contacts}</Text>
            </View>
            <View>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="briefcase" size={30} color={theme.colors.button} />
                <Text style={{ ...theme.textVariants.textXL }}>Lisätietoja</Text>
              </View>
              <Text style={{ ...theme.textVariants.textM, padding: 8 }}>
                {job.organization}
                {'\n\n'}
                {job.organizationDesc}
              </Text>
              <Text style={{ ...theme.textVariants.textM, padding: 8 }}>Osoite: {job.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomButton buttonText={`Hae työpaikkaa ${CountdownTimer()}`} />
    </>
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
  tagRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
    paddingRight: 32,
  },
  title: {
    color: 'black',
    fontFamily: 'SourceSansPro',
    fontSize: 20,
  },
});
