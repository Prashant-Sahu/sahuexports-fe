import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Octicons, Ionicons } from "@expo/vector-icons";
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
const { brand, darkLight } = Colors;

const Signup = ({ navigation }) => {
  console.log("Signup component is rendering.");

  const [hidePassword, setHidePassword] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState("");
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../assets/images/sepl.png")}
          />
          <PageTitle>Signup</PageTitle>

          <Formik
            initialValues={{
              ID: "",
              unitName: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("Welcomepage");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Signup</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
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

export default Signup;
