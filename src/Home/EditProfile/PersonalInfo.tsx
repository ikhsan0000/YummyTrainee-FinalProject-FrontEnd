import { ScrollView, View } from "react-native";
import React from "react";
import { Box, Text } from "../../components/Theme";
import CheckboxGroup from "./CheckboxGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../../Authentication/components/form/TextInput";
import { Button } from "../../components";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface PersonalInfoProps {}

const PersonalInfo = () => {
  // YUP
  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    address: Yup.string().required("Address is required"),
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


  const onSubmit = (data:any) => {
    console.log(data)
  }
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 50, marginRight: 30 }}
    >
      <Box padding="m">
        <Text variant="body" color="darkGrey">
          Account Information
        </Text>
      </Box>

      <Box marginBottom="m">
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="user"
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
      </Box>

      <Box marginBottom="m">
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
      </Box>

      <Box marginBottom="m">
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="map-pin"
                placeholder="Enter your Address"
                onBlur={onBlur}
                value={value}
                error={errors.password}
                errorMessage={errors?.password?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />
      </Box>
          <Controller
          control={control}
          name="gender"
          render={ ({ field: {onChange, value, onBlur} }) => {
            const changeGender = (data) => onChange(data)
            return (
              <CheckboxGroup options={genders} radio hookFormData={changeGender}/>

            )
          }

          }
           />
    
      {/* <CheckboxGroup options={genders} radio /> */}

      <Box alignItems="center" marginTop="l">
          <Button
            variant="primary"
            label="Change Personal Info"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      <Box paddingBottom="l" />
    </ScrollView>
  );
};

export default PersonalInfo;
