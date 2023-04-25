import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AlertScreen from './Screens/AlertsScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import bgImage from './assets/Subtract.png';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import { theme } from './styles/theme';
import KuntaRekrySVG from './assets/logo.png';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    RobotoMedium: require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    SourceSansPro: require('./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
  });
  if (!isLoaded) {
    //Splash Screen
  }

  return (
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
              <View style={{ flex: 1 }}>
                <LinearGradient
                  colors={['rgba(12, 142, 194, 0.9)', 'rgba(51, 204, 128, 0.9)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
                <Image
                  source={bgImage}
                  style={{
                    position: 'absolute',
                    opacity: 0.6,
                    zIndex: 0,
                    top: 0,
                    width: 400,
                    resizeMode: 'contain',
                  }}
                />
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
  );
}
