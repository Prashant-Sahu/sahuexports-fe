import React from "react";

// React Navigation v6
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Colors
import { Colors } from "./../components/styles";
const { primary, tertiary } = Colors;

//Screens
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import Welcomepage from "./../screens/Welcomepage";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: tertiary,
        headerTransparent: true,
        headerTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        options={{ headerTintColor: "black" }}
        name="Welcomepage"
        component={Welcomepage}
      />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

export default RootStack;
