import { createContext, useState } from "react";
import { Alert } from "react-native";
import { getValueFor } from "../authentication/auth.service";

import {
  addToFavoriteRequest,
  changePasswordRequest,
  currentProfileRequest,
  updateProfileRequest,
} from "./profile.service";

export const ProfileContext = createContext({});

export const ProfileContextProvider = ({ children }: any) => {
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
          if (err.response.status === 401) {
            Alert.alert("session expired, please log in again");
          }
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
        profile,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
