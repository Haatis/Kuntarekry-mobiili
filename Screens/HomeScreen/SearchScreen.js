import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import SmallCard from '../../components/SmallCard';
import TestData from '../../components/TestData';
import { CustomDrawerContent } from './CustomDrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

export default function SearchScreen() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        screenOptions={{ headerShown: false, drawerPosition: 'right' }} // hide the default drawer navigation bar
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Search" component={SearchContent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function SearchContent({ navigation }) {
  return (
    <View style={theme.containerTop}>
      <View style={[theme.outline, theme.dropShadow, styles.createButton]}>
        <Text style={[theme.textVariants.uiM, { color: theme.colors.textPrimary }]}>
          Haku: Kaikki ilmoitukset (2400)
        </Text>

        <MaterialCommunityIcons name={'magnify'} size={30} color={theme.colors.textPrimary} />
        <MaterialCommunityIcons
          name={'filter-outline'}
          size={30}
          color={theme.colors.textPrimary}
          onPress={() => navigation.openDrawer()} // open drawer when filter icon is pressed
        />
      </View>
      <SmallCard job={TestData.jobs[0]} />
      <SmallCard job={TestData.jobs[1]} />
    </View>
  );
}

const styles = StyleSheet.create({
  createButton: {
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
});
