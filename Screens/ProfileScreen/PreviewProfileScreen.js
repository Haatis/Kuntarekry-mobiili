import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../styles/theme';
import AuthContext from '../../hooks/useauth';
import { useContext } from 'react';
import BottomButton from '../../components/BottomButton';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { manipulateAsync } from 'expo-image-manipulator';
import moment from 'moment/moment';

export default function PreviewProfileScreen() {
  const { userData } = useContext(AuthContext);
  const image = userData ? userData.image : '';

  const generatePdf = async () => {
    let manipulatedImage = null;

    if (userData.image && userData.image !== '') {
      manipulatedImage = await manipulateAsync(userData.image, [], { base64: true });
    }

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
        .cardHeading {
          font-size: 18px;
          color: ${theme.colors.textPrimary};
          text-align: center;
          margin-top: 8px;
          margin-bottom: 0px;
        }
        .cardOrg {
          font-size: 15px;
          color: ${theme.colors.textSecondary};
          text-align: center;
          margin-top: 4px;
          margin-bottom: 8px;
        }
        .cardDate {
          font-size: 13px;
          color: ${theme.colors.button};
          text-align: center;
          margin-top: 4px;
          margin-bottom: 8px;
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
        .card {
          align-items: center;
          width: 100%;
          text-align: center;
          border: 1px solid ${theme.colors.outlineDark};
          margin-top: 8px;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
    ${
      manipulatedImage !== null
        ? `<img src="data:image/jpeg;base64,${manipulatedImage.base64}" alt="profilepic">`
        : ''
    }
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
        <p class="value">${userData.locationNames[0].name}</p>
      </div>
      <p class="heading">Työkokemus</p>
      <div class="card">
      <p class="cardHeading">${userData.workExperience[0].title}</p>
      <p class="cardOrg">${userData.workExperience[0].employer}</p>
      <p class="cardOrg">${userData.workExperience[0].description}</p> 
      <p class="cardDate">${formatDate(userData.workExperience[0].start)} - ${formatDate(
      userData.workExperience[0].end
    )}</p>
      </div>
      <p class="heading">Koulutus</p>
      <div class="card">
      <p class="cardHeading">${userData.education[0].title}</p>
      <p class="cardOrg">${userData.education[0].school}</p>
      <p class="cardOrg">${userData.education[0].description}</p> 
      <p class="cardDate">${formatDate(userData.education[0].start)} - ${formatDate(
      userData.education[0].end
    )}</p>
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
          <Text style={theme.textVariants.uiL}>Työkokemus</Text>
          {userData?.workExperience?.map((item, index) => (
            <View
              key={index}
              style={[
                theme.outline,
                theme.dropShadow,
                styles.createButton,
                { flexDirection: 'column' },
              ]}
            >
              <View>
                <Text
                  style={[
                    theme.textVariants.uiM,
                    { color: theme.colors.textPrimary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.employer}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {item.description}
                </Text>

                <Text
                  style={[
                    theme.textVariants.uiAltS,
                    { color: theme.colors.button, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {moment(item.start).format('DD.MM.YYYY')} -{' '}
                  {item.end ? moment(item.end).format('DD.MM.YYYY') : 'Nykyhetkeen'}
                </Text>
              </View>
            </View>
          ))}
          <Text style={theme.textVariants.uiL}>Koulutus</Text>
          {userData?.education?.map((item, index) => (
            <View
              key={index}
              style={[
                theme.outline,
                theme.dropShadow,
                styles.createButton,
                { flexDirection: 'column' },
              ]}
            >
              <View>
                <Text
                  style={[
                    theme.textVariants.uiM,
                    { color: theme.colors.textPrimary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 4 },
                  ]}
                >
                  {item.school}
                </Text>
                <Text
                  style={[
                    theme.textVariants.uiAltM,
                    { color: theme.colors.textSecondary, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {item.description}
                </Text>

                <Text
                  style={[
                    theme.textVariants.uiAltS,
                    { color: theme.colors.button, textAlign: 'center', paddingBottom: 8 },
                  ]}
                >
                  {moment(item.start).format('DD.MM.YYYY')} -{' '}
                  {item.end ? moment(item.end).format('DD.MM.YYYY') : 'Nykyhetkeen'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomButton buttonText="Luo profiilista CV" buttonAction={generatePdf} />
    </>
  );
}

const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
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
