import { View } from "react-native";
import React from "react";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { DrawerActions } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import Tabs from "./Tabs";
import Configuration from "./Configuration";
import PersonalInfo from "./PersonalInfo";


const tabs = [
  { id: "configuration",  title: "Configuration"},
  { id: "info",  title: "Personal Info"}
]

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  const theme = useTheme();
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
            title="edit profile"
            left={{
              icon: "menu",
              onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
            }}
            dark
          />
        </Box>
      </Box>

      <Box flex={0.85} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor="white"
          borderTopLeftRadius="xl"
          borderBottomRightRadius="xl"
          padding="m"
        >
          <Box
            backgroundColor="primary"
            width={100}
            height={100}
            style={{ borderRadius: 50 }}
            alignSelf="center"
            top={-theme.spacing.xl - 20}
          />

          <Box style={{marginTop:-theme.spacing.xl - 10}}>
            <Text variant="title1" fontSize={24} textAlign="center">
              Ikhsan Firdauz
            </Text>

            <Text variant="body" textAlign="center" fontSize={14}>
              ikhsanfirdauz000@gmail.com
            </Text>
          </Box>

        
        <Tabs tabs={tabs}>
          <Configuration />
          <PersonalInfo />
        </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
