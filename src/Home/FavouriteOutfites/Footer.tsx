import React from "react";
import { View } from "react-native";
import { Button } from "../../components";
import { Box } from "../../components/Theme";

interface FooterProps {
  label: string;
  onPress: () => void;
}

const Footer = ({ label, onPress }: FooterProps) => {
  return (
    <Box backgroundColor="secondary" padding="m" borderTopLeftRadius="xl">
      <Box alignItems="center" paddingBottom="l">
        <Button variant="primary" label={label} onPress={onPress} />
      </Box>
    </Box>
  );
};

export default Footer;
