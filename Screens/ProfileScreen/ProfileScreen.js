import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Image } from 'react-native';

export default function ProfileScreen() {
  const ProfileImage = {
    uri: 'https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_960_720.jpg',
  };

  return (
    <>
      <View style={theme.containerCenter}>
        <View style={[theme.dropShadow, { borderRadius: 50 }]}>
          <Image
            source={ProfileImage}
            style={[theme.outline, styles.imageStyle]}
            resizeMode="cover"
          />
        </View>
        <Text style={{ marginTop: 16, fontFamily: 'SourceSansPro', fontSize: 20 }}>
          Pekka Virtanen
        </Text>
        <Text
          style={[
            theme.textVariants.textM,
            {
              color: theme.colors.textSecondary,
              marginTop: 16,
            },
          ]}
        >
          Alan ammattilainen vuosien kokemuksella, etsin töitä sosiaali- ja terveysalalta.
        </Text>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.squareContainer}>
              <View style={[theme.outline, styles.square, theme.dropShadow]}>
                <MaterialCommunityIcons
                  name="card-account-details"
                  size={40}
                  color={theme.colors.textPrimary}
                />
                <Text style={{ textAlign: 'center', marginTop: 8 }}>Perustiedot</Text>
              </View>
            </View>
            <View style={styles.squareContainer}>
              <View style={[theme.outline, styles.square, theme.dropShadow]}>
                <MaterialCommunityIcons
                  name="file-account"
                  size={40}
                  color={theme.colors.textPrimary}
                />
                <Text style={{ textAlign: 'center', marginTop: 8 }}>CV</Text>
              </View>
            </View>
            <View style={styles.squareContainer}>
              <View style={[theme.outline, styles.square, theme.dropShadow]}>
                <MaterialCommunityIcons name="school" size={40} color={theme.colors.textPrimary} />
                <Text style={{ textAlign: 'center', marginTop: 8 }}>Pätevyydet</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.squareContainer}>
              <View style={[theme.outline, styles.square, theme.dropShadow]}>
                <MaterialCommunityIcons
                  name="account-filter"
                  size={40}
                  color={theme.colors.textPrimary}
                />
                <Text style={{ textAlign: 'center', marginTop: 8 }}>Työtoiveet</Text>
              </View>
            </View>
            <View style={styles.squareContainer}>
              <View style={[theme.outline, styles.square, theme.dropShadow]}>
                <MaterialCommunityIcons
                  name="file-image"
                  size={40}
                  color={theme.colors.textPrimary}
                />
                <Text style={{ textAlign: 'center', marginTop: 8 }}>Portfolio</Text>
              </View>
            </View>
            <View style={styles.squareContainer}>
              <View style={[theme.outline, styles.square, theme.dropShadow]}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={40}
                  color={theme.colors.textPrimary}
                />
                <Text style={{ textAlign: 'center', marginTop: 8 }}>Muut</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Esikatsele profiilia</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  bottomButton: {
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    paddingVertical: 16,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginTop: 32,
  },
  imageStyle: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 100,
    width: 100,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  squareContainer: {
    marginBottom: 16,
    marginHorizontal: 8,
  },
});
