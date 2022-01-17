import React from "react";
import { View } from "react-native";
import { Button, Container, Text } from "../../components";
import { Routes, StackNavigationProps } from "../../components/Navigation";
import { Box } from "../../components/Theme";
import { Feather as Icon } from "@expo/vector-icons";
import FooterCloseButton from "../components/FooterCloseButton";

const SIZE = 80;

const PasswordChanged = ({
  navigation,
}: StackNavigationProps<Routes, "PasswordChanged">) => {
  return (
    <Container patter={1}
      footer={
        <Box flexDirection="row" justifyContent="center" padding="s">
          <FooterCloseButton onPress={() => navigation.pop()} />
        </Box>
      }
    >
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="xl"
        style={{ marginTop: -30 }}
      >
        <Box
          backgroundColor="primaryLight"
          justifyContent="center"
          marginBottom="xl"
          style={{ height: SIZE, width: SIZE, borderRadius: SIZE / 2 }}
        >
          <Text color="primary" textAlign="center">
            <Icon name="check" size={32} />
          </Text>
        </Box>
        <Text variant="title1" textAlign="center" marginBottom="m">
          Your password has successfully changed
        </Text>
        <Text textAlign="center" variant="body" marginBottom="l">
          Close this window and login again
        </Text>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            label="Log in"
            onPress={() => navigation.navigate("Login")}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordChanged;
