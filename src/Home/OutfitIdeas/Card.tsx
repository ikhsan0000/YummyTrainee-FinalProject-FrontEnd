import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { interpolateColor } from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";
import { Box } from "../../components/Theme";

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.7;
const height = width * (425 / 294);

interface CardProps {
  position: Animated.Adaptable<number>;
}

const Card = ({ position }: CardProps) => {
    const backgroundColor = mixColor(position, "#C9E9E7", "#74BCB8");
  const translateY = mix(position, 0, -50);
  const scale = mix(position, 1, 0.9);
  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center"
    >
      <Animated.View
        style={{
          backgroundColor,
          width,
          height,
          borderRadius: 20,
          transform: [{ translateY }, { scale }],
        }}
      />
    </Box>
  );
};

export default Card;
