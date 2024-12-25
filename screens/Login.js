import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, Text, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Octicons, Ionicons } from "@expo/vector-icons";
import axios from "axios";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  LeftIcon,
  Colors,
  RightIcon,
  MsgBox,
  TextLink,
  TextLinkContent,
  ExtraView,
  ExtraText,
} from "../components/styles";

// Keyboard avoiding Wrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// colors
const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
  console.log("Login component is rendering.");

  const [hidePassword, setHidePassword] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState("");

  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handlingMessage = (message, type = "Failed") => {
    setMessage(message);
    setMessageType(type);
  };

  const handleLogin = (credential, setSubmitting) => {
    handlingMessage(null);
    const url = "http://localhost:8080/api/user/v1/login";
    console.log("API called....");

    axios
      .post(url, credential)
      .then((response) => {
        console.log("Success....");
        const result = response.data;
        const { status, message, data } = result;

        if (status !== "SUCCESS") {
          handlingMessage(message, "Failed");
        } else {
          navigation.navigate("Welcomepage", { ...data[0] });
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.json());
        setSubmitting(false);
        handlingMessage("An error occurred. Please try again later.", "Failed");
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../assets/images/sepl.png")}
          />
          <PageTitle>Login</PageTitle>

          <Formik
            initialValues={{ ID: "", unitName: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.ID === "" ||
                values.password === "" ||
                values.unitName === ""
              ) {
                handlingMessage("Please fill all the fields", "Failed");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Employee ID"
                  icon="person"
                  placeholder="SRD123"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("ID")}
                  onBlur={handleBlur("ID")}
                  value={values.ID}
                />
                <View>
                  <StyledInputLabel>Unit</StyledInputLabel>
                  <Picker
                    selectedValue={selectedUnit}
                    onValueChange={(itemValue) => {
                      setSelectedUnit(itemValue);
                      handleChange("unitName")(itemValue);
                    }}
                    style={{
                      backgroundColor: Colors.secondary,
                      borderRadius: 5,
                      height: 60,
                      marginVertical: 3,
                      marginBottom: 10,
                    }}
                  >
                    <Picker.Item label="Select Unit" value="" />
                    <Picker.Item label="A-114" value="A-114" />
                    <Picker.Item label="A-222" value="A-222" />
                    <Picker.Item label="A-116" value="A-116" />
                    <Picker.Item label="GN-98" value="GN-98" />
                  </Picker>
                </View>
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "eye-off" : "eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
