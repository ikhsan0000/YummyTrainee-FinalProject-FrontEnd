import { View, StyleSheet, Dimensions } from "react-native";
import React, { FC, ReactNode } from "react";
import { Box, Text } from "../../components/Theme";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { PanGestureHandler } from "react-native-gesture-handler";
import { clamp, snapPoint } from "react-native-redash";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 682 * aspectRatio;
const minHeight = 228 * aspectRatio;
const snapPoints = [-(height - minHeight), 0];

interface CartContainerProps {
  children: ReactNode;
  cartDetail: any
  CheckoutComponent: FC<{minHeight: number}>;
}

const CartContainer = ({ children, CheckoutComponent, cartDetail }: CartContainerProps) => {
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = clamp(
        ctx.startY + translationY,
        snapPoints[0],
        snapPoints[1]
      );
    },
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, snapPoints);
      translateY.value = withSpring(dest, { overshootClamping: true });
    },
  });

  const animatedSlide = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Box flex={1} >
      <CheckoutComponent minHeight={minHeight} cartDetail={cartDetail}/>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              height: height,
              backgroundColor: "white",
              borderBottomLeftRadius: theme.borderRadii.xl,
              borderBottomRightRadius: theme.borderRadii.xl,
              overflow: "hidden",
              paddingBottom: theme.spacing.xl
            },
            animatedSlide,
          ]}
        >
          {children}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: theme.borderRadii.xl,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 5 * aspectRatio,
                backgroundColor: theme.colors.grey,
                width: 60 * aspectRatio,
                marginBottom: theme.spacing.m,
                borderRadius: 2.5,
              }}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>

    </Box>
  );
};

export default CartContainer;
