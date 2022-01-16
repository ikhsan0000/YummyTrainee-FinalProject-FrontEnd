import React from "react";
import { Alert } from "react-native";
import { Container, Button, Text } from "../../components";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import Footer from "../components/Footer";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box } from "../../components/Theme";
import TextInput from "../components/form/TextInput";

const ForgotPassword = ({
  navigation,
}: StackNavigationProps<Routes, "ForgotPassword">) => {
  // YUP
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(formSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const footer = (
    <Footer
      title="Don't work?"
      action="Try another way"
      onPress={() => {
        Alert.alert('Lorem Ipsum');
      }}
    />
  );

  return (
    <Container footer={footer}>
      <Box padding="l" justifyContent="center" flex={1} style={{marginTop: -50}}>
        <Text variant="title1" textAlign="center" marginBottom="m">
          Forgot Password ?
        </Text>
        <Text textAlign="center" variant="body" marginBottom="l">
          Enter the email address associated with your account
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

        <Box alignItems="center" marginTop="xl">
          <Button
            variant="primary"
            label="Reset Password"
            onPress={() => navigation.navigate("PasswordChanged")}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
