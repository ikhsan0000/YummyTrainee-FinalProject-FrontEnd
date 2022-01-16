import React from "react";
import { View } from "react-native";
import { Button } from "../../components";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import { Box, Text } from "../../components/Theme";

const Welcome = ({navigation}: StackNavigationProps<Routes,"Login">) => {
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
          <Button variant="primary" label="Have an account? Login" onPress={() => navigation.navigate("Login")} />
          <Button label="Join us, It's Free!"  onPress={() => navigation.navigate("SignUp")} />
          <Button variant="transparent" label="Forgot Password?" />
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
