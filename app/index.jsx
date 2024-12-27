import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "./src/utils/colors";
import { fonts } from "./src/utils/fonts";
import { BaseUrlorgFounder } from "./src/utils/serviceConfig";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import Octicons from "react-native-vector-icons/Octicons";
import * as Device from "expo-device";
import * as Clipboard from "expo-clipboard";
import FlashMessage from "react-native-flash-message";
import { router, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const index = () => {
  const routerN = useRouter();
  const [loaded, error] = useFonts({
    ///Poppins
    "Poppins-Bold": require("../assets/fonts/tahoma/TAHOMAB0.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/tahoma/Tahoma Regular font.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/tahoma/TAHOMA_0.ttf"),
  });

  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);
  const [loginId, setLoginId] = useState(null);
  const [loginPassword, setPassword] = useState(null);
  const [clientApi, setclientApi] = useState([]);

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [isShowCompanyCode, setisShowCompanyCode] = useState(false);

  const getdeviceId = async () => {
    var uniqueId = Device.osInternalBuildId;
    console.log(`Device Id is : ${uniqueId}`);
    console.log(uniqueId);
    setDeviceId(uniqueId);
  };

  const handleDashboard = () => {
    if (loginId == null || loginId == undefined || loginId == "") {
      showMessage({
        description: "Warning message",
        message: "Please enter Employee Id",
        backgroundColor: "#ffc107",
        color: "#FFFFFF",
        type: "warning",
        fontFamily: "Poppins-Bold",
        fontSize: 50,
      });
      return;
    }
    if (
      loginPassword == null ||
      loginPassword == undefined ||
      loginPassword == ""
    ) {
      showMessage({
        description: "Warning message",
        message: "Please enter Password",
        backgroundColor: "#ffc107",
        color: "#FFFFFF",
        type: "warning",
        fontFamily: "Poppins-Bold",
        fontSize: 50,
      });
      return;
    }

    //validateCompCode();
    validateCompCodeDup();
  };

  const setasyncStorage = async (key, data) => {
    //await AsyncStorage.setItem(key,data);
    await AsyncStorage.setItem(key, data);
  };
  const clearasyncStorage = async () => {
    var abc = await AsyncStorage.getItem("userInfo");
    if (abc != null) {
      await AsyncStorage.clear();
    }
  };
  const validateUser = async () => {
    var uniqueId = Device.osInternalBuildId;
    const fcmToken = uniqueId;
    console.log("Called Validate User Function API ");

    const body = {
      ID: loginId,
      password: loginPassword,
    };
    console.log(`Login id ${companyCode} Req Body ${JSON.stringify(body)}`);
    setIsloading(true);
    console.log(`Req Url is  ${"172.27.176.1:8080"}/api/user/v1/login`);
    await axios
      .post("http://172.27.176.1:8080" + "/api/user/v1/login", body)
      .then(async (res) => {
        console.log("Called Validate User Function under");
        if (res.data == "User authenticated successfully") {
          await clearasyncStorage();
          console.log("Called Validate User Function Success");
          let userInfo = res.data.result;
          let userAccInfo = res.data.result2;
          console.log("Received Response Access is: ");
          console.log(userAccInfo);
          setUserInfo(userInfo);
          await setasyncStorage("userInfo", JSON.stringify(userInfo));
          await setasyncStorage("userAccInfo", JSON.stringify(userAccInfo));

          console.log(
            `Full Name is Before Set: ${userInfo.usercreated.toString()}`
          );
          await setIsloading(false);
          console.log(
            `User Validated Successfully Data received : ${JSON.stringify(
              userInfo
            )}`
          );
          //router.replace('/src/screen/Dashboard/MainDashboard');
          // router.replace('/src/screen/Drawer/DrawerNavigator');
          router.replace("/src/screen/Organization/OrganizationSelect");
          //navigation.navigate("/Dashboard/MainDashboard");
        } else {
          await setIsloading(false);
          showCommonAlert("Error Message", res.data.message);
        }
      })
      .catch(function (error) {
        setIsloading(false);
        if (error.response) {
          showMessage({
            message: error.response.data.message,
            type: "error",
            backgroundColor: "#dc3545",
            color: "#FFFFFF",
            description: "Error User Validation",
            fontFamily: "Poppins-Bold",
            fontSize: 16,
          });

          // showCommonAlert('Please share this Device Id to Admin:',fcmToken);

          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("First ");
          console.log(error.response.data);
          console.log("Second ");
          console.log(error.response.status);
          console.log("Third ");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          console.log("Fourth ");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const validateCompCodeDup = async () => {
    console.log("hi abc");
    router.replace("/src/screen/Organization/OrganizationSelect");
    //validateUser();
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    //checkhttps();
    getdeviceId();
    //console.log(`Device Id is ${JSON.stringify(getFreeDiskStorage())}`);
    console.log("Called use effect");

    //validateCompCodeDup();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const handleLogout = async () => {
    await clearasyncStorage();
    navigation.navigate("index");
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={require('./src/assets/Images/Background/MLoginBGWithoutLogoNONO.png')} blurRadius={0} resizeMode="cover" style={styles.image}> */}
      <View style={styles.textContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.greenBar} />
        ) : null}
      </View>
      <View
        style={{
          flex: 4,
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("../assets/images/sepl.png")}></Image>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {/* <Octicons name={"organization"} size={31} color={colors.primary} /> */}
          <TextInput
            style={styles.textInput}
            placeholder="Employee Id"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setLoginId(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Octicons name={"organization"} size={31} color={colors.primary} /> */}
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {isLoading == false ? (
          <TouchableOpacity
            style={styles.loginButtonWrapper}
            onPress={handleDashboard}
          >
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ flex: 3 }}></View>

      {/* </ImageBackground> */}
      {/* form  */}
      <FlashMessage position="top" />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.white,
    //padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 0.1,
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: "Poppins-SemiBold",
  },
  formContainer: {
    flex: 2,
    marginTop: 10,
    width: "90%",
    marginLeft: "5%",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255,0.8)",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255,0.8)",
    borderRadius: 20,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Medium",
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.primary,
    fontFamily: "Poppins-SemiBold",
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: "rgba(111,96,39,1)",
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: "Poppins-Regular",
  },
  signupText: {
    color: colors.primary,
    fontFamily: "Poppins-Bold",
  },
  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
