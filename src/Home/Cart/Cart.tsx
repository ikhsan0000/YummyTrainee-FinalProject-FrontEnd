import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import CartContainer from "./CartContainer";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Item from "./Item";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@shopify/restyle";
import Checkout from "./Checkout";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 376 100 V 0 Z";

const defaultItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const theme = useTheme();
  const [items, setItems] = useState(defaultItems);

  return (
    <CartContainer CheckoutComponent={Checkout}>
      <Box backgroundColor="primary">
        <Header
          title="shopping cart"
          left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
          transparent
        />
      </Box>
      <Box flex={1}>
        <ScrollView
          style={{
            borderBottomLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          }}
          contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
          showsVerticalScrollIndicator={false}
        >

          {items.map((item, i) => (
            <Item
              key={item.id}
              //onDelete need fix, passed as function then becomes undefined
              onDelete={() => {
                items.splice(i, 1);
                setItems(items.concat());
              }}
            />
          ))}
          
        </ScrollView>
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
          }}
        >
          <Svg style={StyleSheet.absoluteFill} viewBox="0 0 374 100">
            <Path d={d} fill={theme.colors.primary} />
          </Svg>
          <Text variant="title2" color="white" textAlign="center">
            3 Items Added
          </Text>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;
