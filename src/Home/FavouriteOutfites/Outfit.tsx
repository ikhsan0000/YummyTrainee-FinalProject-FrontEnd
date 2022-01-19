import React, { useState } from "react";
import { View, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import RoundedIcon from "../../Authentication/components/RoundedIcon";
import { Box } from "../../components/Theme";

interface OutfitProps {
  outfit: { color: string; aspectRatio: number; id: number; selected: boolean };
  width: number;
}

const Outfit = ({ outfit, width }: OutfitProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <BorderlessButton
      onPress={() => {
        setSelected((prev) => !prev);
        outfit.selected = !outfit.selected;
      }}
    >
      <Box
        borderRadius="m"
        marginBottom="m"
        alignItems="flex-end"
        paddingTop="m"
        style={{
          backgroundColor: outfit.color,
          width,
          height: width * outfit.aspectRatio,
        }}
      >
        {selected && (
          <RoundedIcon
            name="check"
            backgroundColor="primary"
            color="white"
            size={24}
            iconRatio={0.7}
          />
        )}
      </Box>
    </BorderlessButton>
  );
};

export default Outfit;
