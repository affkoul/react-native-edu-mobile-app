import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    Touchable,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Courses from "../api/Courseapi";
// import { useFonts, WorkSans_400Regular } from "@expo-google-fonts/work-sans";
// import { Nunito_700Bold } from "@expo-google-fonts/nunito";
import { useFonts } from "@expo-google-fonts/work-sans";
import AppLoading from "expo-app-loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
//Import React Native Video to play video
import Video from 'react-native-video';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
// import Test from '../../assets/video/test.MOV';



var realData;
var expTimeString = '';
var expTimeInt = 20000;
var timeNowInt;

const VideoList = ({ navigation, route }) => {
    // let [fontsLoaded] = useFonts({
    //   WorkSans_400Regular,
    //   Nunito_700Bold,
    // });

    // if (!fontsLoaded) {
    //   <AppLoading />;
    // }

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

    // For the video player starts

    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    // For the video player ends

    const [myData, setMyData] = useState([]);

    var filteredCourses = [];

    //return an array of objects according to key, value, or key and value matching
    async function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
                filteredCourses = filteredCourses.concat(getObjects(obj[i], key, val));
            } else
                //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                if (i == key && obj[i] == val || i == key && val == '') { //
                    objects.push(obj);
                    filteredCourses.push(obj);
                } else if (obj[i] == val && key == '') {
                    //only add if the object is not already in the array
                    if (objects.lastIndexOf(obj) == -1) {
                        objects.push(obj);
                        filteredCourses.push(obj);
                    }
                }
        }
        // console.log(JSON.stringify(objects))
        return objects;
    }

    //return an array of objects according to key and value matching
    const findObject = (obj = {}, key, value) => {
        const result = [];
        const recursiveSearch = (obj = {}) => {
            if (!obj || typeof obj !== 'object') {
                return;
            };
            if (obj[key] === value) {
                result.push(obj);
                filteredCourses.push(obj);
            };
            Object.keys(obj).forEach(function (k) {
                recursiveSearch(obj[k]);
            });
        }
        recursiveSearch(obj);
        return result;
    }

    //return an array of values that match on a certain key
    function getValues(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getValues(obj[i], key));
            } else if (i == key) {
                objects.push(obj[i]);
            }
        }
        console.log(objects)
        return objects;
    }

    //return an array of keys that match on a certain value
    function getKeys(obj, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getKeys(obj[i], val));
            } else if (obj[i] == val) {
                objects.push(i);
            }
        }
        console.log(objects)
        return objects;
    }

    const getUserData = async () => {
        try {
            try {
                await fetch('https://geniusandcourage.com:5000/getallcourses', {
                    method: 'POST',
                    headers: {
                        //Header Defination
                        'Content-Type':
                            'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        // realData = responseJson.data;
                        // console.log('realData: ' + realData);
                        // setMyData(realData);
                        AsyncStorage.setItem('courses', JSON.stringify(responseJson.data));
                        console.log("all courses: " + await AsyncStorage.getItem('courses'));
                        const exp = new Date().getTime();
                        var expString = exp.toString();
                        expTimeString = + expString;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } catch (error) {
                console.log(error);
            }
            var user_courses_ids = await AsyncStorage.getItem('user_courses');
            if (user_courses_ids === null) {

            } else {
                var user_courses_ids_array = user_courses_ids.split(', ');
                var all_courses = await AsyncStorage.getItem('courses');
                // var all_courses_array = all_courses.split(',');

                var jsAllCourses = JSON.parse(all_courses);

                for (let index = 0; index < user_courses_ids_array.length; index++) {
                    findObject(jsAllCourses, '_id', user_courses_ids_array[index]);

                }
                // console.log('filteredCourses: ' + JSON.stringify(filteredCourses))
                realData = filteredCourses;
                // console.log('realData: ' + realData)
                setMyData(realData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => AsyncStorage.getItem('courses').then((value) =>
    //   value === null ? getUserData() : getDataFromLolcalStorage()), []);
    useEffect(() => getUserData(), []);

    const courseCard = ({ item }) => {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.courseContainer}>
                    {/* <View>
                        <Image
                            style={styles.cardImage}
                            source={{ uri: item.posterLink }}
                            resizeMode="contain"
                        />
                    </View> */}
                    <Video
                        source={{url: item.contentLink}}
                        // style={{ width: 300, height: 300 }}
                        // style={styles.backgroundVideo}
                        style={styles.cardImage}
                        // onBuffer={this.videoBuffer}
                        // onError={this.videoError}
                        controls={true}
                        audioOnly={true}
                        poster={{ uri: item.posterLink }}
                        ref={(ref) => {
                            this.player = ref
                        }} />
                    {/* <Video
                        onEnd={onEnd}
                        onLoad={onLoad}
                        onLoadStart={onLoadStart}
                        onProgress={onProgress}
                        paused={paused}
                        ref={videoPlayer}
                        resizeMode={screenType}
                        // onFullScreen={isFullScreen}
                        source={{
                            uri:
                                item.contentLink,
                        }}
                        // style={styles.mediaPlayer}
                        style={styles.cardImage}
                        volume={10}
                    />
                    <MediaControls
                        duration={duration}
                        isLoading={isLoading}
                        mainColor="#333"
                        onFullScreen={onFullScreen}
                        onPaused={onPaused}
                        onReplay={onReplay}
                        onSeek={onSeek}
                        onSeeking={onSeeking}
                        playerState={playerState}
                        progress={currentTime}
                        toolbar={renderToolbar()}
                    /> */}
                    <Text style={styles.mainHeader}>{item.title}</Text>

                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() =>
                                navigation.navigate("VideoList", {
                                    courseId: item._id,
                                    myJSON: realData
                                })
                            }>
                            <Text style={styles.buttonText}> Learn </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={myData}
            renderItem={courseCard}
        />
    );
};


const styles = StyleSheet.create({
    cardImage: {
        width: "100%",
        height: undefined,
        aspectRatio: 1,
    },
    mainContainer: {
        paddingHorizontal: 20,
    },
    courseContainer: {
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
    mainHeader: {
        fontSize: 22,
        color: "#344055",
        textTransform: "uppercase",
        // fontWeight: 500,
        paddingBottom: 15,
        textAlign: "center",
        fontFamily: "Nunito_700Bold",
    },
    description: {
        textAlign: "left",
        fontFamily: "WorkSans_400Regular",
        paddingBottom: 15,
        lineHeight: 20,
        fontSize: 16,
        color: "#7d7d7d",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonStyle: {
        backgroundColor: "#809fff",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "#eee",
        fontFamily: "WorkSans_400Regular",
        textTransform: "capitalize",
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        flex: 1,
    },
    toolbar: {
        marginTop: 30,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
});

export default VideoList;
