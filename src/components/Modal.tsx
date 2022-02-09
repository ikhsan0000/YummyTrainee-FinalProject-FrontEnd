import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Text } from "./Theme";
import { Button } from ".";
import Modal from "react-native-modal";
import ModalButton from "./ModalButton";
import { useNavigation } from "@react-navigation/native";

interface ModalBoxProps {
  trigger: boolean;
  label: string;
  closeModal: () => void;
  buttons: any;
}

const ModalBox = ({ label, trigger, closeModal, buttons}: ModalBoxProps) => {

  return (
    <>
      <Modal isVisible={trigger} onBackdropPress={() => closeModal()}>
        <Box
          flex={0.2}
          alignItems="center"
          justifyContent="center"
          backgroundColor="grey"
          borderRadius="l"
        >
          <Box paddingBottom="m">
            <Text variant="title3">{label}</Text>
          </Box>

          {buttons && buttons}

        </Box>
      </Modal>
    </>
  );
};

export default ModalBox;
