import React from "react";
import { Box } from "../../components/Theme";
import { Feather as Icon } from "@expo/vector-icons";
import CardLayout from "./CardLayout";

const AddCard = () => {
  return (
    <CardLayout onPress={() => true} backgroundColor="body">
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        borderRadius="m"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      >
        <Icon name="plus" color="white" size={32} />
      </Box>
    </CardLayout>
  );
};

export default AddCard;