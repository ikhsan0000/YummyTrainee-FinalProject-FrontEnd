import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Box, Text} from "../../components/Theme";
import SocialLogin from "./SocialLogin";

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer = ({ onPress, title, action }: FooterProps) => {
  return (
    <>
      <SocialLogin />
      <Box alignItems="center" marginTop="m">
        <TouchableWithoutFeedback onPress={onPress}>
          <Box flexDirection="row" justifyContent="center">
            <Text variant="button" color="white">
              {`${title}`}
            </Text>
            <Text marginLeft="s" variant="button" color="primary">
              {action}
            </Text>
          </Box>
        </TouchableWithoutFeedback>
      </Box>
    </>
  );
};

export default Footer;
