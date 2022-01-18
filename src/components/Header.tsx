import React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "../Authentication/components/RoundedIcon";
import { Box, Text } from "./Theme";

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
  };
  title: string;
  right: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
}

const Header = ({left, title, right, dark}:HeaderProps) => {
  const color = dark ? "white" : "secondary"
  const backgroundColor = dark ? "secondary" : "lightGrey"
  
    return (
    <Box flexDirection="row" justifyContent="space-between" marginTop="m" alignItems="center">
      <RectButton rippleColor="rgba(0,0,0,0)" onPress={left.onPress}>
        <RoundedIcon
          name={left.icon}
          color={color}
          backgroundColor={backgroundColor}
          size={40}
          iconRatio={0.5}
        ></RoundedIcon>
      </RectButton>

      <Text variant="header" color={color}>{title.toUpperCase()}</Text>

      <RectButton rippleColor="rgba(0,0,0,0)" onPress={right.onPress}>
        <RoundedIcon
          name={right.icon}
          color={color}
          backgroundColor={backgroundColor}
          size={40}
          iconRatio={0.5}
        ></RoundedIcon>
      </RectButton>
    </Box>
  );
};

Header.defaultProps = {
    dark:false
}

export default Header;
