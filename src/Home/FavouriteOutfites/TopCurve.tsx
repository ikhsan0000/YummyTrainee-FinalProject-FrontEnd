import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@shopify/restyle";

interface TopCurveProps {
  footerHeight: number;
}

const TopCurve = ({ footerHeight }: TopCurveProps) => {
  const theme = useTheme();
  const size = theme.borderRadii.xl;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 1 1"
      style={{ position: "absolute", bottom: footerHeight, right: 0 }}
    >
     <Path d="M 0 1 A 0 0, 0, 0, 0, 1 0 L 1 1" fill={theme.colors.secondary} />
    </Svg>
  );
};

export default TopCurve;
