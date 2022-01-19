import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BorderlessButton,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Text } from "../../components";
import { Box } from "../../components/Theme";

const OUTER_RADIUS = 34;
const INNER_RADIUS = 30;

interface CategoryProps {
  category: {
    color: string;
    title: string;
    id: string;
  };
}

const Category = ({ category: { color, title } }: CategoryProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <BorderlessButton onPress={() => setSelected((prev) => !prev)}>
      <Box margin="m" alignItems="center">
        
        <Box
          width={OUTER_RADIUS * 2}
          height={OUTER_RADIUS * 2}
          justifyContent="center"
          alignItems="center"
        >
          {selected && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: OUTER_RADIUS,
                borderColor: color,
                borderWidth: 2
              }}
            />
          )}
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
