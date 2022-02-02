import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React, { ReactNode, useCallback, useContext } from "react";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@shopify/restyle";
import { snapPoint } from "react-native-redash";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Text } from "../../components/Theme";
import RoundedIcon from "../../Authentication/components/RoundedIcon";
import { CartContext } from "../../services/cart/cart.context";

const { width } = Dimensions.get("window");
const finalDest = width;
const aspectRatio = width / 375;
const editWidth = 85 * aspectRatio;
const snapPoints = [-editWidth * aspectRatio, 0, width];

interface SwipeableRowProps {
  children: ReactNode;
  height: number;
  cartItemId: number;
  onSubtractQty: any;
  onAddQty: any;
  onDelete: () => void;
}

const SwipeableRow = ({
  children,
  onDelete,
  height: defaultHeight,
  cartItemId,
  onSubtractQty,
  onAddQty,
}: SwipeableRowProps) => {

  // Cart Context
  const { editQuantity, oneCartDetail, isLoading }: any =
    useContext(CartContext);

  const updateQty = async (type: string) => {
    const currentQty = await oneCartDetail(cartItemId)
      .then((res: any) => {
        return res.data.quantity;
      })
      .catch((err: any) => {
        console.error(err);
      });
    let reqData;
    if (type === "add") {
      reqData = { cartToProductId: cartItemId, quantity: currentQty + 1 };
    } else if (type === "subtract") {
      reqData = { cartToProductId: cartItemId, quantity: currentQty - 1 };
    }

    await editQuantity(reqData);
  };

  const height = useSharedValue(defaultHeight);

  const deleteItem = () => {
    console.log('test')
  }
  const theme = useTheme();
  const translateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.startX + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest, { overshootClamping: true }, () => {
        if (dest === finalDest) {
          height.value = withTiming(0, { duration: 250 }, () => runOnJS(onDelete)());
        }
      });
    },
  });

  const animatedSwipe = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: theme.colors.white,
    transform: [{ translateX: translateX.value }],
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  console.log(deleteItem.toString())
  return (
    <View>
      <Animated.View style={[StyleSheet.absoluteFill, deleteStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.danger, theme.colors.white]}
          start={[0, 0.5]}
          end={[1, 0.5]}
        />
        <Box
          flex={1}
          justifyContent="space-evenly"
          width={editWidth}
          alignItems="center"
        >
          <Text color="white" variant="title3">
            Remove
          </Text>
        </Box>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, editStyle]}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={[theme.colors.grey, theme.colors.white]}
          start={[1, 0.5]}
          end={[0.8, 0.5]}
        />
        <Box
          flex={1}
          justifyContent="space-evenly"
          width={editWidth}
          alignSelf="flex-end"
          alignItems="center"
        >
          <TouchableOpacity
            onPress={() => {
              onAddQty();
              updateQty("add");
            }}
            disabled={isLoading ? true : false}
          >
            <RoundedIcon
              iconRatio={0.5}
              name="plus"
              size={24}
              color="white"
              backgroundColor="primary"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateQty("subtract");
              onSubtractQty();
            }}
            disabled={isLoading ? true : false}
          >
            <RoundedIcon
              iconRatio={0.5}
              name="minus"
              size={24}
              color="white"
              backgroundColor="danger"
            />
          </TouchableOpacity>
        </Box>
      </Animated.View>

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animatedSwipe}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeableRow;
