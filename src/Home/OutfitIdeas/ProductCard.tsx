import React from "react";
import { Box, Text } from "../../components/Theme";
import { Avatar, Button, Card, Title, Paragraph, Colors } from "react-native-paper";
import { useTheme } from "@shopify/restyle";

const ProductCard = ({ product }: any) => {
  const { fileName: imgUrl } = product.productImage[0];
  const theme = useTheme();

  return (
    <Box flex={1} style={{padding: 4}} >
      <Card style={{backgroundColor: theme.colors.grey, borderRadius: 5}}>
        <Card.Cover
          style={{borderRadius: 5}}
          source={{
            uri: `http://192.168.0.172:3000/products/images/${imgUrl}`,
          }}
        />
        <Box marginLeft="s" paddingVertical="s">
          <Text variant="title3">{product.name}</Text>
          <Text variant="body">$ { product.price }</Text>

        </Box>
      </Card>
    </Box>
  );
};

export default ProductCard;
