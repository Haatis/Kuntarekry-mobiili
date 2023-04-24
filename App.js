import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AlertScreen from './Screens/AlertsScreen';
import FavoritesScreen from './Screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Etusivu':
                iconName = focused ? 'home' : 'home-outline';
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
                iconName = focused ? 'plus' : 'plus-outline';
                break;
              default:
                iconName = 'help';
                break;
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
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
  );
}
