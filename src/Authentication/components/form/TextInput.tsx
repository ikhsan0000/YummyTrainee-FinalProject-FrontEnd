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
import RoundedIcon from "../RoundedIcon";

interface TextInputProps extends RNTextInputProps {
  icon: string;
  error: any;
  errorMessage: any;
}

const TextInput = ({ icon, error, errorMessage, ...props }: TextInputProps) => {
  
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

        {/* <Controller
          control={control}
          name="input"
          rules={rule}
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
                      backgroundColor={errors.input ? "danger" : "primary"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon name={errors.input ? "x" : "check"} color="white" />
                    </Box>
                  </Box>
                )}
              </>
            );
          }}
        /> */}

        <Box flex={1}>
          <RNTextInput
            placeholderTextColor="#8A8D90"
            underlineColorAndroid="transparent"
            {...props}
          />
        </Box>

        {(props.value !== undefined || error) && (
          // <Box paddingHorizontal="m">
          //   <Box
          //     borderRadius="m"
          //     height={SIZE}
          //     width={SIZE}
          //     backgroundColor={error ? "danger" : "primary"}
          //     alignItems="center"
          //     justifyContent="center"
          //   >
          //     <Icon name={error ? "x" : "check"} color="white" />
          //   </Box>
          // </Box>
          <RoundedIcon name={error ? "x" : "check"} color="white"  backgroundColor={error ? "danger" : "primary"} size={SIZE} />
        )}


      </Box>
      <Box marginBottom="s">
        {error && <Text color="danger">*{errorMessage}</Text>}
      </Box>
    </>
  );
};

export default TextInput;
