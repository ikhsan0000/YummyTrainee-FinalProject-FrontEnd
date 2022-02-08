import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Box, Text } from "../../components/Theme";
import { Header } from "../../components";
import { HomeNavigationProps } from "../../components/Navigation";
import { DrawerActions, StackActions } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import Tabs from "./Tabs";
import Configuration from "./Configuration";
import PersonalInfo from "./PersonalInfo";
import { ProfileContext } from "../../services/profile/profile.context";


const tabs = [
  { id: "configuration",  title: "Configuration"},
  { id: "info",  title: "Personal Info"}
]

const EditProfile = ({ navigation }: HomeNavigationProps<"EditProfile">) => {
  const theme = useTheme();
  const [refresh, setRefresh] = useState(false)
  const refreshing = () => {
    setRefresh(!refresh)
  }

  // Profile Context
  const { profile, currentUserProfile }:any = useContext(ProfileContext)
  useEffect(async () => {
    try{
      await currentUserProfile()
    } catch(err) {
      console.log(err)
    }
  }, [refresh])

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
              icon: "arrow-left",
              onPress: () => navigation.goBack(),
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
              {profile && profile.fullName}
            </Text>

            <Text variant="body" textAlign="center" fontSize={14}>
              {profile && profile.user.email}
            </Text>
          </Box>

        
        <Tabs tabs={tabs}>
          <Configuration />
          <PersonalInfo refreshing={refreshing} />
        </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
