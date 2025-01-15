import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
const pkg = require("../../../../package.json");
import * as Device from "expo-device";
import { router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import Footer from "../Common/Footer";
import axios from "axios";
import {BaseUrl} from "../../../src/utils/serviceConfig";

const ElecReading = () => {
  const routerN = useRouter();
  const navigation = useNavigation();
  const appVersion = pkg.version;
  const [deviceId, setDeviceId] = useState("Click below to get unique Id");
  const [clientName, setclientName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [compCoed, setcompCoed] = useState(null);

  const colors = [
    "rgba(26, 147, 220, 0.8)",
    "rgba(207, 255, 255, 0.5)",
    "rgba(157, 254, 255, 0.8)",
  ];

  const getdeviceId = async () => {
    var uniqueId = Device.osInternalBuildId;
    console.log(`Device Id is : ${uniqueId}`);
    console.log(uniqueId);
    setDeviceId(uniqueId);
  };

  const clearasyncStorage = async () => {
    await AsyncStorage.clear();
  };

  const handleLogout = async () => {
    await clearasyncStorage();
    navigation.navigate("index");
    //    navigator.nav('/index');
  };

  useEffect(() => {
    //retrveSessionData();
    let numb = 1;
    let text = numb.toString();
    console.log(
      `Divisible ${text.padEnd(
        Math.round(74052820 / 5).toString().length,
        "0"
      )}`
    );

    getdeviceId();
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you exit from this app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleSubmit = () => {
    if (!electConsumption || !rate) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    } else {
      // routerN.push("/src/screen/ReviewScreens/ElecSubmit", {
      //   electConsumption,
      //   rate,
      // });
      navigation.navigate("src/screen/ReviewScreens/ElecSubmit", {
        electConsumption,
        rate,
      });
    }
    // Add navigation or API call logic here
  };

  const [electConsumption, setElectricityConsumtion] = useState("");
  const [rate, setRate] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* This is For Header */}
      <View style={styles.containerheader}>
        <TouchableOpacity
          style={{ flex: 0.4, alignItems: "center" }}
          onPress={() => {
            routerN.push("/src/screen/Utility/UtilityMainTiles");
          }}
        >
          <AntDesign style={styles.icon} color="white" name="back" size={20} />
        </TouchableOpacity>
        <View style={{ flex: 3.5, alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins-Bold",
              flex: 2,
              textAlign: "right",
              marginTop: 10,
              paddingRight: 3,
              fontSize: 18,
            }}
            numberOfLines={1}
          >
            Electricity Reading
          </Text>
        </View>
        <TouchableOpacity
          style={{ flex: 0.4, alignItems: "center" }}
          onPress={() => {
            routerN.push("/src/screen/Drawer/DrawerNavigator");
          }}
        >
          <AntDesign style={styles.icon} color="white" name="home" size={25} />
        </TouchableOpacity>
        <StatusBar style="light" translucent="true" />
      </View>
      {/* This is For Header */}

      <View
        style={{
          flex: 6,
          flexDirection: "column",
          margin: 5,
          borderRadius: 20,
        }}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Enter the Electricity details.</Text>

          <Text style={styles.label}>Date</Text>
          <TextInput
            style={[styles.input, styles.readOnlyInput]}
            value={todayDate}
            editable={false} // Makes the input read-only
          />

          <Text style={styles.label}>Electricity Consumption</Text>
          <TextInput
            style={styles.input}
            placeholder="Today's reading"
            keyboardType="numeric" // Numeric input only
            value={electConsumption}
            onChangeText={setElectricityConsumtion}
          />

          <Text style={styles.label}>Rate</Text>
          <TextInput
            style={styles.input}
            placeholder="Free Filled (7 by default)"
            keyboardType="numeric" // Numeric input only
            value={rate}
            onChangeText={setRate}
          />

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer></Footer>
      <FlashMessage position="top" />
    </>
  );
};

export default ElecReading;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 2,
    paddingRight: 2,
    padding: 0,
    borderRadius: 0,

    //borderColor:'red',
    //borderWidth:2,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    backgroundColor: "rgba(111,96,39,1)",
    borderRadius: 100,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    padding: 10,
  },
  readOnlyInput: {
    backgroundColor: "#e9e9e9",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  grdRow: {
    flex: 1,
    flexDirection: "row",
    margin: 1,
    marginTop: 0,
    justifyContent: "space-between",
  },

  containerheader: {
    flex: 0.4,
    backgroundColor: "rgba(111,96,39,0.9)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  containerfooter: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "rgba(28,143,223,1)",
  },
});
