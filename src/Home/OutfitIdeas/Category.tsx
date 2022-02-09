import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BorderlessButton,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Text } from "../../components";
import { Box } from "../../components/Theme";

const OUTER_RADIUS = 25;
const INNER_RADIUS = 21;

interface CategoryProps {
  category: {
    color: string;
    title: string;
    id: string;
  };
  onCategoryChange: (title:string) => void;
}

const Category = ({ category: { id, color, title }, onCategoryChange }: CategoryProps) => {

  return (
    <BorderlessButton
      rippleColor="rgba(0,0,128,0.05)"
      onPress={() => {
        onCategoryChange(id)
      }}
    >
      <Box marginVertical="s" marginHorizontal="m" alignItems="center">
        <Box
          width={OUTER_RADIUS * 2}
          height={OUTER_RADIUS * 2}
          justifyContent="center"
          alignItems="center"
        >
         
          <View
            style={{
              width: INNER_RADIUS * 2,
              height: INNER_RADIUS * 2,
              borderRadius: INNER_RADIUS,
              backgroundColor: color,
            }}
          />
        </Box>

        <Text textAlign="center" variant="header">
          {title}
        </Text>
      </Box>
    </BorderlessButton>
  );
};

export default Category;
