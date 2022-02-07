import React from "react";
import { View } from "react-native";
import { Button } from "../../components";
import { Box, Text } from "../../components/Theme";

interface FooterProps {
  label: string;
  onPress: () => void;
}

const Footer = ({ label, onPress }: FooterProps) => {
  return (
    <Box backgroundColor="secondary" padding="m" borderTopLeftRadius="xl">
      <Box alignItems="center">
        <Text color="grey" variant="header">MAKE YOUR WISH COME TRUE</Text>
      </Box>
    </Box>
  );
};

export default Footer;
