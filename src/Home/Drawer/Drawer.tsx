import {
  CommonActions,
  DrawerActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Image, Dimensions, StyleSheet } from "react-native";
import { Header } from "../../components";
import theme, { Box, Text } from "../../components/Theme";
import { AuthContext } from "../../services/authentication/auth.context";
import { ProfileContext } from "../../services/profile/profile.context";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";

const aspectRatio = 750 / 1125;
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.85;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: "zap",
    label: "Product List",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "heart",
    label: "Wishlist",
    screen: "FavouriteOutfits",
    color: "orange",
  },
  {
    icon: "user",
    label: "Edit Profile",
    screen: "EditProfile",
    color: "yellow",
  },
  {
    icon: "clock",
    label: "Transaction History",
    screen: "TransactionHistory",
    color: "pink",
  },
  {
    icon: "settings",
    label: "Notification Settings",
    screen: "NotificationSettings",
    color: "violet",
  },
  {
    icon: "log-out",
    label: "Logout",
    onPress: (navigation: any, onLogout: any) => {
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: "Authentication" }],
      //   })
      // );

      onLogout()
        .then((data: any) => {
          navigation.dispatch(
            StackActions.replace("Authentication", { screen: "Login" })
          );
        })
        .catch((err: any) => {
          navigation.dispatch(
            StackActions.replace("Authentication", { screen: "Login" })
          );
          console.log(err);
        });
    },
    color: "secondary",
  },
];

const Drawer = () => {
  const navigation = useNavigation();

  // const [profile, setProfile] = useState({})
  
  // Profile Context
  const { profile, currentUserProfile }:any = useContext(ProfileContext)
  useEffect(async () => {
    try{
      await currentUserProfile()
    } catch(err) {
      console.log(err)
    }
  }, [])

  return (
    <Box flex={1}>
      <Box flex={0.15} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary"
        >
          <Header
            title="my profile"
            left={{
              icon: "x",
              onPress: () => navigation.dispatch(DrawerActions.closeDrawer()),
            }}
            right={{
              icon: "shopping-cart",
              onPress: () => navigation.navigate("Cart"),
            }}
            dark
          />
        </Box>
      </Box>

      <Box flex={0.85}>
        <Box flex={1} backgroundColor="secondary" />

        <Box flex={1} backgroundColor="primary">
          <Image
            source={require("../../components/assets/patterns/1.png")}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
              borderTopLeftRadius: 80,
            }}
          />
        </Box>

        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor="white"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="m"
        >
          <Box
            backgroundColor="primary"
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
            alignSelf="center"
            top={-theme.spacing.xl}
          />

          <Box marginBottom="s" top={-20}>
            <Text variant="title1" fontSize={24} textAlign="center">
              {profile && profile.fullName}
            </Text>
            <Text variant="body" textAlign="center" fontSize={14}>
              {profile && profile.user.email}
            </Text>

            {items.map((item, index) => (
              <DrawerItem key={index} {...item} />
            ))}
          </Box>
        </Box>
      </Box>

      <Box backgroundColor="white" width={DRAWER_WIDTH} height={height * 0.41}>
        <Image
          source={require("../../components/assets/patterns/1.png")}
          style={{
            width: DRAWER_WIDTH,
            height,
            borderTopLeftRadius: theme.borderRadii.xl,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
