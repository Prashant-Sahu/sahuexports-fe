import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "./src/utils/colors";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import * as Device from "expo-device";
import FlashMessage from "react-native-flash-message";

SplashScreen.preventAutoHideAsync();

const index = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isLoading, setIsloading] = useState(false);
  const [loginId, setLoginId] = useState(null);
  const [loginPassword, setPassword] = useState(null);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleDashboard = async () => {
    if (!loginId || !loginPassword) {
      showMessage({
        message: "Please fill all fields",
        type: "warning",
        backgroundColor: "#ffc107",
        color: "#FFFFFF",
      });
      return;
    }

    validateUser();
  };

  const validateUser = async () => {
    const apiUrl = "http://192.168.0.60:8080/api/user/v1/login";
    const body = {
      ID: loginId,
      password: loginPassword,
    };
    console.log("Login Request Body:", JSON.stringify(body));

    setIsloading(true);
    try {
      const res = await axios.post(apiUrl, body);
      console.log("Server Response: ", JSON.stringify(res.data));

      if (res.data === "User authenticated successfully") {
        console.log("User authenticated successfully");

        await clearAsyncStorage();

        const userInfo = { id: loginId, authenicated: true };
        const userAccInfo = { permission: ["basic"] };

        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        await AsyncStorage.setItem("userAccInfo", JSON.stringify(userAccInfo));

        console.log("User Info:", JSON.stringify(userInfo));
        console.log("User Account Info:", JSON.stringify(userAccInfo));

        router.replace("/src/screen/Organization/OrganizationSelect");
      } else {
        console.log("Login failed", res.data.message);
        showMessage({
          message: "Login failed",
          description: res.data.message || "Login Failed. Please try again.",
          type: "danger",
          backgroundColor: "#dc3545",
          color: "#FFFFFF",
        });
      }
    } catch (error) {
      setIsloading(false);
      console.error("Error during login:", error);
      showMessage({
        message: "Error",
        description: "Login failed. Please try again.",
        type: "danger",
        backgroundColor: "#dc3545",
        color: "#FFFFFF",
      });
    } finally {
      setIsloading(false);
    }
  };

  const setAsyncStorage = async (key, data) => {
    await AsyncStorage.setItem(key, data);
  };

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {isLoading && (
          <ActivityIndicator size="large" color={colors.greenBar} />
        )}
      </View>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/sepl.png")} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Employee ID"
            placeholderTextColor={colors.primary}
            onChangeText={(text) => setLoginId(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.primary}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleDashboard}
        >
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textContainer: {
    flex: 0.1,
    marginVertical: 20,
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    width: "90%",
    marginLeft: "5%",
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: "Poppins-Medium",
  },
  loginButtonWrapper: {
    backgroundColor: colors.greenBar,
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
});
