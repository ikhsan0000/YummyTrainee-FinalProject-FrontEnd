import { View } from "react-native";
import React from "react";
import { Box, Text } from "../../components/Theme";
import { useTheme } from "@shopify/restyle";
import SwipeableRow from "./SwipeableRow";

interface ItemProps {
  onDelete: ()=>void;
}


const Item = ({onDelete}: ItemProps) => {
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2
  return (
    <SwipeableRow onDelete={onDelete} height={height}>
      <Box padding="l" flexDirection="row">
        <Box
          width={120}
          height={120}
          backgroundColor="darkGrey"
          borderRadius="m"
          opacity={0.5}
        />
        <Box padding="m" flex={1} justifyContent="center">
          <Text variant="header">Size M, L</Text>
          <Text variant="title3">short asdasdasdasds</Text>
          <Text variant="title3" color="primary">
            $69.42
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text variant="header" color="white">
              2x
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
