import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Item from "./Item";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@shopify/restyle";
import Checkout from "./Checkout";
import { CartContext } from "../../services/cart/cart.context";
import { ActivityIndicator, Colors } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 100 * aspectRatio;
const d = "M 0 0 A 50 50 0 0 0 50 50 H 325 A 50 50 0 0 1 376 100 V 0 Z";

const Cart = ({ navigation }: HomeNavigationProps<"Cart">) => {
  const theme = useTheme();
  const [cartItems, setCartItems] = useState([])

  // Cart Context
  const { cartDetail, deleteItem } : any = useContext(CartContext)

  useEffect( async () => {
    try{
      const retrivedCart = await cartDetail()
      setCartItems(retrivedCart.data)
    } catch(err) {
      console.log(err)
      // navigation.navigate('Authentication', { screen: 'Login' });
      navigation.dispatch(
        StackActions.replace('Authentication', { screen: 'Login' })
      );
    }
  },[])

  return (
    <CartContainer CheckoutComponent={Checkout} cartDetail={cartItems}>
      <Box backgroundColor="primary">
        <Header
          title="shopping cart"
          left={{ icon: "arrow-left", onPress: () => navigation.goBack() }}
          transparent
        />
      </Box>
      <Box flex={1} backgroundColor="violet">
        <ScrollView
          style={{
            borderBottomLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
            backgroundColor: theme.colors.yellow
          }}
          contentContainerStyle={{ paddingVertical: 50 * aspectRatio }}
          showsVerticalScrollIndicator={false}
        >

          {/* {isLoading && ( <ActivityIndicator style={{paddingTop: 200}} animating={true} color={Colors.blue400} size="large" />)} */}
          {cartItems && cartItems.map((item:any, i) => {
            return (
            <Item
              key={i}
              cartItem={item}
              onDelete={() => {
                const updatedItems = cartItems.filter(currentItem => {
                    return currentItem.id !== item.id
                })
                console.log(updatedItems)
                setCartItems(updatedItems);
                deleteItem(item.id)
              }}
            />
          )}
          )}
          
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
            {cartItems.length} Items Added
          </Text>
        </Box>
      </Box>
    </CartContainer>
  );
};

export default Cart;
