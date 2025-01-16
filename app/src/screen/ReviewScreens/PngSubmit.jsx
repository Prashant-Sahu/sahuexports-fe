import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useEffect, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../Common/Footer";
import axios from "axios";
import {BaseUrl} from "../../../src/utils/serviceConfig";
import FlashMessage from "react-native-flash-message";
import { router,useRouter } from "expo-router";
import { showMessage } from "react-native-flash-message";

const ElecSubmit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pngConsumption, rate } = route.params;
  const [isLoading, setIsloading] = useState(false);

  console.log("PNG Consumption: ", pngConsumption);

  const totalCost = parseFloat(pngConsumption) * parseFloat(rate);

  const handleEdit = () => {
    navigation.goBack();
  };

  const handleFinalSubmit = async () => {
    // Add database submission logic here
    //Alert.alert("Success", "Data submitted successfully.");
    // Navigate to another screen if needed

    const authenticationToken = await AsyncStorage.getItem('authenticationToken');
    const body = {
      "companyId":1,
      "branchId":1,
      "moduleId":9,
      "reading":pngConsumption,
      "rate":rate,
      "unit":"SCM",
      "recordDate":new Date().toISOString()
    };
    setIsloading(true);
    try {
      const apiUrl=BaseUrl;
      const res = await axios.post(apiUrl+"api/utility/v1/saveUtilityData", body,{ headers: { "Authorization": "Bearer " + authenticationToken} });
      console.log("Server Response: ", JSON.stringify(res.data));

      if (res.data.status === "ok") 
        {
          showMessage({
            description: 'Electricity Consumption',
            message: res.data.errMsg,
            type: "success",
            backgroundColor: '#ffc107',
            color: '#000000',
            fontFamily: 'Poppins-Bold',
            fontSize: 50
          });
        console.log("Electricity Data Submited successfully");
        setTimeout(() => 
          {
            router.replace("/src/screen/Utility/PngReading");
        }, 2000);
      } else {
        console.log("Login failed", res.data.errMsg);
        showMessage({
          message: res.data.errMsg,
          description: "Error on PNG Data Submit",
          type: "danger",
          backgroundColor: "#dc3545",
          color: "#FFFFFF",
        });
      }
    } catch (error) {
      setIsloading(false);
      console.error("Error during login:", error);
      showMessage({
        message: error,
        description: "Error on PNG Data Submit",
        type: "danger",
        backgroundColor: "#dc3545",
        color: "#FFFFFF",
      });
    } finally {
      setIsloading(false);
    }

  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Review PNG Details</Text>

        <Text style={styles.label}>PNG Consumption: {pngConsumption} SCM</Text>
        <Text style={styles.label}>Rate: {rate} per SCM</Text>
        <Text style={styles.label}>Total Cost: ${totalCost.toFixed(2)}</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleFinalSubmit}
        >
          <Text style={styles.buttonText}>Final Submit</Text>
        </TouchableOpacity>
      </View>
      <Footer />
      <FlashMessage position="center" />
    </>
  );
};

export default ElecSubmit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "rgba(111,96,39,1)",
    borderRadius: 100,
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
