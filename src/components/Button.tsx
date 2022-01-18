import { useTheme } from "@shopify/restyle";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text } from ".";

interface ButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
}

const Button = ({ variant, label, onPress }: ButtonProps) => {
  const theme = useTheme();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.grey;
  const color = variant === "primary" ? theme.colors.white : theme.colors.title;
  return (
    <RectButton
      style={[styles.container, { backgroundColor }]}
      {...{ onPress }}
    >
      <Text variant="button" style={{ color }}>
        {label}
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
