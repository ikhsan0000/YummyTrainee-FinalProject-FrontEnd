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
  right?: {
    icon: string;
    onPress: () => void;
  };
  dark: boolean;
  transparent?: boolean;
}

const Header = ({left, title, right, dark, transparent}:HeaderProps) => {
  const color = dark ? "white" : (transparent ? "white" : "secondary")
  const backgroundColor = dark ? "secondary" : (transparent ? "transparent" : "lightGrey")
  
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

      {right ? (
      <RectButton rippleColor="rgba(0,0,0,0)" onPress={right.onPress}>
        <RoundedIcon
          name={right.icon}
          color={color}
          backgroundColor={backgroundColor}
          size={40}
          iconRatio={0.5}
        ></RoundedIcon>
      </RectButton>) : (
          <View style={{width: 70}} />
      )
      }
    </Box>
  );
};

Header.defaultProps = {
    dark:false
}

export default Header;
