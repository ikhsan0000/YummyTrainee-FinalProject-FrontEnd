import { Dimensions, View } from "react-native";
import React, { useLayoutEffect, useRef } from "react";
import { useTheme } from "@shopify/restyle";
import { Box, Theme } from "../../../components/Theme";
import Underlay, { MARGIN } from "./Underlay";
import { lerp } from "./Scale";
import moment from "moment";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const { width: wWidth } = Dimensions.get("window");
const aspectRatio = 195 / 305;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme["colors"];
  id: number;
}

interface GraphProps {
  data: DataPoint[];
  startDate: number;
  numberOfMonths: number;
}

const Graph = ({ data, startDate, numberOfMonths }: GraphProps) => {
  const theme = useTheme();

  //transition
  const transition = useSharedValue(0);
  useFocusEffect(() => {
    transition.value = withTiming(1, { duration: 700 });
    return () => (transition.value = 0);
  });

  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHight = canvasWidth * aspectRatio;
  const width = canvasWidth - theme.spacing[MARGIN];
  const height = canvasHight - theme.spacing[MARGIN];

  const values = data.map((p) => p.value);
  const dates = data.map((p) => p.date);
  const step = width / numberOfMonths;

  const minY = Math.min(...values);
  const maxY = Math.max(...values);


  return (
    <Box paddingBottom={MARGIN} paddingLeft={MARGIN} marginTop="xl">
      <Underlay
        dates={dates}
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <View
        style={{ width, height, overflow: 'hidden'}}
      >
        {data.map((point) => {
          const i = Math.round(
            moment.duration(moment(point.date).diff(startDate)).asMonths()
          );
          
          const totalHeight = lerp(0, height, point.value / maxY)
          
          const animatedGraph = useAnimatedStyle(() => {
            const currentHeight = totalHeight * transition.value
            const translateY = (totalHeight - currentHeight) / 2

            return { 
              transform : [{translateY}, {scaleY: transition.value}],
              opacity : transition.value
            }
            
            })

          return (
            <AnimatedBox
              key={point.date}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={totalHeight}
              style={animatedGraph}
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
            </AnimatedBox>
          );
        })}
      </View>
    </Box>
  );
};

export default Graph;
