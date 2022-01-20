import { ScrollView, View } from "react-native";
import React from "react";
import { Box, Text } from "../../components/Theme";
import CheckboxGroup from "./CheckboxGroup";
import RoundedCheckboxGroup from "./RoundedCheckboxGroup";

const outfitTypes = [
  {
    value: "men",
    label: "For Men",
  },
  {
    value: "woman",
    label: "For Woman",
  },
  {
    value: "both",
    label: "For Both",
  },
];

const sizes = ["s", "m", "l", "xl", "xxl"];
const colors = ["#0C0D34", "#FF0058", "#50B9DE", "#00D99A", "#FE5E33"];

const brandTypes = [
  { value: "adidas", label: "Adidas" },
  { value: "nike", label: "Nike" },
  { value: "converse", label: "Converse" },
  { value: "tommy-hilfiger", label: "Tommy Hilfiger" },
  { value: "billionaire-boys-club", label: "Billionaire Boys Club" },
  { value: "jordan", label: "Jordan" },
  { value: "le-coq-sportif", label: "Le Coq Sportif" },
];

interface ConfigurationProps {}

const Configuration = () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={{marginBottom: 50, marginRight: 30}}>
        <Box padding="m">
          <Text variant="body" color="darkGrey">
            What type of outfits you usually search for?
          </Text>
        </Box>
        <CheckboxGroup options={outfitTypes} radio />

        <Box padding="m">
          <Text variant="body" color="darkGrey">
            What is your clothing size?
          </Text>
        </Box>
        <RoundedCheckboxGroup options={sizes} />

        <Box padding="m">
          <Text variant="body" color="darkGrey">
            My preferred clothing colors
          </Text>
        </Box>
        <RoundedCheckboxGroup options={colors} valueIsColor />

        <Box padding="m">
          <Text variant="body" color="darkGrey">
            My Preferred Brands
          </Text>
        </Box>
        <CheckboxGroup options={brandTypes} />
        <Box paddingBottom="l" />
    </ScrollView>
  );
};

export default Configuration;
