import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import { useState } from 'react';

export default function PreviewProfileScreen() {
  const { userData } = useContext(AuthContext);
  const [image, setImage] = useState(userData ? userData.image : '');
  const ProfileImage = {
    uri: 'https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_960_720.jpg',
  };

  const formatDate = (birthday) => {
    const date = new Date(birthday);
    const day = date.getDate(); // Get the day (1-31)
    const month = date.getMonth() + 1; // Get the month (0-11), adding 1 to adjust for 0-index
    const year = date.getFullYear(); // Get the year in 4-digit format

    return `${day}/${month}/${year}`;
  };

  return (
    <View style={theme.containerTop}>
      <View style={[theme.dropShadow, { borderRadius: 50 }]}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[theme.outline, styles.imageStyle]}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={ProfileImage}
            style={[theme.outline, styles.imageStyle]}
            resizeMode="cover"
          />
        )}
      </View>
      <Text style={{ fontFamily: 'SourceSansPro', fontSize: 20 }}>
        {userData.firstName} {userData.lastName}
      </Text>
      <Text>{userData.employment}</Text>
      <Text>{userData.introduction}</Text>
      <Text>Perustiedot</Text>
      <Text>Syntymäaika</Text>
      <Text>{userData.birthday && formatDate(userData.birthday)}</Text>
      <Text>Sähköposti</Text>
      <Text>{userData.email}</Text>
      <Text>Puhelinnumero</Text>
      <Text>{userData.phoneNumber}</Text>
      <Text>Sijainti</Text>
      <Text>{userData.locationNames}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 99,
    height: 100,
    width: 100,
  },
});
