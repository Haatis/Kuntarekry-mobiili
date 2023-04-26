import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../styles/theme';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNav({ tabs }) {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: [{ textTransform: 'none' }, theme.textVariants.ui],
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.inactive,
        swipeEnabled: false,
        tabBarStyle: {
          backgroundColor: theme.colors.inactiveNav,
          height: 50,
          elevation: 0,
        },
        tabBarPressColor: 'transparent',
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIndicatorStyle: {
              height: '100%',
              backgroundColor: 'white',
              borderBottomWidth: 2,
              borderColor: theme.colors.primary,
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
