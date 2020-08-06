import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeScreen, ReportsScreen, SplashScreen } from './SampleScreens'
import SettingsScreen from '../modules/settings/screens/SettingsScreen';
import CategorySelect from '../modules/categories/CategorySelect';
import { ScreenMode } from '../types/enums';


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MainTabs() {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Setting':
            iconName = 'cog'
            break;
          case 'Reports':
            iconName = 'home'
            break;
          default: ;
            break
        }
        return <Icon name={iconName} size={size} color={color} />
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Setting" component={SettingsScreen} />
    <Tab.Screen name="Reports" component={CategorySelect} initialParams={{mode: ScreenMode.Edit}} />
  </Tab.Navigator>
}

export default function AppRoutes() {
  return <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Splash" component={SplashScreen} />
  </Stack.Navigator>
}
