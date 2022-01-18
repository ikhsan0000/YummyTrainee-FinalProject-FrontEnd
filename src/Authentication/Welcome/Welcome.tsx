import React from "react";
import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Button } from "../../components";
import { AuthNavigationProps } from "../../components/Navigation";
import { Box, Text } from "../../components/Theme";

const Welcome = ({ navigation }: AuthNavigationProps<"Welcome">) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="lightGrey"
        justifyContent="center"
      >
        <Text variant="hero">Welcome</Text>
      </Box>
      <Box flex={1} borderTopLeftRadius="xl">
        <Box
          backgroundColor="lightGrey"
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
        />

        <Box
          backgroundColor="white"
          borderTopLeftRadius="xl"
          flex={1}
          justifyContent="space-evenly"
          alignItems="center"
          padding="xl"
        >
          <Text variant="title2">Let's get started</Text>
          <Text variant="body" textAlign="center">
            Login to your account below or signup for an amazing experience
          </Text>
          <Button
            variant="primary"
            label="Have an account? Login"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            label="Join us, It's Free!"
            onPress={() => navigation.navigate("SignUp")}
          />
          <BorderlessButton
            rippleColor="rgba(0,0,0,0)"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text variant="button" color="secondary">
              Forgot Password?
            </Text>
          </BorderlessButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
