import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image, StatusBar } from "react-native";

const Menu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Course")}>
        {/* <Text>Course</Text> */}
        <Image
          style={styles.iconStytle}
          source={{
            uri: "https://hlwsdtech.com:8081/images/analysis.png",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("UserCourses")}>
        <Image
          style={styles.iconStytle}
          source={{
            uri: "https://hlwsdtech.com:8081/images/conference.png",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("Contact")}>
        <Image
          style={styles.iconStytle}
          source={{
            uri: "https://hlwsdtech.com:8081/images/phone.png",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("About")}>
        <Image
          style={styles.iconStytle}
          source={{
            uri: "https://hlwsdtech.com:8081/images/about.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textStyle: {
    textTransform: "uppercase",
  },
  iconStytle: {
    width: "100%",
    height: 50,
    aspectRatio: 1,
  },
});

export default Menu;
