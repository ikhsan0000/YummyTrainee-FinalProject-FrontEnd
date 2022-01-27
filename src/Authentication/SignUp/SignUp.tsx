import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, Text } from "../../components";
import { AuthNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import Footer from "../components/Footer";
import Checkbox from "../components/form/Checkbox";
import TextInput from "../components/form/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AuthContext } from "../../services/authentication/auth.context";

interface SignUpProps {}

const SignUp = ({ navigation }: AuthNavigationProps<"SignUp">) => {
  // YUP
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid"),
    fullName: Yup.string()
      .required("Full Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters"),
    passwordConfirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  // Auth Context
  const { onRegister, isLoading, error }: any = useContext(AuthContext);


  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(formSchema) });

  const onSubmit = async (data: any) => {
    await onRegister(data).then(() => {
      navigation.navigate('RegisterSuccess');
    }).catch((err:any) => {
      console.log(err)
    })
  }

  const footer = (
    <Footer
      title="Already have an account?"
      action="Login here"
      onPress={() => {
        navigation.navigate("Login");
      }}
    />
  );

  return (
    <Container pattern={1} footer={footer}>
      <Box padding="l">
        <Text variant="title1" textAlign="center" marginBottom="m">
          Create Account
        </Text>
        <Text textAlign="center" variant="body" marginBottom="l">
          Let us know what's your name, email, and your password
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
          name="fullName"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="user"
                placeholder="Enter your Full Name"
                autoCompleteType="email"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errors.fullName}
                errorMessage={errors?.fullName?.message}
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
          name="passwordConfirm"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Please re-type your password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errors.passwordConfirm}
                errorMessage={errors?.passwordConfirm?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />

        <Box alignItems="center" marginTop="m">
          <Button
            isLoading={isLoading}
            variant="primary"
            label="Create Your Account"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
