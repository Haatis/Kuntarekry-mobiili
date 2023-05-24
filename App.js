import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import AlertScreen from './Screens/AlertsScreen/AlertsScreen';
import FavoritesScreen from './Screens/FavoritesScreen/FavoritesScreen';
import { useEffect } from 'react';
import * as Font from 'expo-font';
import { theme } from './styles/theme';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './components/DrawerContent';
import AppBar from './components/AppBar';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobScreen from './Screens/JobScreen';
import FavoriteFolder from './Screens/FavoriteFolder';
import * as SplashScreen from 'expo-splash-screen';
import WelcomeScreen from './Screens/OnboardingScreen/WelcomeScreen';
import { OnboardingProvider, useOnboarding } from './hooks/useonboarding';
import LoginScreen from './Screens/OnboardingScreen/LoginScreen';
import PersonalizationScreen from './Screens/OnboardingScreen/PersonalizationScreen';
import PersonalizationScreen2 from './Screens/OnboardingScreen/PersonalizationScreen2';
import { JobAdvertisementProvider } from './hooks/usejobadvertisements';
import { JobTaskProvider } from './hooks/usejobtasks';
import { JobLocationProvider } from './hooks/uselocations';
import { JobOrganisationProvider } from './hooks/usejoborganisations';
import { FilterProvider } from './hooks/usejobfilters';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
  return (
    <>
      <OnboardingProvider>
        <AppWrapper />
      </OnboardingProvider>
    </>
  );
}

function AppWrapper() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { onboardingDone } = useOnboarding();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleDrawerStatusChange = (status, filters) => {
    setIsDrawerOpen(status === 'open');
    setSelectedFilters(filters);
  };

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          Roboto: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
          RobotoMedium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
          SourceSansPro: require('./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        if (onboardingDone !== undefined) {
          setIsLoaded(true);
          SplashScreen.hideAsync();
        }
      }
    }

    loadResourcesAndDataAsync();
  }, [onboardingDone]);

  if (!isLoaded) {
    return null;
  }
  return (
    <JobAdvertisementProvider>
      <JobTaskProvider>
        <JobLocationProvider>
          <JobOrganisationProvider>
            <FilterProvider selectedFilters={selectedFilters}>
              <NavigationContainer>
                <StatusBar style="inverted" />
                <Drawer.Navigator
                  screenOptions={() => ({
                    drawerStyle: {
                      backgroundColor: theme.colors.primary,
                      borderBottomLeftRadius: 8,
                      borderTopLeftRadius: 8,
                    },

                    drawerPosition: 'right',
                    gestureEnabled: false,
                    swipeEnabled: isDrawerOpen, // enable swipe only when drawer is open
                  })}
                  drawerContent={(props) => (
                    <DrawerContent
                      {...props}
                      setIsDrawerOpen={setIsDrawerOpen}
                      onStatusChange={handleDrawerStatusChange}
                    />
                  )}
                >
                  {onboardingDone ? (
                    <Drawer.Screen
                      name="Search"
                      component={StackNavigator}
                      options={{ headerShown: false }}
                    />
                  ) : (
                    <Drawer.Screen
                      name="Onboarding"
                      component={OnBoardingStackNavigator}
                      options={{ headerShown: false }}
                    />
                  )}
                </Drawer.Navigator>
              </NavigationContainer>
            </FilterProvider>
          </JobOrganisationProvider>
        </JobLocationProvider>
      </JobTaskProvider>
    </JobAdvertisementProvider>
  );
}

function OnBoardingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: (props) => <AppBar {...props} /> }}>
      <>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalizationScreen" component={PersonalizationScreen} />
        <Stack.Screen name="PersonalizationScreen2" component={PersonalizationScreen2} />
      </>
    </Stack.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: (props) => <AppBar {...props} /> }}>
      <>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen
          name="JobScreen"
          component={JobScreen}
          options={({ route }) => ({
            header: () => (
              <AppBar
                back={true}
                title={route.params.job.title}
                underTitle={route.params.job.profitCenter}
              />
            ),
          })}
        />
        <Stack.Screen
          name="FavoriteFolder"
          component={FavoriteFolder}
          options={{
            header: () => <AppBar back={true} title={true} />,
          }}
        />
      </>
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
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
        tabBarLabelStyle: theme.textVariants.uiS,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.inactive,
        tabBarStyle: {
          display: 'flex',
          height: 54,
          paddingVertical: 8,
          paddingBottom: 4,
          backgroundColor: '#fff',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Etusivu" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Suosikit" component={FavoritesScreen} />
      <Tab.Screen name="Profiili" component={ProfileScreen} />
      <Tab.Screen name="Ilmoitukset" component={AlertScreen} />
      <Tab.Screen name="Lisää" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
