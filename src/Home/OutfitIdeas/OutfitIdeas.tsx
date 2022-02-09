import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native-paper";
import { sub, useDerivedValue } from "react-native-reanimated";
import { useTiming } from "react-native-redash";
import TextInput from "../../Authentication/components/form/TextInput";

import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Text } from "../../components/Theme";
import { AuthContext } from "../../services/authentication/auth.context";
import { ProductsContext } from "../../services/products/products.context";
import Background from "./Background";
import Card from "./Card";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import { Feather as Icon } from "@expo/vector-icons";


const OutfitIdeas = ({ navigation }: HomeNavigationProps<"OutfitIdeas">) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const aIndex = useTiming(currentIndex);

  // Product Context
  const { products, retriveAllProducts, searchProducts, filterByCategory, isLoading }: any =
    useContext(ProductsContext);
    const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if(categoryFilter == 'all'){
      retriveAllProducts();
    }
    else{
      filterByCategory(categoryFilter)
    }
  }, [categoryFilter]);

  const onSearch = (passedKeyword:string) => {
    searchProducts(passedKeyword)
  }

  const onCategoryChange = (category: string) => {
      setCategoryFilter(category)
  }

  const renderItem = ({ item }: any) => (
    <Box flex={1}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
      >
        <ProductCard product={item} />
      </TouchableOpacity>
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="product list"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-cart",
          onPress: () => navigation.navigate("Cart"),
        }}
      />

      <Box paddingHorizontal="m" paddingTop="m">
        <TextInput
          icon="search"
          placeholder="Search (brand, type, category, etc...)"
          autoCapitalize="none"
          value={searchKeyword}
          noIcon={true}
          onBlur={() => {
            onSearch(searchKeyword);
          }}
          onSubmitEditing={() => {
            onSearch(searchKeyword);
          }}
           onChangeText={(text) => {
          setSearchKeyword(text);
        }}
        ></TextInput>
      </Box>

      <Categories onCategoryChange={onCategoryChange}/>

      {isLoading ? (
        <ActivityIndicator animating={true} color={Colors.black} />
      ) :
      //  products.length === 0 ? 
      // <Box flex={1} alignItems="center" justifyContent="center" flexDirection="row">
      //   <Text variant="body" color="darkGrey">No Products Found</Text> 
      // </Box>:  
      (
        <FlatList
          data={products}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(products) => products.id.toString()}
        ></FlatList>
      )
      }
    </Box>
  );
};

export default OutfitIdeas;
