import React from "react";
import { View } from "react-native";

import { Button, Container, Text } from "../../components";
import { Box } from "../../components/Theme";
import Checkbox from "../components/form/Checkbox";
import TextInput from "../components/form/TextInput";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button variant="transparent" onPress={() => alert("signup")}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              Don't have an account?
            </Text>
            <Text marginLeft="s" variant="button" color="primary">
              Sign up here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );

  return (
    <Container footer={footer}>
      <Box padding="l">
        <Text variant="title1" textAlign="center" marginBottom="m">
          Welcome Back
        </Text>
        <Text textAlign="center" variant="body" marginBottom="l">
          Use your credentials below to login to your account
        </Text>

        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            isEmail
          ></TextInput>
        </Box>

        <TextInput icon="lock" placeholder="Enter your Password"></TextInput>

        <Box flexDirection="row" justifyContent="space-between">
          <Checkbox label="Remeber me" />
          <Button variant="transparent">
            <Text color="primary">Forgot Password?</Text>
          </Button>
        </Box>

        <Box alignItems="center" marginTop="m">
          <Button variant="primary" label="Log In" />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
