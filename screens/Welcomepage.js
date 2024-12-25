import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  InnerContainer,
  PageTitle,
  Line,
  StyledFormArea,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
} from "../components/styles";

const Welcomepage = ({ navigation }) => {
  console.log("Welcome component is rendering.");
  return (
    <InnerContainer>
      <StatusBar style="light" />
      <WelcomeImage
        resizeMode="cover"
        source={require("../assets/images/sepl.png")}
      />
      <WelcomeContainer>
        <PageTitle welcome={true}>Welcome to SEPL</PageTitle>
        <StyledFormArea>
          <Avatar
            resizeMode="cover"
            source={require("../assets/images/sepl.png")}
          />

          <Line />
          <StyledButton onPress={() => navigation.navigate("Login")}>
            <ButtonText>Logout</ButtonText>
          </StyledButton>
        </StyledFormArea>
      </WelcomeContainer>
    </InnerContainer>
  );
};

export default Welcomepage;
