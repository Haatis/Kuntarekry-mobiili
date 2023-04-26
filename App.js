import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AlertScreen from './Screens/AlertsScreen';
import FavoritesScreen from './Screens/FavoritesScreen/FavoritesScreen';
import bgImage from './assets/rajattu.png';
import { useFonts } from 'expo-font';
import { theme } from './styles/theme';
import { StatusBar } from 'expo-status-bar';
import KuntaRekrySVG from './assets/logo.png';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    SourceSansPro: require('./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
  });

  if (!isLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="inverted" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName;

              switch (route.name) {
                case 'Etusivu':
                  iconName = focused ? 'home-variant' : 'home-variant-outline';
                  break;
                case 'Suosikit':
                  iconName = focused ? 'heart' : 'heart-outline';
                  break;
                case 'Profiili':
                  iconName = focused ? 'account' : 'account-outline';
                  break;
                case 'Ilmoitukset':
                  iconName = focused ? 'bell' : 'bell-outline';
                  break;
                case 'Lisää':
                  iconName = 'dots-vertical';
                  break;
                default:
                  iconName = 'help';
                  break;
              }

              return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
            },
            tabBarLabelStyle: theme.textVariants.ui,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.inactive,
            tabBarStyle: {
              display: 'flex',
              height: 54,
              paddingVertical: 8,
              paddingBottom: 4,
              backgroundColor: '#fff',
            },

            headerTitleAlign: 'center',
            headerTitle: (props) => (
              <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <Image
                  source={KuntaRekrySVG}
                  resizeMode="contain"
                  style={{ width: 215, height: 44 }}
                />
              </View>
            ),
            headerBackground: () => {
              return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <LinearGradient
                    colors={['rgba(12, 142, 194, 0.9)', 'rgba(51, 204, 128, 0.9)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ flex: 1 }}
                  >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Image
                        source={bgImage}
                        style={{
                          marginTop: 10,
                          flex: 1,
                          height: '85%',
                          resizeMode: 'cover',
                          opacity: 0.7,
                        }}
                      />
                      <Image
                        source={bgImage}
                        style={{
                          marginTop: 10,
                          marginLeft: 20,
                          flex: 1,
                          height: '85%',
                          resizeMode: 'cover',
                          opacity: 0.7,
                        }}
                      />
                    </View>
                  </LinearGradient>
                </View>
              );
            },
          })}
        >
          <Tab.Screen name="Etusivu" component={HomeScreen} />
          <Tab.Screen name="Suosikit" component={FavoritesScreen} />
          <Tab.Screen name="Profiili" component={ProfileScreen} />
          <Tab.Screen name="Ilmoitukset" component={AlertScreen} />
          <Tab.Screen name="Lisää" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
