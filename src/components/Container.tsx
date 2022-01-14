import React, { ReactNode } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
} from "react-native";
import { theme } from ".";
import { Box } from "./Theme";

export const assets = [require("./assets/patterns/1.png")];

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const aspectRatio = 750 / 1125;
const { width } = Dimensions.get("window");
const height = width * aspectRatio;

const Container = ({ children, footer }: ContainerProps) => {
  return (
    <Box flex={1} backgroundColor="secondary">
      <StatusBar barStyle="light-content" />
      <Box backgroundColor="white">
        <Box borderBottomLeftRadius="xl">
          <Image
            source={assets[0]}
            style={{
              width,
              height: height * 0.61,
              borderBottomLeftRadius: theme.borderRadii.xl,
              overflow: "hidden",
            }}
          />
        </Box>
      </Box>

      <Box flex={1}>
        <Image
          source={assets[0]}
          style={{
            ...StyleSheet.absoluteFillObject,
            width,
            height,
          }}
        />

        <Box
          flex={1}
          borderRadius="xl"
          borderTopLeftRadius={0}
          backgroundColor="white"
        >
          {children}
        </Box>
      </Box>
      <Box backgroundColor="secondary" padding="l">
          {footer}
      </Box>
    </Box>
  );
};

export default Container;

const styles = StyleSheet.create({
  patternImage: {},
});
