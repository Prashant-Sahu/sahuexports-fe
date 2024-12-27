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
} from "react-native";
import React, { useEffect, useState } from "react";
import { showMessage } from "react-native-flash-message";
import { fonts } from "../../utils/fonts";
const pkg = require("../../../../package.json");
import { Appbar } from "react-native-paper";
import * as Device from "expo-device";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import FlashMessage from "react-native-flash-message";
import Footer from "../Common/Footer";

const Home = () => {
  const routerN = useRouter();
  const navigation = useNavigation();
  const appVersion = pkg.version;
  const [deviceId, setDeviceId] = useState("Click below to get unique Id");
  const [clientName, setclientName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [compCoed, setcompCoed] = useState(null);

  const retrveSessionData = async () => {
    const tempclientName = await AsyncStorage.getItem("clientName");
    const tempuserName = await AsyncStorage.getItem("fullName");
    const tempCompCode = await AsyncStorage.getItem("companyCode");
    if (tempclientName != null) {
      await setclientName(tempclientName.toString());
      await setUserName(tempuserName.toString());
      await setcompCoed(tempCompCode.toString());
    } else {
      navigation.navigate("index");
    }
  };

  const checkSessionData = async (blockId) => {
    const access = await AsyncStorage.getItem("userAccInfo");
    const tempisAccAppOn = await AsyncStorage.getItem("isApprovalOn");
    console.log("acc Details:");
    console.log(access);
    if (access != null) {
      var accDetails = JSON.parse(access);
      if (blockId == "abc") {
        showMessage({
          description: "Warning message",
          message: "Comming Soon",
          backgroundColor: "#ffc107",
          color: "#FFFFFF",
          type: "warning",
          fontFamily: "Poppins-Bold",
          fontSize: 50,
        });
      }
    } else {
      if (blockId == "Utility") {
        routerN.push("/src/screen/Utility/UtilityMainTiles");
      } else {
        showMessage({
          description: "Warning message",
          message: "Comming Soon",
          backgroundColor: "#ffc107",
          color: "#FFFFFF",
          type: "warning",
          fontFamily: "Poppins-Bold",
          fontSize: 50,
        });
      }
    }
  };
  const handledashboardMenu = (blockId) => {
    checkSessionData(blockId);
  };

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

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderColor: "black",
          borderWidth: 1.2,
          margin: 10,
          borderRadius: 20,
        }}
      >
        <View
          style={{ flex: 3, justifyContent: "space-evenly", marginLeft: 20 }}
        >
          <View style={styles.grdRow}>
            <TouchableOpacity
              onPress={() => handledashboardMenu("ESS")}
              style={{ flex: 1, marginRight: 0, flexDirection: "column" }}
            >
              <View style={[styles.linearGradient]}>
                <Image
                  style={{
                    flex: 5.5,
                    margin: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  resizeMode="contain"
                  source={require("../../assets/Images/Dashboard/portofolio.png")}
                />
                <View
                  style={{
                    flex: 3.5,
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text style={[styles.buttonText]} numberOfLines={1}>
                    ESS
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handledashboardMenu("Utility")}
              style={{ flex: 1, marginRight: 0 }}
            >
              <View style={styles.linearGradient}>
                <Image
                  style={{ flex: 5.5, margin: 8, justifyContent: "center" }}
                  resizeMode="contain"
                  source={require("../../assets/Images/Dashboard/resource-allocation.png")}
                />
                <View
                  style={{
                    flex: 3.5,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.buttonText]} numberOfLines={1}>
                    Utilities
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handledashboardMenu("ManagementApproval")}
              style={{ flex: 1, marginRight: 0 }}
            >
              <View style={styles.linearGradient}>
                <Image
                  style={{
                    flex: 5.5,
                    margin: 8,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  resizeMode="contain"
                  source={require("../../assets/Images/Dashboard/approved.png")}
                />
                <View
                  style={{
                    flex: 3.5,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.buttonText]} numberOfLines={1}>
                    Management
                  </Text>
                  <Text style={[styles.buttonText]} numberOfLines={1}>
                    Approval
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 5, flexDirection: "column" }}>
        <View style={{ flex: 3 }}>
          <View style={styles.grdRow}>
            <TouchableOpacity style={{ flex: 6, marginRight: 0 }}>
              {/* <LinearGradient
                // Button Linear Gradient
                colors={colors}
                style={styles.linearGradient}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.buttonText}>
                  Process Approval
                  </Text>
                </View>
                <View style={{ flex: 5, marginLeft: '17%', justifyContent: 'center' }}>
                  <Image style={{ width: '70%', height: '120%', borderRadius: 70 }}
                    source={require('../../assets/Images/Dashboard/ProcessApproval.jpeg')} />
                </View>
              </LinearGradient> */}
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 6, marginRight: 0 }}>
              {/* <LinearGradient
                // Button Linear Gradient
                colors={colors}
                style={styles.linearGradient}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.buttonText}>
                  Local Sales Approval
                  </Text>
                </View>
                <View style={{ flex: 4, marginLeft: '17%', justifyContent: 'center' }}>
                  <Image style={{ width: '70%', height: '120%', borderRadius: 70 }}
                    source={require('../../assets/Images/Dashboard/LocalSalesApproval.jpeg')} />
                </View>
              </LinearGradient> */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <View style={styles.grdRow}>
            <TouchableOpacity style={{ flex: 6, marginRight: 0 }}>
              {/* <LinearGradient
                // Button Linear Gradient
                colors={colors}
                style={styles.linearGradient}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.buttonText}>
                  Purchase Approval
                  </Text>
                </View>
                <View style={{ flex: 5, marginLeft: '17%', justifyContent: 'center' }}>
                  <Image style={{ width: '70%', height: '120%', borderRadius: 70 }}
                    source={require('../../assets/Images/Dashboard/Admin.png')} />
                </View>
              </LinearGradient> */}
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 6, marginRight: 0 }}>
              {/* <LinearGradient
                // Button Linear Gradient
                colors={colors}
                style={styles.linearGradient}>
                <View style={{ flex: 3 }}>
                  <Text style={styles.buttonText}>
                  Purchase Approval
                  </Text>
                </View>
                <View style={{ flex: 4, marginLeft: '17%', justifyContent: 'center' }}>
                  <Image style={{ width: '70%', height: '120%', borderRadius: 70 }}
                    source={require('../../assets/Images/Dashboard/PurchaseApproval.jpg')} />
                </View>
              </LinearGradient> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer></Footer>
      <FlashMessage position="top" />
    </>
  );
};

export default Home;

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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    margin: 2,
    color: "black",
    backgroundColor: "transparent",
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
    flex: 0.6,
    backgroundColor: "rgba(28,143,223,0.7)",
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
