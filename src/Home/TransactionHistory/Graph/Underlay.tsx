import { View, StyleSheet } from "react-native";
import React from "react";
import moment from "moment";
import { Box, Text } from "../../../components/Theme";
import "intl";
import "intl/locale-data/jsonp/en";
import { useTheme } from "@shopify/restyle";
import { lerp } from "./Scale";

const formatter = Intl.DateTimeFormat("en", { month: "short" });

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
  startDate: number;
  numberOfMonths: number;
  step: number;
}

export const MARGIN = "xl";
const ROW_HEIGHT = 16;

const Underlay = ({ minY, maxY, step, minX, numberOfMonths }: UnderlayProps) => {
  const theme = useTheme();
    const minDate = moment(minX);
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map((t) => {
          return (
            <Box
              key={t}
              flexDirection="row"
              alignItems="center"
              height={ROW_HEIGHT}
              style={{
                top: t === 0 ? ROW_HEIGHT / 2 : t === 1 ? -ROW_HEIGHT / 2 : 0,
              }}
            >
              <Box width={theme.spacing[MARGIN]} paddingRight="s">
                <Text color="darkGrey" textAlign="right">
                  {Math.round(lerp(minY, maxY, t))}
                </Text>
              </Box>
              <Box flex={1} height={1} backgroundColor="grey" />
            </Box>
          );
        })}
      </Box>
      <Box
        marginLeft={MARGIN}
        height={theme.spacing[MARGIN]}
        flexDirection="row"
        alignItems="center"
      >
        {new Array(numberOfMonths)
          .fill(0)
          .map((_, i) => moment(minDate.clone().add(i, "month")))
          .map((date, index) => (
            <Box width={step} key={index}>
              <Text key={index} color="primary" textAlign="center">
                {date.format("MMM")}
              </Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Underlay;
