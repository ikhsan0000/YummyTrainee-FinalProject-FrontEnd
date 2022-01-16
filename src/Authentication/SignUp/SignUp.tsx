import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, Text } from "../../components";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import Footer from "../components/Footer";
import Checkbox from "../components/form/Checkbox";
import TextInput from "../components/form/TextInput";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

interface SignUpProps {}

const SignUp = ({navigation}: StackNavigationProps<Routes, "SignUp">) => {
    
    // YUP
    const formSchema = Yup.object().shape({
        email: Yup.string()
        .required('Email is required')
        .email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .min(4, 'Password length should be at least 4 characters'),
        passwordConfirm: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password')], 'Passwords must and should match'),
      })
    
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
          title="Already have an account?"
          action="Login here"
          onPress={() => {
            navigation.navigate("Login")
          }}
        />
      );
    
      return (
        <Container footer={footer}>
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
              rules={emailRule}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <TextInput
                    icon="mail"
                    placeholder="Enter your Email"
                    autoCompleteType="email"
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
              name="passwordConfirm"
              rules={passwordRule}
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <TextInput
                    icon="lock"
                    placeholder="Enter your Password"
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
    
            <Box flexDirection="row" justifyContent="space-between">
              <Checkbox label="Remeber me" />
              <Button variant="transparent">
                <Text color="primary">Forgot Password?</Text>
              </Button>
            </Box>
    
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
}

export default SignUp
