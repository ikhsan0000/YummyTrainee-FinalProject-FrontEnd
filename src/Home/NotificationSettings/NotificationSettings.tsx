import { View, Text } from "react-native";
import React from "react";
import { Box } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import Notification from "./Notification";

const NotificationSettings = ({
  navigation,
}: HomeNavigationProps<"NotificationSettings">) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="notifications"
        left={{
          icon: "menu",
          onPress: () => navigation.openDrawer(),
        }}
        
      />
      <Box padding="m">
        <Notification
          title="Outfit Ideas"
          description="Receive daily notifications"
        />
        <Notification
          title="Discounts & Sales"
          description="Buy the stuff you love for less"
        />
        <Notification
          title="Stock Notification"
          description="If the product you love comes back in stock"
        />
        <Notification
          title="New Stuff"
          description="Hear it first, wear it first"
        />
      </Box>
    </Box>
  );
};

export default NotificationSettings;
