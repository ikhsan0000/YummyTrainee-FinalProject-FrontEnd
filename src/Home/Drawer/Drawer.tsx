import {
  DrawerActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Header } from "../../components";
import theme, { Box, Text } from "../../components/Theme";
import { ProfileContext } from "../../services/profile/profile.context";
import DrawerItem, { DrawerItemProps } from "./DrawerItem";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";

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

  // Profile Context
  const { profile, currentUserProfile, changeProfilePicture }: any =
    useContext(ProfileContext);

  const [profileImageFilename, setprofileImageFilename] =
    useState("default.png");
  const profilePictureUrl = `http://192.168.0.172:3000/user-profile/images/${profileImageFilename}`;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("file", {
      uri: localUri.replace("file:///", "file://"),
      name: filename,
      type,
    });

    let rawFormData = new FormData()
    rawFormData.append('file', result)

    if (!result.cancelled) {
      changeProfilePicture(formData)
        .then(() => {
          setprofileImageFilename(profile.profilePicture);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      return;
    }
  };

  useEffect(() => {
    currentUserProfile()
    .then(() => {
      if (profile.profilePicture !== "" || profile.profilePicture !== null) {
        setprofileImageFilename(profile.profilePicture);
      } else {
        setprofileImageFilename("default.png");
      }
    })
    .catch((err:any) => {
      console.log(err);
    });
    return () => { }
  }, []);

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
          <TouchableOpacity onPress={() => pickImage()}>
            <Box
              backgroundColor="primary"
              width={100}
              height={100}
              style={{ borderRadius: 50 }}
              alignSelf="center"
              top={-theme.spacing.xl}
              overflow="hidden"
            >
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: profilePictureUrl,
                }}
              />
            </Box>
          </TouchableOpacity>

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
