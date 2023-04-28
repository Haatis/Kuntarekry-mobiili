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
import { DrawerContent } from './components/DrawerContent';
import AppBar from './components/AppBar';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobScreen from './Screens/JobScreen';
import FavoriteFolder from './Screens/FavoriteFolder';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
          drawerContent={(props) => <DrawerContent {...props} setIsDrawerOpen={setIsDrawerOpen} />}
        >
          <Drawer.Screen name="Search" component={StackNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ header: (props) => <AppBar {...props} /> }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen
        name="JobScreen"
        component={JobScreen}
        options={{
          header: () => <AppBar back={true} title={true} />,
        }}
      />
      <Stack.Screen
        name="FavoriteFolder"
        component={FavoriteFolder}
        options={{
          header: () => <AppBar back={true} title={true} />,
        }}
      />
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
