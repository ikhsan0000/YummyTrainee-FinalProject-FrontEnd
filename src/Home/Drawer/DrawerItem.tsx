import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { RectButton } from "react-native-gesture-handler";
import RoundedIcon from "../../Authentication/components/RoundedIcon";
import { HomeRoutes } from "../../components/Navigation";
import theme, { Box, Theme, Text } from "../../components/Theme";

interface DrawerItemProps {
  icon: string;
  color: keyof Theme["colors"];
  screen: keyof HomeRoutes;
  label: string;
}

const DrawerItem = ({ icon, color, screen, label }: DrawerItemProps) => {
  const { navigate } = useNavigation<DrawerNavigationProp<HomeRoutes, "FavouriteOutfits">>();
  
  return (
    <RectButton style={{borderRadius: theme.borderRadii.m}} onPress={() => navigate(screen) }>
      <Box flexDirection="row" alignItems="center" style={{padding: 12}} >
        <RoundedIcon
          name={icon}
          backgroundColor={color}
          color="white"
          size={36}
          iconRatio={0.6}
         
        />
        <Text variant="button" marginLeft="m">{label}</Text>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
