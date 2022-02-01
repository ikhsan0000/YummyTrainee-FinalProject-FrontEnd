import React, { useContext, useState } from "react";
import { Box, Text } from "../../components/Theme";
import { Alert, Dimensions, Image } from "react-native";
import { Card } from "react-native-elements";
import { useTheme } from "@shopify/restyle";
import ProductCard from "./ProductCard";
import { Button, Header } from "../../components";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "../../Authentication/components/RoundedIcon";
import { CartContext } from "../../services/cart/cart.context";

const { width } = Dimensions.get("window");

const ProductDetail = ({ navigation, route }: any) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const imgUrl = product.productImage[0].fileName;

  // Cart Context
  const { addToCart, isLoading }: any = useContext(CartContext);

  const subtractQty = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((last) => last - 1);
  };

  const addQty = () => {
    setQuantity((last) => last + 1);
  };

  // SIZE STILL HARDCODED, TO DO: HANDLE SIZES
  let currentProductToCart = {
    productId: product.id,
    quantity: quantity,
    size: "M",
    image: imgUrl,
  };

  const onSubmit = async () => {
    await addToCart(currentProductToCart)
    .then(Alert.alert('added to cart'))
    .catch((err:any) => console.log(err))
  };

  return (
    <Box flex={1} backgroundColor="grey">
      <Box
        zIndex={99}
        position="absolute"
        flexDirection="row"
        justifyContent="space-between"
        marginTop="s"
        alignItems="center"
      >
        <RectButton
          rippleColor="rgba(0,0,0,0)"
          onPress={() => navigation.navigate("OutfitIdeas")}
        >
          <RoundedIcon
            name="arrow-left"
            color="white"
            backgroundColor="transparent"
            size={40}
            iconRatio={0.5}
          ></RoundedIcon>
        </RectButton>
      </Box>

      <Image
        style={{ flex: 0.4 }}
        resizeMode="cover"
        source={{ uri: `http://192.168.0.172:3000/products/images/${imgUrl}` }}
      />
      <Box padding="m" flex={0.4}>
        <Text variant="title2">{product.name}</Text>
        {/* <Box flex={1} width={100} backgroundColor="secondary"/>  */}
        <Text variant="title1">$ {product.price}</Text>
        <Text variant="body" color="darkGrey">
          category : {product.category.name}
        </Text>
        <Box marginTop="m" />
        <Text variant="body">{product.description}</Text>
      </Box>

      <Box
        flex={0.2}
        justifyContent="space-around"
        alignItems="center"
        // backgroundColor="violet"
      >
        <Box
          alignSelf="stretch"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="m"
        >
          <Text variant="body">Quantity: </Text>
          <Box flexDirection="row" alignItems="center">
            <RectButton
              rippleColor="rgba(0,0,0,0)"
              onPress={() => subtractQty()}
            >
              <RoundedIcon
                iconRatio={0.55}
                name="minus"
                size={27}
                color="white"
                backgroundColor="primary"
              />
            </RectButton>

            <Box paddingHorizontal="s">
              <Text variant="body">{quantity}</Text>
            </Box>

            <RectButton rippleColor="rgba(0,0,0,0)" onPress={() => addQty()}>
              <RoundedIcon
                iconRatio={0.55}
                name="plus"
                size={27}
                color="white"
                backgroundColor="primary"
              />
            </RectButton>
          </Box>
        </Box>

        <Button
          icon="shopping-cart"
          variant="primary"
          label="Add to Cart"
          style={{ width: width / 1.5 }}
          isLoading={isLoading}
          onPress={() => onSubmit()}
        />
      </Box>
    </Box>
  );
};

export default ProductDetail;
