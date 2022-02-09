import { View, Text } from "react-native";
import React from "react";
import { Box } from "../../components/Theme";
import ModalButton from "../../components/ModalButton";
import { useNavigation } from "@react-navigation/native";

const ModalButtons = ({closeModal}: any) => {
  const label = "Ok";
  return (
    <>
      <Box flexDirection="row">
        <ModalButton
          variant="primary"
          label={label}
          onPress={() => closeModal()}
          style={{ flex: 0.45 }}
        />
      </Box>
    </>
  );
};

export default ModalButtons;
