// Example of Splash, Login and Sign Up in React Native
// https://github.com/affkoul/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import HomeScreen from '../screens/DrawerScreens/HomeScreen';
import SettingsScreen from '../screens/DrawerScreens/SettingsScreen';
import CustomSidebarMenu from '../screens/DrawerScreens/CustomSidebarMenu';
import NavigationDrawerHeader from '../screens/DrawerScreens/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'Home', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const settingScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

const DrawerNavigatorRoutes = (props) => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#cee1f2',
                color: '#cee1f2',
                itemStyle: { marginVertical: 5, color: 'white' },
                labelStyle: {
                    color: '#d8d8d8',
                },
            }}
            screenOptions={{ headerShown: false }}
            drawerContent={CustomSidebarMenu}>
            <Drawer.Screen
                name="homeScreenStack"
                options={{ drawerLabel: 'Home Screen' }}
                component={homeScreenStack}
            />
            <Drawer.Screen
                name="settingScreenStack"
                options={{ drawerLabel: 'Setting Screen' }}
                component={settingScreenStack}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigatorRoutes;