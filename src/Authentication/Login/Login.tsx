import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";

import { Button, Container, Text } from "../../components";
import {
  AppRoutes,
  AuthenticationRoutes,
  AuthNavigationProps,
} from "../../components/Navigation";
import { Box } from "../../components/Theme";
import Footer from "../components/Footer";
import Checkbox from "../components/form/Checkbox";
import TextInput from "../components/form/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BorderlessButton } from "react-native-gesture-handler";
import {
  CommonActions,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

const Login = ({ navigation }: AuthNavigationProps<"Login">) => {
  // YUP
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters"),
  });

  // React Hook Form here
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchema) });

  // Submit handler
  const onSubmit = async (data: any) => {
    console.log(data);

    // const formattedData = JSON.stringify({
    //   email: data.email,
    //   password: data.password,
    // });

    // axios({
    //   method: 'post',
    //   url: 'http://192.168.0.172:3000/auth/local/login',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data : formattedData
    // }).then((data) => {
    //   console.log(data)
    // }).catch((error) => {
    //   console.log(error)
    // });

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign up here"
      onPress={() => {
        navigation.navigate("SignUp");
      }}
    />
  );

  return (
    <Container pattern={2} footer={footer}>
      <Box padding="l">
        <Text variant="title1" textAlign="center" marginBottom="m">
          Welcome Back
        </Text>
        <Text textAlign="center" variant="body" marginBottom="l">
          Use your credentials below to login to your account
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="mail"
                placeholder="Enter your Email"
                autoCompleteType="email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
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
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Enter your Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errors.password}
                errorMessage={errors?.password?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />

        <Controller
          control={control}
          name="rememberMe"
          render={({ field: { onChange, value, onBlur } }) => {
            const rememberMe = (data: boolean) => onChange(data);
            return (
              <Box
                flexDirection="row"
                justifyContent="space-between"
                paddingVertical="m"
              >
                <Checkbox label="Remeber me" hookFormData={rememberMe} />

                <BorderlessButton
                  rippleColor="rgba(0,0,0,0)"
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text color="primary">Forgot Password?</Text>
                </BorderlessButton>
              </Box>
            );
          }}
        />

        {/* <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingVertical="m"
        >
          <Checkbox label="Remeber me" />
          <BorderlessButton
            rippleColor="rgba(0,0,0,0)"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text color="primary">Forgot Password?</Text>
          </BorderlessButton>
        </Box> */}

        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Log In"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
