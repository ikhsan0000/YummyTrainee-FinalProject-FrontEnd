import { useTheme } from "@shopify/restyle";
import React from "react";
import { StyleSheet } from "react-native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import { Text } from "./Theme";
import { ActivityIndicator, Colors } from "react-native-paper";

interface ButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
  isLoading?: boolean;
}

const Button = ({ variant, label, onPress, style, isLoading }: ButtonProps) => {
  const theme = useTheme();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.grey;
  const color =
    variant === "primary" ? theme.colors.white : theme.colors.secondary;
  return (
    <RectButton
      style={[styles.container, style, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text variant="button" style={{ color }}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={Colors.white} />
        ) : (
          label
        )}
      </Text>
    </RectButton>
  );
};

Button.defaultProps = { vairant: "default" };

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 35,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "SFProText-Regular",
    fontSize: 15,
  },
});
