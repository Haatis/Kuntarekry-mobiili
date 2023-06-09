import { View, Text, StyleSheet, Button } from 'react-native';
import { theme } from '../../styles/theme';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import BasicInformation from './BasicInformation';
import BottomButton from '../../components/BottomButton';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const ProfileImage = {
    uri: 'https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_960_720.jpg',
  };
  const { userData, isLoggedIn } = useContext(AuthContext);
  const renderContent = () => {
    if (isLoggedIn && userData) {
      return (
        <>
          <View style={theme.containerCenter}>
            <View style={styles.profileContainer}>
              <TouchableOpacity style={[theme.dropShadow, { borderRadius: 50 }]}>
                <Image
                  source={ProfileImage}
                  style={[theme.outline, styles.imageStyle]}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={styles.cameraContainer}>
                <TouchableOpacity style={styles.cameraButton}>
                  <MaterialCommunityIcons name="camera" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ marginTop: 16, fontFamily: 'SourceSansPro', fontSize: 20 }}>
              {userData.firstName} {userData.lastName}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate(BasicInformation)}
                  style={[theme.outline, styles.square, theme.dropShadow]}
                >
                  <MaterialCommunityIcons
                    name="card-account-details"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Perustiedot</Text>
                </TouchableOpacity>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="file-account"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>CV</Text>
                </View>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="school"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Pätevyydet</Text>
                </View>
              </View>
              <View style={{ ...styles.row, marginVertical: 16 }}>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="account-filter"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Työtoiveet</Text>
                </View>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="file-image"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Portfolio</Text>
                </View>
                <View style={[theme.outline, styles.square, theme.dropShadow]}>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Muut</Text>
                </View>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[theme.outline, styles.square, theme.dropShadow]}
                  onPress={() => navigation.navigate('SubstitutionsScreen')}
                >
                  <MaterialCommunityIcons
                    name="calendar-month"
                    size={50}
                    color={theme.colors.textPrimary}
                  />
                  <Text style={{ ...theme.textVariants.textL }}>Keikat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <BottomButton buttonText="Esikatsele profiilia" />
        </>
      );
    } else {
      return (
        <View style={theme.containerCenter}>
          <Text style={styles.loginText}>Kirjaudu sisään nähdäksesi profiilin</Text>
          <Button title="Kirjaudu sisään" onPress={() => navigation.navigate('LoginScreen')} />
        </View>
      );
    }
  };
  return <>{renderContent()}</>;
}
const styles = StyleSheet.create({
  cameraButton: {
    padding: 4,
  },
  cameraContainer: {
    backgroundColor: theme.colors.textPrimary + '50',
    borderRadius: 99,
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
  container: {
    flex: 1,
    marginTop: 32,
    width: '100%',
  },
  imageStyle: {
    borderRadius: 99,
    height: 100,
    width: 100,
  },
  profileContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  square: {
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
});
