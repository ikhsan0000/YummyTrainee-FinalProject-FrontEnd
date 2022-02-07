import { ScrollView, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "../../components/Theme";
import CheckboxGroup from "./CheckboxGroup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../../Authentication/components/form/TextInput";
import { Button } from "../../components";
import { ProfileContext } from "../../services/profile/profile.context";
import ModalBox from "../../components/Modal";
import { StackActions } from "@react-navigation/native";
import ModalButtons from "./ModalButton";

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface PersonalInfoProps {
  // profile:any
  navigation: any
}

const PersonalInfo = ({navigation}: PersonalInfoProps) => {

  // Profile Context
  const { updateProfile, currentUserProfile, isLoading, changePassword, profile }:any = useContext(ProfileContext)
  useEffect(async () => {
    try{
      await currentUserProfile()
    } catch(err) {
      console.log(err)
    }
  }, [])

  // YUP
  const formSchemaProfile = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    address: Yup.string().required("Please fill your address"),
  });

  const formSchemaPassword = Yup.object().shape({
    oldPassword: Yup.string()
      .required("Current Password is required")
      .min(4, "Password length should be at least 4 characters"),
    password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters"),
    passwordConfirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });


  // React Hook Form here
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({ 
    mode: "onChange", resolver: yupResolver(formSchemaProfile) });
  
  const {
    control:controlPassword,
    handleSubmit:handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({ mode: "onChange", resolver: yupResolver(formSchemaPassword) });


  // modal handling
  const [showModal, setShowModal] = useState(false);
  const [modalLabel, setModalLabel] = useState('')
  const closeModal = () => {
    setShowModal(false);
  }

  // submit change personal info
  const onSubmit = async (data:any) => {
    setModalLabel('Profile Changed')
    await updateProfile(data)
      .then(setShowModal(true))
      .catch((err: any) => {
        console.log(err)
        navigation.dispatch(
          StackActions.replace('Authentication', { screen: 'Login' })
        );
      });
  }

  // submit change password
  const onSubmitPassword = async (data:any) => {
    setModalLabel('Password Changed')
    await changePassword(data)
    .then(setShowModal(true))
    .catch((err:any) => {
      console.log(err)
    })
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ marginBottom: 50, marginRight: 30 }}
    >
      <ModalBox trigger={showModal} closeModal={closeModal} label={modalLabel} buttons={<ModalButtons closeModal={closeModal}  />}/>

      <Box padding="m">
        <Text variant="body" color="darkGrey">
          Account Information
        </Text>
      </Box>

      <Box marginBottom="m">
        <Controller
          control={control}
          name="fullName"
          defaultValue={profile && profile.fullName}
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
                error={errors.fullName}
                errorMessage={errors?.fullName?.message}
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
          defaultValue={profile && profile.address}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="map-pin"
                placeholder="Enter your Address"
                onBlur={onBlur}
                value={value}
                error={errors.address}
                errorMessage={errors?.address?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />
      </Box>
          {/* <Controller
          control={control}
          name="gender"
          render={ ({ field: {onChange, value, onBlur} }) => {
            const changeGender = (data) => onChange(data)
            return (
              <CheckboxGroup options={genders} radio hookFormData={changeGender}/>

            )
          }

          }
           /> */}
    
      <Box alignItems="center" marginTop="l">
          <Button
            variant="primary"
            label="Change Personal Info"
            onPress={handleSubmit(onSubmit)}
          />
        </Box>
      <Box paddingBottom="l" />

      <Box padding="m">
        <Text variant="body" color="darkGrey">
          Change Password
        </Text>
      </Box>

      <Box marginBottom="m">
        <Controller
          control={controlPassword}
          name="oldPassword"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Enter your Current Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errorsPassword.password}
                errorMessage={errorsPassword?.password?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />
      </Box>

      <Box marginBottom="m">
        <Controller
          control={controlPassword}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Enter your New Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errorsPassword.oldPassword}
                errorMessage={errorsPassword?.oldPassword?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />
      </Box>

      <Box marginBottom="m">
        <Controller
          control={controlPassword}
          name="passwordConfirm"
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <TextInput
                icon="lock"
                placeholder="Please Re-type your New Password"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                error={errorsPassword.passwordConfirm}
                errorMessage={errorsPassword?.passwordConfirm?.message}
                onChangeText={(text) => onChange(text)}
              ></TextInput>
            );
          }}
        />
      </Box>

      <Box alignItems="center" marginTop="l">
          <Button
            variant="primary"
            label="Change Password Info"
            onPress={handleSubmitPassword(onSubmitPassword)}
          />
        </Box>
      <Box paddingBottom="l" />

    </ScrollView>
  );
};

export default PersonalInfo;
