import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";
import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer/Drawer";
import FavouriteOutfits from "./FavouriteOutfites";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";
import NotificationSettings from "./NotificationSettings";
import Cart from "./Cart";
import ProductDetail from "./OutfitIdeas/ProductDetail";
import { useContext, useEffect } from "react";
import { ProfileContext } from "../services/profile/profile.context";
import { StackActions } from "@react-navigation/native";
import TransactionHistoryDetail from "./TransactionHistory/TransactionHistoryDetail";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = ({navigator}: any) => {

  return (
    <Drawer.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{ drawerStyle: { width: DRAWER_WIDTH } }}
    >
      <Drawer.Screen
        name="OutfitIdeas"
        component={OutfitIdeas}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />

      <Drawer.Screen
        name="FavouriteOutfits"
        component={FavouriteOutfits}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />

      <Drawer.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />

      <Drawer.Screen
        name="TransactionHistoryDetail"
        component={TransactionHistoryDetail}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />

      <Drawer.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />

      <Drawer.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: false,
          unmountOnBlur:true
        }}
      />
    </Drawer.Navigator>
  );
};
