import React from "react";
import { Box, Text } from "../../components/Theme";
import { Avatar, Button, Card, Title, Paragraph, Colors } from "react-native-paper";
import { useTheme } from "@shopify/restyle";

const ProductCardHistory = ({ product }: any) => {
  const theme = useTheme();

  return (
    <Box flex={1} style={{padding: 4}} >
      <Card style={{backgroundColor: theme.colors.grey, borderRadius: 5}}>
        <Card.Cover
          style={{borderRadius: 5}}
          source={{
            uri: `http://192.168.0.172:3000/products/images/${product.image}`,
          }}
        />
        <Box marginLeft="s" paddingVertical="s">
          <Text variant="title3">{product.name} - (Size {product.size})</Text>
          <Text variant="body">$ { product.price } x { product.quantity }</Text>

        </Box>
      </Card>
    </Box>
  );
};

export default ProductCardHistory;
