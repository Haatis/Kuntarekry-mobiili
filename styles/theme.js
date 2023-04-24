import { useFonts } from 'expo-font';

const [fontsLoaded] = useFonts({
  Roboto: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  SourceSansPro: require('../assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
});

export const theme = {
  colors: {
    primary: '#0A8BC2',
    secondary: '#009978',
    inactive: '#808080',
    outline: '#EEEEEE',
    outlineDark: '#DBDBDB',
    button: '#35A9DB',
    textPrimary: '#4D4D4D',
    textSecondary: '#7D7D7D',
    danger: '#A94442',
    tag1: '#F1F5F8',
    tag2: '#FAD6D4',
    tag3: '#D4EFFA',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    ui: {
      fontFamily: Roboto,
      fontSize: 16,
    },
    body: {
      fontFamily: SourceSansPro,
      fontSize: 16,
    },
  },
};
