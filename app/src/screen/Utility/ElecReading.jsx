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
    loadExistingData();

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
    if (!electConsumption || !rate || electConsumption=='0') {0
      Alert.alert("Error", "Please fill all fields.");
      return;
    } else {
      navigation.navigate("src/screen/ReviewScreens/ElecSubmit", {
        electConsumption,
        rate,
      });
    }
  };

  const [electConsumption, setElectricityConsumtion] = useState("");
  const [rate, setRate] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];
  const [isLoading, setIsloading] = useState(false);

  const loadExistingData = async () => {
    const authenticationToken = await AsyncStorage.getItem('authenticationToken');
    const body = {
      "companyId":1,
      "branchId":1,
      "moduleId":8,
      "recordDate":new Date().toISOString()
    };
    setIsloading(true);
    try {
      await setElectricityConsumtion('0');
      await setRate('50');

      const apiUrl=BaseUrl;
      console.log(`Requet Body ${JSON.stringify(body)}`);
      const res = await axios.post(apiUrl+"api/utility/v1/getUtilityData", body,{ headers: { "Authorization": "Bearer " + authenticationToken} });
      console.log("Server Response: ", JSON.stringify(res.data));

      
          var utilityData=res.data.utility;
          if(utilityData.reading!=null && utilityData.reading!=undefined && parseFloat(utilityData.reading)>0)
          {
              await setElectricityConsumtion(utilityData.reading);
          }
          // if(utilityData.rate!=null && utilityData.rate!=undefined && parseFloat(utilityData.rate)>0)
          // {
          //     await setRate(utilityData.rate);
          // }
        console.log("Electricity Data has been fetched successfully");
    } catch (error) {
      setIsloading(false);
      if (error.response.status == 401) {
        handleLogout();
      }
      console.error("Error during login:", error);
    } finally {
      setIsloading(false);
    }

  };

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
            inputMode="numeric"
            value={electConsumption}
            onChangeText={setElectricityConsumtion}
          />

          <Text style={styles.label}>Rate</Text>
          <TextInput
            style={styles.input}
            placeholder="Free Filled (7 by default)"
            keyboardType="numeric" // Numeric input only
            inputMode="numeric"
            value={rate}
            onChangeText={setRate}
            editable={false} selectTextOnFocus={false}
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
