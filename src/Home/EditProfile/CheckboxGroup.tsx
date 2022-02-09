import { View } from "react-native";
import React, { useState } from "react";
import { Box, Text } from "../../components/Theme";
import { Button } from "../../components";

interface CheckboxGroupProps {
  options: { value: string; label: string }[];
  radio?: boolean;
  hookFormData?: any
  defaultSelected?: any
  callback?: any
}

const CheckboxGroup = ({ options, radio, hookFormData, defaultSelected, callback }: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([`${defaultSelected}`]);
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {options.map(({ label, value }) => {
        const index = selectedValues.indexOf(value);
        let isSelected = selectedValues.indexOf(value) !== -1;
    
        return (
          <Button
            key={value}
            variant={isSelected ? "primary" : "default"}
            onPress={() => {
              if (radio) {
                {callback && callback(value)}
                setSelectedValues([value]);
                hookFormData && hookFormData(value);
              } else {
                if (isSelected) {
                  selectedValues.splice(index, 1);
                } else {
                  selectedValues.push(value);
                }
                setSelectedValues([...selectedValues]);
              }
            }}
            label={label}
            style={{
              width: "auto",
              height: "auto",
              paddingHorizontal: 15,
              paddingVertical: 8,
              margin: 5,
            }}
          />
        );
      })}
    </Box>
  );
};

export default CheckboxGroup;
