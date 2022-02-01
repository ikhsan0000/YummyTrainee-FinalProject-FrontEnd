import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native-paper";
import { sub, useDerivedValue } from "react-native-reanimated";
import { useTiming } from "react-native-redash";

import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Text } from "../../components/Theme";
import { AuthContext } from "../../services/authentication/auth.context";
import { ProductsContext } from "../../services/products/products.context";
import Background from "./Background";
import Card from "./Card";
import Categories from "./Categories";
import ProductCard from "./ProductCard";


const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const aIndex = useTiming(currentIndex);

  // Product Context
  const { products, retriveAllProducts, isLoading }: any =
    useContext(ProductsContext);

  useEffect(() => {
    retriveAllProducts();
  }, []);

  const renderItem = ({ item }: any) => (
    <Box flex={1}>
      <TouchableOpacity onPress={() => navigation.navigate("ProductDetail", { product: item })}>
        <ProductCard product={item} />
      </TouchableOpacity>
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="outfit ideas"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-cart",
          onPress: () => navigation.navigate("Cart"),
        }}
      />
      
      <Categories />
        
      {isLoading ? (
        <ActivityIndicator animating={true} color={Colors.black} />
      ) : (

          <FlatList
            data={products}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(products) => products.id.toString()}
          ></FlatList>

      )}
      
    </Box>
  );
};

export default OutfitIdeas;
