import { Dimensions, View } from "react-native";
import React from "react";
import { useTheme } from "@shopify/restyle";
import { Box, Theme } from "../../../components/Theme";
import Underlay, {MARGIN} from "./Underlay";
import {lerp} from "./Scale"
const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;



export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme["colors"];
}

interface GraphProps {
  data: DataPoint[];
}


const Graph = ({ data }: GraphProps) => {
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHight = canvasWidth * aspectRatio;
  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHight - theme.spacing[MARGIN];

  const values = data.map((p) => p.value);
  const dates = data.map((p) => p.date);
  const step = width / data.length;

  const minX = Math.min(...dates);
  const maxX = Math.max(...dates);

  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box paddingBottom={MARGIN} paddingLeft={MARGIN} marginTop="xl">
        <Underlay dates={dates} minY={minY} maxY={maxY} step={step} />
      <Box width={width} height={height}>
        {data.map((point, i) => {
          if (point.value === 0) {
            return null;
          }
          return (
            <Box
              key={point.date}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={lerp(0, height, point.value / maxY)}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: theme.spacing.m,
                  right: theme.spacing.m,
                  backgroundColor: theme.colors.primaryLight,
                  borderTopLeftRadius: theme.borderRadii.m,
                  borderRadius: theme.borderRadii.m,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  height: 32,
                  left: theme.spacing.m,
                  right: theme.spacing.m,
                  backgroundColor: "violet",
                  borderTopLeftRadius: theme.borderRadii.m,
                  borderRadius: theme.borderRadii.m,
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
