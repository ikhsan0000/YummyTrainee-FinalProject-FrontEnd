import { View } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "../../components/Theme";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";

interface RoundedCheckboxGroupProps {
  options: string[];
  valueIsColor?: boolean;
}

const RoundedCheckboxGroup = ({
  options,
  valueIsColor,
}: RoundedCheckboxGroupProps) => {
  const { colors, spacing } = useTheme();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="s">
      {options.map((option) => {
        const index = selectedValues.indexOf(option);
        const isSelected = index !== -1;
        const backgroundColor = isSelected ? colors.primary : colors.grey;
        const fontColor = isSelected ? colors.white : colors.secondary;

        return (
          <BorderlessButton
            key={option}
            rippleColor="rgba(0,0,0,0)"
            onPress={() => {
              if (isSelected) {
                selectedValues.splice(index, 1);
              } else {
                selectedValues.push(option);
              }
              setSelectedValues([...selectedValues]);
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: spacing.m,
                marginRight: spacing.s,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 80,
                  backgroundColor: valueIsColor ? option : backgroundColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!valueIsColor && (
                  <Text
                    variant="header"
                    textAlign="center"
                    style={{ color: fontColor }}
                  >
                    {option.toUpperCase()}
                  </Text>
                )}
                {valueIsColor && isSelected && (
                  <Icon color="white" name="check" size={16} />
                )}
              </View>
            </View>
          </BorderlessButton>
        );
      })}
    </Box>
  );
};

export default RoundedCheckboxGroup;
