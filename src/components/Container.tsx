import React, { ReactNode } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from ".";
import { Box } from "./Theme";

export const assets = [
  require("./assets/patterns/1.png"),
  require("./assets/patterns/2.png"),
  require("./assets/patterns/3.png"),
] as const;

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
  pattern: 0 | 1 | 2;
}

const aspectRatio = 750 / 1125;
const { width, height: wHeight } = Dimensions.get("window");
const height = width * aspectRatio;

const Container = ({ children, footer, pattern}: ContainerProps) => {
  const asset = assets[pattern]
  return (
    <KeyboardAwareScrollView scrollEnabled={false}>
      <Box height={wHeight} backgroundColor="secondary">
        <StatusBar barStyle="light-content" />
        <Box backgroundColor="white">
          <Box borderBottomLeftRadius="xl">
            <Image
              source={asset}
              style={{
                width,
                height: height * 0.41,
                borderBottomLeftRadius: theme.borderRadii.xl,
                overflow: "hidden",
              }}
            />
          </Box>
        </Box>

        <Box flex={1}>
          <Image
            source={asset}
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
    </KeyboardAwareScrollView>
  );
};

export default Container;

const styles = StyleSheet.create({
  patternImage: {},
});
