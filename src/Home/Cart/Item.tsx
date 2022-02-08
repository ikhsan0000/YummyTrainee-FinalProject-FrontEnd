import { View } from "react-native";
import React, { useContext, useState } from "react";
import { Box, Text } from "../../components/Theme";
import { useTheme } from "@shopify/restyle";
import SwipeableRow from "./SwipeableRow";
import { Image } from 'react-native';
import { CartContext } from "../../services/cart/cart.context";

interface ItemProps {
  onDelete: () => void;
  cartItem: any;
}

const Item = ({ onDelete, cartItem }: ItemProps) => {
  const theme = useTheme();
  const height = 120 + theme.spacing.m * 2;
  const [qty, setQty] = useState(cartItem.quantity);


  const onAddQty = () => {
    setQty(qty + 1);
  };

  const onSubtractQty = () => {
    if(qty === 1){
      return
    }
    setQty(qty - 1);
  };

  return (
    <SwipeableRow onDelete={onDelete} height={height} cartItemId={cartItem.id} onAddQty={onAddQty} onSubtractQty={onSubtractQty}>
      <Box padding="l" flexDirection="row">
        <Box
          width={120}
          height={120}
          backgroundColor="darkGrey"
          borderRadius="m"
          overflow="hidden"

        >
          <Image 
          style={{flex: 1}}
          source={{
            uri:  `http://192.168.0.172:3000/products/images/${cartItem.image}`,
          }}
          />
        </Box>
        <Box padding="m" flex={1} justifyContent="center">
          <Text variant="header">Size {cartItem.size}</Text>
          <Text variant="title3">{cartItem.product.name}</Text>
          <Text variant="title3" color="primary">
            $ {cartItem.product.price}
          </Text>
        </Box>
        <Box justifyContent="center">
          <Box
            backgroundColor="secondary"
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              borderRadius: 12,
            }}
          >
            <Text variant="header" color="white">
              {qty} x
            </Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  );
};

export default Item;
