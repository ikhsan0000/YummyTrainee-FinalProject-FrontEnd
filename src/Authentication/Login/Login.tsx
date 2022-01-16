import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { Button, Container, Text } from "../../components";
import { Box } from "../../components/Theme";
import Checkbox from "../components/form/Checkbox";
import TextInput from "../components/form/TextInput";
import SocialLogin from "../components/SocialLogin";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  // React Hook Form here
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const emailRule = {
    required: {
      value: true,
      message: "Field is required",
    },
    pattern: {
      value: EMAIL_REGEX,
      message: "It's not a valid email",
    },
  };

  const passwordRule = {
    required: {
      value: true,
      message: "Field is required",
    },
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

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

        {/* <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            rule={emailRule}
          ></TextInput>
        </Box> */}

        <Controller
          control={control}
          name="email"
          rules={emailRule}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                icon="mail"
                placeholder="Enter your Email"
                value={value}
                error={errors.email}
                errorMessage={errors?.email?.message}
                onChangeText={(text) => onChange(text)}

              ></TextInput>
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          rules={passwordRule}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Enter your Password"
                secureTextEntry={true}
                value={value}
                error={errors.password}
                errorMessage={errors?.password?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />


        <Box flexDirection="row" justifyContent="space-between">
          <Checkbox label="Remeber me" />
          <Button variant="transparent">
            <Text color="primary">Forgot Password?</Text>
          </Button>
        </Box>

        <Box alignItems="center" marginTop="m">
          <Button variant="primary" label="Log In" onPress={handleSubmit(onSubmit)} />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
