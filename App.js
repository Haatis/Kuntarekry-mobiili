import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen/ProfileScreen';
import AlertScreen from './Screens/AlertsScreen/AlertsScreen';
import FavoritesScreen from './Screens/FavoritesScreen/FavoritesScreen';
import { useFonts } from 'expo-font';
import { theme } from './styles/theme';
import { StatusBar } from 'expo-status-bar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from './Screens/HomeScreen/CustomDrawerContent';
import AppBar from './components/AppBar';
import { useState } from 'react';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <Drawer.Navigator
          screenOptions={() => ({
            drawerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerShown: false,
            drawerPosition: 'right',
            gestureEnabled: false,
            swipeEnabled: isDrawerOpen, // enable swipe only when drawer is open
          })}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} setIsDrawerOpen={setIsDrawerOpen} />
          )}
        >
          <Drawer.Screen name="Search" component={TabNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
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
        header: () => <AppBar />,
      })}
    >
      <Tab.Screen name="Etusivu" component={HomeScreen} />
      <Tab.Screen name="Suosikit" component={FavoritesScreen} />
      <Tab.Screen name="Profiili" component={ProfileScreen} />
      <Tab.Screen name="Ilmoitukset" component={AlertScreen} />
      <Tab.Screen name="Lisää" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
