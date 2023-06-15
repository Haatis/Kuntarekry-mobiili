import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../styles/theme';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import { useState } from 'react';
import BottomButton from '../../components/BottomButton';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
export default function PreviewProfileScreen() {
  const { userData } = useContext(AuthContext);
  const [image, setImage] = useState(userData ? userData.image : '');
  const ProfileImage = {
    uri: 'https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_960_720.jpg',
  };

  const generatePdf = async () => {
    try {
      const { uri } = await Print.printToFileAsync({ html });

      if (uri) {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();

        const fileName = `KuntarekryCV_${day}${month}${year}.pdf`;
        const newPath = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.moveAsync({ from: uri, to: newPath });
        await Sharing.shareAsync(newPath);
      }
    } catch (error) {
      console.error('Failed to generate or share PDF', error);
    }
  };

  const formatDate = (birthday) => {
    const date = new Date(birthday);
    const day = date.getDate(); // Get the day (1-31)
    const month = date.getMonth() + 1; // Get the month (0-11), adding 1 to adjust for 0-index
    const year = date.getFullYear(); // Get the year in 4-digit format

    return `${day}/${month}/${year}`;
  };

  const html = `
  <html>
    <head>
      <style>
        body {
          background-color: white;
          font-family: 'SourceSansPro';
          padding: 16px;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 8px;
        }
        p {
          font-size: 16px;
          color: red;
        }
        .label {
          color: ${theme.colors.textPrimary};
          margin-left: 24px;
          margin-right: 10px;
          text-align: left;
        }
        .value {
          color: ${theme.colors.textSecondary};
          flex: 1;
          text-align: left;
        }
      </style>
    </head>
    <body>
    <img src="${userData.image}" alt="profilepic">
      <h1>${userData.firstName} ${userData.lastName}</h1>
      <p style="color: ${theme.colors.textPrimary}; font-size: 20px;">${userData.employment}</p>
      <p style="color: ${theme.colors.textPrimary}; font-size: 18px;">${userData.introduction}</p>
      <p class="label">Syntymäaika:</p>
      <p class="value">${userData.birthday && formatDate(userData.birthday)}</p>
      <p class="label">Sähköposti:</p>
      <p class="value">${userData.email}</p>
      <p class="label">Puhelinnumero:</p>
      <p class="value">${userData.phoneNumber}</p>
      <p class="label">Sijainti:</p>
      <p class="value">${userData.locationNames}</p>
    </body>
  </html>
`;

  return (
    <>
      <ScrollView style={{ backgroundColor: 'white' }}>
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
          <Text
            style={{ fontFamily: 'SourceSansPro', fontSize: 16, color: theme.colors.textPrimary }}
          >
            {userData.employment}
          </Text>
          <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
            {userData.introduction}
          </Text>
          <Text style={theme.textVariants.uiL}>Perustiedot</Text>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Syntymäaika:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>
              {userData.birthday && formatDate(userData.birthday)}
            </Text>
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Sähköposti:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>{userData.email}</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Puhelinnumero:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>{userData.phoneNumber}</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Sijainti:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>{userData.locationNames}</Text>
          </View>
        </View>
      </ScrollView>
      <BottomButton buttonText="Luo profiilista CV" buttonAction={generatePdf} />
    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 99,
    height: 100,
    width: 100,
  },
  label: {
    color: theme.colors.textPrimary,
    marginLeft: 24,
    marginRight: 10,
    textAlign: 'left',
  },
  rowText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    color: theme.colors.textSecondary,
    flex: 1,
    textAlign: 'left',
  },
});
