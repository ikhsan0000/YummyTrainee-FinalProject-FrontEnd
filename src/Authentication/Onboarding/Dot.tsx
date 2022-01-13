import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, lenght } = Dimensions.get("window");

interface DotProps {
  index: number;
  sharedValue: any;
}

const Dot = ({ index, sharedValue }: DotProps) => {
  const dotBackgroundColor = useAnimatedStyle(() => {
    const colorInterpolated = interpolateColor(
      sharedValue.value / width,
      [index - 1, index, index + 1],
      [
        "rgba(44, 185, 176, 0.5)",
        "rgba(44, 185, 176, 1)",
        "rgba(44, 185, 176, 0.5)",
      ]
    );
    return { backgroundColor: colorInterpolated };
  });

  const animatedDot = useAnimatedStyle(() => {
    const scale = interpolate(
      sharedValue.value / width,
      [index - 1, index, index + 1],
      [1, 1.25, 1],
      "clamp"
    );
    return {
      transform: [{ scale: scale }],
    };
  });

  return (
    <Animated.View
      style={[styles.dots, animatedDot, dotBackgroundColor]}
    ></Animated.View>
  );
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    backgroundColor: "#2CB9B0",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
});
