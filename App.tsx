import { StyleSheet, Text, View, StatusBar } from "react-native";
import * as React from "react";
import { AuthenticationNavigator } from "./src/Authentication";
import { HomeNavigator } from "./src/Home";

import { LoadAssets, theme } from "./src/components";
import { ThemeProvider } from "@shopify/restyle";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppRoutes } from "./src/components/Navigation";
import { AuthContextProvider } from "./src/services/authentication/auth.context";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
  "SFProDisplay-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  "SFProDisplay-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
  "SFProDisplay-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
};

const AppStack = createStackNavigator<AppRoutes>();

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <StatusBar barStyle="light-content" />

        <AuthContextProvider>
          <AppStack.Navigator>
            <AppStack.Screen
              name="Authentication"
              component={AuthenticationNavigator}
              options={{
                headerShown: false,
              }}
            />
            <AppStack.Screen
              name="Home"
              component={HomeNavigator}
              options={{
                headerShown: false,
              }}
            />
          </AppStack.Navigator>
        </AuthContextProvider>
        
      </LoadAssets>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
