import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { theme } from '../styles/theme';

export default function JobScreen() {
  const jobImage = {
    uri: 'https://cdn.pixabay.com/photo/2019/02/06/16/32/architect-3979490_960_720.jpg',
  };
  const employerImage = {
    uri: 'https://cdn.pixabay.com/photo/2017/07/10/22/40/daisy-2491831_960_720.jpg',
  };
  return (
    <View style={theme.containerTop}>
      <View style={styles.imageContainer}>
        <Image source={jobImage} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.dateTextContainer}>
        <Text style={[theme.textVariants.textS, { color: theme.colors.button, flex: 1 }]}>
          Haku päättyy: 11.11.2023
        </Text>
        <Text style={[theme.textVariants.textS, { color: 'black' }]}>Haettu: 12.1.2020</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Pressable style={[theme.outline, theme.dropShadow, styles.avatar]}>
          <Image style={styles.avatarImage} source={employerImage} />
        </Pressable>
        <Text style={{ fontFamily: 'SourceSansPro', color: 'black', fontSize: 20 }}>
          Kiinteistöhuoltomies
        </Text>
      </View>
      <Text>Job Screen</Text>
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
    marginVertical: 8,
  },
  image: {
    height: '100%',
    width: '100%',
  },

  imageContainer: {
    height: 250,
    width: '100%',
  },
});
