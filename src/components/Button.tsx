import { useTheme } from "@shopify/restyle";
import React from "react";
import { StyleSheet} from "react-native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import { Text } from ".";

interface ButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
}

const Button = ({ variant, label, onPress, style }: ButtonProps) => {
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
