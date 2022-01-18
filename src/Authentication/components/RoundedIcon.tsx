import React from "react";
import { View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import theme, { Box, Theme, Text } from "../../components/Theme";

interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme["colors"];
  backgroundColor: keyof Theme["colors"];
  iconRatio: number;
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  iconRatio,
}: RoundedIconProps) => {
  const iconSize = size * iconRatio

  return (
    <Box paddingHorizontal="m">
      <Box
        height={size}
        width={size}
        backgroundColor={backgroundColor}
        alignItems="center"
        justifyContent="center"
        style={{borderRadius: size/2}}
      >
        <Text textAlign="center" color={color} style={{width: iconSize, height: iconSize,  textAlignVertical:"center"}}>
          <Icon name={name} size={iconSize} />
        </Text>
      </Box>
    </Box>
  );
};

RoundedIcon.defaultProps = { 
  iconSize: 0.7
}

export default RoundedIcon;
