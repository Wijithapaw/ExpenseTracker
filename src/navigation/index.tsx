import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ReportsScreen, SplashScreen} from './SampleScreens';
import SettingsScreen from '../modules/settings/screens/SettingsScreen';
import CategoriesScreen from '../modules/categories/CategoriesScreen';
import {ScreenMode} from '../types/enums';
import {withTheme} from 'styled-components';
import {Theme} from '../types/theme.types';
import HomeScreen from '../modules/expenses/HomeScreen';
import AppHeader from './AppHeader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface Props {
  theme: Theme;
}

function MainTabsComponent({theme}: Props) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Settings':
              iconName = 'cog';
              break;
            case 'Reports':
              iconName = 'line-chart';
              break;
            default:
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.button.primary,
        inactiveTintColor: theme.button.secondary,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        initialParams={{mode: ScreenMode.Edit}}
      />
    </Tab.Navigator>
  );
}

const MainTabs = withTheme(MainTabsComponent);

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: props => <AppHeader />
      }}>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{title: 'Expense Tracker'}}
      />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="CategorySelect"
        component={CategoriesScreen}
        options={{headerTitle: props => <AppHeader title="Expense Categories" />}}
      />
    </Stack.Navigator>
  );
}
