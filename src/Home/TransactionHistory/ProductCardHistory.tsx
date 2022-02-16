import React from "react";
import {Image} from 'react-native';
import { Box, Text } from "../../components/Theme";
import { Avatar, Button, Card, Title, Paragraph, Colors } from "react-native-paper";
import { useTheme } from "@shopify/restyle";

const ProductCardHistory = ({ product }: any) => {
  const theme = useTheme();

  return (
    // <Box flex={1} style={{padding: 4}} >
    //   <Card style={{backgroundColor: theme.colors.grey, borderRadius: 5}}>
    //     <Card.Cover
    //       style={{borderRadius: 5}}
    //       source={{
    //         uri: `http://192.168.0.172:3000/products/images/${product.image}`,
    //       }}
    //     />
    //     <Box marginLeft="s" paddingVertical="s">
    //       <Text variant="title3">{product.name} - (Size {product.size})</Text>
    //       <Text variant="body">$ { product.price } x { product.quantity }</Text>

    //     </Box>
    //   </Card>
    // </Box>




    <Box padding="s" flexDirection="row">
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
        uri:  `http://192.168.0.172:3000/products/images/${product.image}`,
      }}
      />
    </Box>
    <Box padding="m" flex={1} justifyContent="center">
      <Text variant="header">Size {product.size}</Text>
      <Text variant="title3">{product.name}</Text>
      <Text variant="title3" color="primary">
        $ {product.price}
      </Text>
      <Text variant="title3" color="primary" fontSize={14}>
        subtotal: $ {product.price * product.quantity}
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
          {product.quantity} x
        </Text>
      </Box>
    </Box>
  </Box>
  );
};

export default ProductCardHistory;
