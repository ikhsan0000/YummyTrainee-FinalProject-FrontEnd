import { View, Text } from "react-native";
import React from "react";
import { Box } from "../../components/Theme";
import ModalButton from "../../components/ModalButton";
import { useNavigation } from "@react-navigation/native";

const ModalButtons = () => {
  const navigation = useNavigation();
  const shopping = "Continue\nShopping";
  return (
    <>
      <Box flexDirection="row">
        <ModalButton
          variant="primary"
          label={shopping}
          onPress={() => navigation.navigate("OutfitIdeas")}
          style={{ flex: 0.45 }}
        />
        <Box paddingHorizontal="m" />
        <ModalButton
          variant="primary"
          label="My Cart"
          onPress={() => navigation.navigate("Cart")}
          style={{ flex: 0.45 }}
        />
      </Box>
    </>
  );
};

export default ModalButtons;
