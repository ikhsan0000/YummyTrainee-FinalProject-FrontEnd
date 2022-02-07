import { useTheme } from "@shopify/restyle";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native-paper";
import {
  Transition,
  TransitioningView,
} from "react-native-reanimated";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { Box, Text} from "../../components/Theme";
import { ProfileContext } from "../../services/profile/profile.context";
import ProductCard from "../OutfitIdeas/ProductCard";
import Footer from "./Footer";
import TopCurve from "./TopCurve";



const FavouriteOutfits = ({
  navigation,
}: HomeNavigationProps<"FavouriteOutfits">) => {

  const [footerHeight, setFooterHeight] = useState(0);

  // profile context
  const { currentUserProfile, profile, isLoading }: any = useContext(ProfileContext);
  useEffect(async () => {
    await currentUserProfile();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
    <Box flex={1} marginTop="l">
      <TouchableOpacity
        onPress={() => navigation.navigate("ProductDetail", { product: item, favorite: true})}
      >
        <ProductCard product={item} />
      </TouchableOpacity>
    </Box>
  )};

  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="wishlist"
        left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
        right={{
          icon: "shopping-cart",
          onPress: () => navigation.navigate("Cart"),
        }}
      />

      <Box flex={1}>

          {isLoading ? (
            <ActivityIndicator animating={true} color={Colors.black} />
          ) : (
            //  products.length === 0 ?
            // <Box flex={1} alignItems="center" justifyContent="center" flexDirection="row">
            //   <Text variant="body" color="darkGrey">No Products Found</Text>
            // </Box>:
 
            <FlatList
              data={profile && profile.userFavorites.product}
              renderItem={renderItem}
              numColumns={2}
              keyExtractor={(products) => products.id.toString()}
            ></FlatList>
          )}


        <TopCurve footerHeight={footerHeight} />
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => setFooterHeight(height)}
        >
          <Footer
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FavouriteOutfits;
