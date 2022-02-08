import { StackActions, useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import { getValueFor } from "../authentication/auth.service";

import {
  addToFavoriteRequest,
  changePasswordRequest,
  currentProfileRequest,
  removeFromFavoriteRequest,
  updateProfileRequest,
} from "./profile.service";

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }: any) => {
  const navigation = useNavigation()
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const currentUserProfile = () => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      const aToken = await getValueFor("aToken");
      currentProfileRequest(aToken)
        .then((res) => {
          setIsLoading(false);
          setProfile(res.data);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
            navigation.dispatch(
              StackActions.replace("Authentication", { screen: "Login" })
            );
          }  
          setError(err)
          reject(err);
        });
    });
  };

  const changePassword = (data: any) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      console.log(data);
      const aToken = await getValueFor("aToken");
      const formattedData = JSON.stringify({
        password: data.password,
        oldPassword: data.oldPassword,
      });
      changePasswordRequest(aToken, formattedData)
        .then(() => {
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
            navigation.dispatch(
              StackActions.replace("Authentication", { screen: "Login" })
            );
          } 
          setError(err)
          reject(err);
        });
    });
  };

  const updateProfile = (data: any) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      const aToken = await getValueFor("aToken");
      updateProfileRequest(aToken, data)
        .then(() => {
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
            navigation.dispatch(
              StackActions.replace("Authentication", { screen: "Login" })
            );
          } 
          setError(err)
          reject(err);
        });
    });
  };

  const addToFavorite = (productId: any) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      const aToken = await getValueFor("aToken");
      addToFavoriteRequest(aToken, productId)
        .then(() => {
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
            navigation.dispatch(
              StackActions.replace("Authentication", { screen: "Login" })
            );
          } 
          setError(err)
          reject(err);
        });
    });
  };

  const removeFromFavorite = (productId: any) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      const aToken = await getValueFor("aToken");
      removeFromFavoriteRequest(aToken, productId)
        .then(() => {
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
            navigation.dispatch(
              StackActions.replace("Authentication", { screen: "Login" })
            );
          } 
          setError(err)
          reject(err);
        });
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        currentUserProfile,
        changePassword,
        updateProfile,
        addToFavorite,
        removeFromFavorite,
        profile,
        error,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
