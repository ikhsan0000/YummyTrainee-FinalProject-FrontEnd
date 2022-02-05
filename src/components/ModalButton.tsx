import { useTheme } from "@shopify/restyle";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RectButton, RectButtonProperties } from "react-native-gesture-handler";
import { Text } from "./Theme";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Feather as Icon } from "@expo/vector-icons";


interface ButtonProps {
  variant: "default" | "primary";
  label?: string;
  onPress: () => void;
  style?: RectButtonProperties["style"];
  isLoading?: boolean;
  icon?: string
}

const ModalButton = ({ variant, label, onPress, style, isLoading, icon }: ButtonProps) => {
  const theme = useTheme();
  const backgroundColor =
    variant === "primary" ? theme.colors.primary : theme.colors.grey;
  const color =
    variant === "primary" ? theme.colors.white : theme.colors.secondary;
  return (
    <TouchableOpacity
      style={[styles.container, style, { backgroundColor }]}
      onPress={onPress}
    >
      <Text variant="button" style={{ color }}>
        {isLoading ? (
          <ActivityIndicator animating={true} color={Colors.white} />
        ) : (
          label
        )}
        {(icon && isLoading==false) && (<>&nbsp;<Icon name={icon} /></>)}
      </Text>
    </TouchableOpacity>
  );
};

ModalButton.defaultProps = { vairant: "default" };

export default ModalButton;

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
