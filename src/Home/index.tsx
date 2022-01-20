import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeRoutes } from "../components/Navigation";
import OutfitIdeas from "./OutfitIdeas";
import DrawerContent, { DRAWER_WIDTH } from "./Drawer/Drawer";
import FavouriteOutfits from "./FavouriteOutfites";
import TransactionHistory from "./TransactionHistory";
import EditProfile from "./EditProfile";

const Drawer = createDrawerNavigator<HomeRoutes>();
export const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{ drawerStyle: { width: DRAWER_WIDTH } }}
    >
      <Drawer.Screen
        name="OutfitIdeas"
        component={OutfitIdeas}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="FavouriteOutfits"
        component={FavouriteOutfits}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
