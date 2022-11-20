import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import AsyncStorage from '@react-native-async-storage/async-storage';

const About = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    WorkSans_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    <AppLoading />;
  }

  const handleSubmitPress = () => {

    // fetch('https://geniusandcourage.com:5000/rnapplogout', {
    //   method: 'POST',
    //   headers: {
    //     //Header Defination
    //     'Content-Type':
    //       'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.msg === 'Success!') {
    //       AsyncStorage.removeItem('user_id');
    //       //   navigation.replace('DrawerNavigationRoutes');
    //       navigation.replace("LoginScreen")
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log(responseJson.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    AsyncStorage.removeItem('user_name');
    AsyncStorage.removeItem('user_email');
    AsyncStorage.removeItem('user_courses');
    AsyncStorage.removeItem('courses');
    AsyncStorage.removeItem('user_id').then((value) =>
      navigation.replace(
        value === null ? 'Auth' : 'Home'
      ),
    )
  };

  const [userDetails, setUserDetails] = useState([]);

  const getUserDetails = async () => {
    try {
      var userName = await AsyncStorage.getItem('user_name');
      setUserDetails(userName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getUserDetails(), []);

  return (
    <View style={styles.aboutContainer}>
      <Text style={styles.mainHeader}> Welcome to  GAC EDU</Text>
      <Text style={styles.paraStyle}> {userDetails} </Text>

      <View>
        <Image
          style={styles.imgStyle}
          source={{
            uri: "https://hlwsdtech.com:8081/images/profilepic.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
        />
      </View>

      <View style={styles.aboutLayout}>
        <Text style={styles.aboutSubHeader}> About Us </Text>
        <Text style={[styles.paraStyle, styles.aboutPara]}>
          We provide full-stack development courses on front and back end technologies
          such as OpenAI, JS, Swift, Java, and Node to develop web, native and hybrid apps.
        </Text>
      </View>

      <Text style={styles.mainHeader}> Follow us on Social Network </Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            Linking.openURL("http://instagram.com/clublambo")
          }>
          <Image
            style={styles.iconStyle}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            Linking.openURL(
              "https://www.youtube.com/channel/UCDpeqRPZfOo_QjZ8wZGjXUg/channels"
            )
          }>
          <Image
            style={styles.iconStyle}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/187/187210.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Linking.openURL("https://discord.com/channels/1040474913514999809/1040474913972166677")}>
          <Image
            style={styles.iconStyle}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/906/906361.png",
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonStyle2}
        activeOpacity={0.5}
        onPress={handleSubmitPress}>
        <Text style={styles.buttonTextStyle2}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },

  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    // marginTop: 50,
    marginTop: 40,
    marginBottom: 10,
    fontFamily: "Nunito_700Bold",
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
    fontFamily: "WorkSans_400Regular",
  },
  aboutLayout: {
    backgroundColor: "#4c5dab",
    paddingHorizontal: 30,
    // marginVertical: 30,
    marginTop: 20,
  },
  aboutSubHeader: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "500",
    marginVertical: 15,
    fontFamily: "Nunito_700Bold",
    alignSelf: "center",
  },
  aboutPara: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "WorkSans_400Regular",
    lineHeight: 26,
  },
  menuContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  iconStyle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
  },
  buttonStyle2: {
    backgroundColor: 'red',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    width: 350,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle2: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default About;
