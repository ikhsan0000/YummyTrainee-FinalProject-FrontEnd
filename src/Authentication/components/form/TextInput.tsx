import React from "react";
import { View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import theme, { Box } from "../../../components/Theme";
import { Button, Text } from "../../../components";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface TextInputProps extends RNTextInputProps {
  isEmail: boolean;
  icon: string;
}

const TextInput = ({ icon, isEmail, ...props }: TextInputProps) => {
  // React Hook Form here
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    console.log(data, "data");
  };

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

  const SIZE = theme.borderRadii.m * 2;

  return (
    <>
      <Box
        flexDirection="row"
        height={48}
        alignItems="center"
        borderRadius="s"
        borderColor="primary"
        borderWidth={1}
      >
        <Box paddingHorizontal="m">
          <Icon name={icon} size={20} color="#8A8D90" />
        </Box>

        <Controller
          control={control}
          name="email"
          rules={isEmail ? emailRule : passwordRule}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <>
                <Box flex={1}>
                  <RNTextInput
                    placeholderTextColor="#8A8D90"
                    underlineColorAndroid="transparent"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    {...props}
                  />
                </Box>

                {value !== undefined && (
                  <Box paddingHorizontal="m">
                    <Box
                      borderRadius="m"
                      height={SIZE}
                      width={SIZE}
                      backgroundColor={errors.email ? "danger" : "primary"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon name={errors.email ? "x" : "check"} color="white" />
                    </Box>
                  </Box>
                )}
              </>
            );
          }}
        />
      </Box>
      <Box marginTop="s">
        {errors.email && <Text color="danger">*{errors.email.message}</Text> }
      </Box>
    </>
  );
};

export default TextInput;
