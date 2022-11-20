import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Courses from "../api/Courseapi";
// import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
// import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/work-sans";
import AppLoading from "expo-app-loading";
import AsyncStorage from '@react-native-async-storage/async-storage';


const CourseDetails = ({ navigation, route }) => {
  // let [fontsLoaded] = useFonts({
  //   WorkSans_400Regular,
  //   Nunito_700Bold,
  // });

  // if (!fontsLoaded) {
  //   <AppLoading />;
  // }

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const [errortext, setErrortext] = useState('');

  const getFonts = () =>
    Font.loadAsync({
      WorkSans_400Regular: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf"),
      Nunito_700Bold: require("../../assets/fonts/Nunito-Italic-VariableFont_wght.ttf"),
    });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    <AppLoading
      startAsync={getFonts}
      onFinish={() => {
        setFontsLoaded(true);
      }}
      onError={console.warn}
    />;
  }

  const getUsersCoursesFromDataBase = async () => {
    var user_email = await AsyncStorage.getItem('user_email');
    var user_id = await AsyncStorage.getItem('user_id');

    // Update user courses
    let dataToSend = { email: user_email, id: user_id };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('API_END_POINT_1', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
        if (responseJson.msg === 'success') {
          AsyncStorage.setItem('user_courses', responseJson.data.user_courses)
        } else {
          setErrortext(responseJson.msg);
          console.log(responseJson.msg);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => getUsersCoursesFromDataBase(), []);

  const handleJoinPress = async () => {

    setErrortext('');

    var user_email = await AsyncStorage.getItem('user_email');
    var user_id = await AsyncStorage.getItem('user_id');
    var user_courses = await AsyncStorage.getItem('user_courses');

    let dataToSend = { email: user_email, id: user_id, courses: user_courses, new_courseID: selectedCourse._id };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('API_END_POINT_2', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
        if (responseJson.msg === 'success') {
          getUsersCoursesFromDataBase();
        } else {
          setErrortext(responseJson.msg);
          console.log(responseJson.msg);
        }
      })
      .then(() => navigation.navigate("Course", {
        courseId: selectedCourse._id,
        myJSON: responseJson
      }))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLearnPress = async () => {

    setErrortext('');

    var user_email = await AsyncStorage.getItem('user_email');
    var user_id = await AsyncStorage.getItem('user_id');
    var user_courses = await AsyncStorage.getItem('user_courses');

    let dataToSend = { email: user_email, id: user_id, courses: user_courses, new_courseID: selectedCourse._id };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    console.log('isEnrolled : ' + isEnrolled)

    console.log('isEnrolled1 : ' + isEnrolled)
    getUsersCoursesFromDataBase();
    navigation.navigate("Course", {
      courseId: selectedCourse._id,
      myJSON: responseJson
    });

  };

  const responseJson = route.params.myJSON;

  console.log('responseJson : ' + responseJson)

  const id = route.params.courseId;

  const selectedCourse = responseJson.find((element) => {
    return id === element._id;
  });

  const [isEnrolled, setIsEnrolledOrNot] = useState([]);

  const getIsEnrolledOrNot = async (course_id) => {
    try {
      var user_courses = await AsyncStorage.getItem('user_courses');
      if (user_courses === null) {
        setIsEnrolledOrNot(false);
      } else {
        // console.log('user_courses: ' + user_courses)
        var array = user_courses.split(', ');
        if (array.indexOf(course_id) > -1) {
          setIsEnrolledOrNot(true);
        } else {
          setIsEnrolledOrNot(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getIsEnrolledOrNot(selectedCourse._id), []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.courseContainer}>
        <View>
          <Image
            style={styles.cardImage}
            source={{ uri: selectedCourse.image }}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.mainHeader}>{selectedCourse.title}</Text>

        <Text style={styles.description}>{selectedCourse.description}</Text>

        <Text style={[styles.description, styles.subCourse]}>
          {selectedCourse.tag1}
        </Text>

        <Text style={[styles.description, styles.subCourse]}>
          {selectedCourse.tag2}
        </Text>

        <Text style={[styles.description, styles.subCourse]}>
          {selectedCourse.tag3}
        </Text>

        <View style={styles.buttonContainer}>
          <Text style={styles.price}> {selectedCourse.price === null ? 'Free' : selectedCourse.price + ' USD'} </Text>
          <TouchableOpacity
            style={isEnrolled === true ? styles.buttonStyle : styles.buttonStyleHide}
            onPress={() => { handleLearnPress(); }}>
            {/* <Text style={styles.buttonText}> {isEnrolled === true ? 'Learn' : 'Join Now'} </Text> */}
            <Text style={styles.buttonText}> {'Learn'} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isEnrolled === false ? styles.buttonStyle : styles.buttonStyleHide}
            onPress={() => { handleJoinPress(); }}>
            <Text style={styles.buttonText}> {'Join Now'} </Text>
            {/* <Text style={styles.buttonText}> {isEnrolled === true ? 'Learn' : 'Join Now'} </Text> */}
          </TouchableOpacity>
        </View>
        {errortext != '' ? (
          <Text style={styles.errorTextStyle}>
            {errortext}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

// !todo style the course1 and make it uppercase

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "red",
    paddingHorizontal: 20,
  },
  courseContainer: {
    // height: "50%",
    // display: "flex",
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.90)",
    textAlign: "center",
    borderRadius: 5,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    marginVertical: 30,
  },

  cardImage: {
    width: "100%",
    display: "flex",
    alignSelf: "center",
    height: undefined,
    aspectRatio: 1,
  },

  mainHeader: {
    fontSize: 22,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    paddingTop: 10,
    paddingBottom: 15,
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
  },

  subHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    paddingBottom: 15,
    fontFamily: "WorkSans_400Regular",
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#7d7d7d",
    paddingBottom: 20,
    fontFamily: "WorkSans_400Regular",
    lineHeight: 20,
  },
  subCourse: {
    textTransform: "uppercase",
    color: "#344055",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  price: {
    backgroundColor: "#344055",
    color: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 1,
    borderTopLeftRadius: 1,
    fontSize: 20,
    fontFamily: "WorkSans_400Regular",
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#809fff",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyleHide: {
    backgroundColor: "#809fff",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    display: 'none'
  },
  buttonText: {
    fontSize: 20,
    color: "#eee",
    fontFamily: "WorkSans_400Regular",
  },
  buttonTextHide: {
    fontSize: 20,
    color: "#eee",
    fontFamily: "WorkSans_400Regular",
    display: 'none'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default CourseDetails;
