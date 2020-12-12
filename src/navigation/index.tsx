import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';

import CategoriesScreen from '../modules/categories/CategoriesScreen';
import HomeScreen from '../modules/expenses/HomeScreen';
import ReportsScreen from '../modules/Reports/ReportsScreen';
import SettingsScreen from '../modules/settings/screens/SettingsScreen';
import { ScreenMode } from '../types/enums';
import { Theme } from '../types/theme.types';
import AppHeader from './AppHeader';
import { SplashScreen } from './SampleScreens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BackBtn = styled.View`
  padding: 0 20px;
`;

interface Props {
  theme: Theme;
}

function MainTabsComponent({ theme }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tabBarIcon: ({ focused, color, size }) => {
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
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
      <Tab.Screen
        name='Reports'
        component={ReportsScreen}
        initialParams={{ mode: ScreenMode.Edit }}
      />
    </Tab.Navigator>
  );
}

const MainTabs = withTheme(MainTabsComponent);

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name='MainTabs'
        component={MainTabs}
        options={{ headerTitle: () => <AppHeader /> }}
      />
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen
        name='CategorySelect'
        component={CategoriesScreen}
        options={{
          title: 'Popup',
          headerTitle: () => <AppHeader title='Edit Categories' />,
          headerBackImage: props => (
            <BackBtn>
              <Icon name='arrow-left' size={18} color={props.tintColor} />
            </BackBtn>
          ),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
