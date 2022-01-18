import React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import RoundedIcon from "../../../Authentication/components/RoundedIcon";
import theme, { Box, Theme, Text } from "../../../components/Theme";

interface DrawerItemProps {
  icon: string;
  color: keyof Theme["colors"];
  screen: string;
  label: string;
}

const DrawerItem = ({ icon, color, screen, label }: DrawerItemProps) => {
  return (
    <RectButton style={{borderRadius: theme.borderRadii.m}}>
      <Box flexDirection="row" alignItems="center" style={{padding: 12}} >
        <RoundedIcon
          name={icon}
          backgroundColor={color}
          color="white"
          size={36}
          iconRatio={0.6}
         
        />
        <Text variant="button" marginLeft="m">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
