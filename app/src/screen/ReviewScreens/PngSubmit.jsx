import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Footer from "../Common/Footer";

const ElecSubmit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pngConsumption, rate } = route.params;

  console.log("PNG Consumption: ", pngConsumption);

  const totalCost = parseFloat(pngConsumption) * parseFloat(rate);

  const handleEdit = () => {
    navigation.goBack();
  };

  const handleFinalSubmit = () => {
    // Add database submission logic here
    Alert.alert("Success", "Data submitted successfully.");
    // Navigate to another screen if needed
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Review PNG Details</Text>

        <Text style={styles.label}>PNG Consumption: {pngConsumption} kWh</Text>
        <Text style={styles.label}>Rate: {rate} per kWh</Text>
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
