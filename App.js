import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import About from "./src/screens/About";
import Contact from "./src/screens/Contact";
import Course from "./src/screens/Course";
import UserCourses from "./src/screens/UserCourses";
import CourseDetails from "./src/screens/CourseDetails";
import VideoList from "./src/screens/VideoList";
import PlayCourse from "./src/screens/PlayCourse";
// import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import * as Font from "expo-font";
import { useFonts } from "@expo-google-fonts/work-sans";
// import WorkSans_400Regular from './assets/fonts/WorkSans-VariableFont_wght.ttf';
// import Nunito_700Bold from './assets/fonts/Nunito-Italic-VariableFont_wght.ttf';
// import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
// import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import 'react-native-gesture-handler';

export default function App() {
  const Stack = createNativeStackNavigator();

  const getFonts = () =>
    Font.loadAsync({
      WorkSans_400Regular: require("./assets/fonts/WorkSans-VariableFont_wght.ttf"),
      Nunito_700Bold: require("./assets/fonts/Nunito-Italic-VariableFont_wght.ttf"),
    });

  // let [fontsLoaded] = useFonts({
  //   WorkSans_400Regular,
  //   Nunito_700Bold,

  // });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // if (!fontsLoaded) {
  //   <AppLoading />;
  // }
  if (!fontsLoaded) {
    <AppLoading
      startAsync={getFonts}
      onFinish={() => {
        setFontsLoaded(true);
      }}
      onError={console.warn}
    />;
  }

  const Auth = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Register', //Set Header Title
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

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home"> */}
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* home screen  */}
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}>
          {(props) => <Home {...props} channelName={"GAC EDU"} />}
        </Stack.Screen>

        {/* Course Screen  */}
        <Stack.Screen
          name="Course"
          component={Course}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitle: "Courses",
            headerTitleAlign: "center",
          }}
        />

        {/* UserCourses Screen  */}
        <Stack.Screen
          name="UserCourses"
          component={UserCourses}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitle: "My Courses",
            headerTitleAlign: "center",
          }}
        />

        {/* About Screen  */}
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitle: "About Us",
            headerTitleAlign: "center",
          }}
        />

        {/* Contact Screen  */}
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitle: "Contact Us",
            headerTitleAlign: "center",
          }}
        />

        {/* CourseDetails Screen  */}
        <Stack.Screen
          name="CourseDetails"
          component={CourseDetails}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitle: "Course Details",
            headerTitleAlign: "center",
          }}
        />

        {/* VideoList Screen  */}
        <Stack.Screen
          name="VideoList"
          component={VideoList}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitle: "Content",
            headerTitleAlign: "center",
          }}
        />

        {/* PlayCourse Screen  */}
        <Stack.Screen
          name="PlayCourse"
          component={PlayCourse}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              fontFamily: "Nunito_700Bold",
            },
            headerTitleAlign: "center",
          }}
        />

        {/* Login Screen  */}
        {/* <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}

        {/* Registration Screen  */}
        {/* <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Register', //Set Header Title
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> */}

        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />

        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />

        {/* Navigation Drawer as a landing page */}
        {/* <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
