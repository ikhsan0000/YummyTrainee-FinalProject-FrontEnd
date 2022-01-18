import { DrawerContentComponentProps } from "@react-navigation/drawer";
import React from "react";
import { Image, Dimensions, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "../../../Authentication/components/RoundedIcon";
import theme, { Box, Text } from "../../../components/Theme";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";

const aspectRatio = 750 / 1125;
const { width } = Dimensions.get("window");
export const DRAWER_WIDTH = width * 0.85;
const height = DRAWER_WIDTH * aspectRatio;

const items: DrawerItemProps[] = [
  {
    icon: "zap",
    label: "Outfit Ideas",
    screen: "OutfitIdeas",
    color: "primary",
  },
  {
    icon: "heart",
    label: "Favourite Outfits",
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
    screen: "LogOut",
    color: "secondary",
  },
];

interface DrawerProps {}

const Drawer = (props: DrawerContentComponentProps) => {
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
          flexDirection="row"
          justifyContent="space-between"
          paddingTop="m"
        >
         
          <RectButton rippleColor="rgba(0,0,0,0)">
            <RoundedIcon
              name="x"
              color="white"
              backgroundColor="secondary"
              size={30}
              iconRatio={0.7}
            ></RoundedIcon>
          </RectButton>

          <Text color="white" >MY PROFILE</Text>

          <RectButton rippleColor="rgba(0,0,0,0)">
            <RoundedIcon
              name="shopping-bag"
              color="white"
              backgroundColor="secondary"
              size={30}
              iconRatio={0.7}
            ></RoundedIcon>
          </RectButton>
        </Box>

      </Box>

      <Box flex={0.85}>
        <Box flex={1} backgroundColor="secondary" />

        <Box flex={1} backgroundColor="primary">
          <Image
            source={require("../../../components/assets/patterns/1.png")}
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
              Ikhsan Firdauz
            </Text>

            <Text variant="body" textAlign="center" fontSize={14}>
              ikhsanfirdauz000@gmail.com
            </Text>

            {items.map((item) => (
              <DrawerItem key={item.screen} {...item} />
            ))}
          </Box>
        </Box>
      </Box>

      <Box backgroundColor="white" width={DRAWER_WIDTH} height={height * 0.41}>
        <Image
          source={require("../../../components/assets/patterns/1.png")}
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
