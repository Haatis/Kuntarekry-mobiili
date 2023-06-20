import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../styles/theme';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import BottomButton from '../../components/BottomButton';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { manipulateAsync } from 'expo-image-manipulator';

export default function PreviewProfileScreen() {
  const { userData } = useContext(AuthContext);
  const image = userData ? userData.image : '';

  const generatePdf = async () => {
    const image = await manipulateAsync(userData.image, [], { base64: true });

    const html = `
    <html>
    <head>
      <style>
        h1 {
          font-size: 24px;
          margin-bottom: 8px;
          text-align: center;
        }
  
        p {
          font-size: 16px;
        }
  
        .label {
          color: ${theme.colors.textPrimary};
          margin-left: 24px;
          margin-right: 10px;
          text-align: left;
          margin-bottom: 0px;

        }
  
        .value {
          color: ${theme.colors.textSecondary};
          text-align: left;
          margin-bottom: 0px;
        }
  
        .centered {
          text-align: center;
        }
  
        img {
          display: block;
          margin: 0 auto;
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
  
        .heading {
          font-size: 18px;
          color: ${theme.colors.textPrimary};
          text-align: center;
          font-weight: bold;
          margin-bottom: 0px;
        }
        
        .row {
          display: flex;
          align-items: center;
          flex-direction: row;
          margin-bottom: 0px;
        }
        .container {
          width: 45%;
          margin-left: auto;
          margin-right: auto;
        }
        .introContainer {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
        }
        .employmentInfoContainer {
          width: 65%;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
    </head>
    <body>
      <img src="data:image/jpeg;base64,${image.base64}" alt="profilepic">
      <h1 style="color: ${theme.colors.textPrimary};">${userData.firstName} ${
      userData.lastName
    }</h1>
    <div class="employmentInfoContainer">
      <p class="centered" style="color: ${theme.colors.textPrimary}; font-size: 16px;">
        ${userData.employmentInfo}
      </p>
      </div>
      <div class="introContainer">
      <p class="centered" style="color: ${theme.colors.textSecondary}; font-size: 16px;">
        ${userData.introduction}
      </p>
      </div>
      <p class="heading">Perustiedot</p>
      <div class="container">
      <div class="row">
        <p class="label">Syntymäaika:</p>
        <p class="value">${userData.birthday && formatDate(userData.birthday)}</p>
      </div>
      <div class="row">
        <p class="label">Sähköposti:</p>
        <p class="value">${userData.email}</p>
      </div>
      <div class="row">
        <p class="label">Puhelinnumero:</p>
        <p class="value">${userData.phoneNumber}</p>
      </div>
      <div class="row">
        <p class="label">Sijainti:</p>
        <p class="value">${userData.locationNames}</p>
      </div>
      </div>
    </body>
    </html>
  `;

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
  const locationGroups = userData.locationNames.reduce((groups, location) => {
    const { name, parent } = location;
    if (parent in groups) {
      groups[parent].push(name);
    } else {
      groups[parent] = [name];
    }
    return groups;
  }, {});

  const formattedLocations = Object.entries(locationGroups)
    .map(([parent, locations]) => `${locations.join(', ')} - ${parent}`)
    .join('\n');

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
            ) : null}
          </View>
          <Text style={{ fontFamily: 'SourceSansPro', fontSize: 20 }}>
            {userData.firstName || '-'} {userData.lastName || '-'}
          </Text>
          <Text
            style={{ fontFamily: 'SourceSansPro', fontSize: 16, color: theme.colors.textPrimary }}
          >
            {userData.employmentInfo || '-'}
          </Text>
          <Text style={[theme.textVariants.textM, { color: theme.colors.textPrimary }]}>
            {userData.introduction || '-'}
          </Text>
          <Text style={theme.textVariants.uiL}>Perustiedot</Text>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Syntymäaika:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>
              {userData.birthday ? formatDate(userData.birthday) : '-'}
            </Text>
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Sähköposti:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>{userData.email || '-'}</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Puhelinnumero:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>
              {userData.phoneNumber || '-'}
            </Text>
          </View>
          <View style={styles.rowText}>
            <Text style={[styles.label, theme.textVariants.uiM]}>Sijainti:</Text>
            <Text style={[styles.value, theme.textVariants.uiM]}>{formattedLocations}</Text>
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
