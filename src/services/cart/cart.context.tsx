import { StackActions, useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import { getValueFor } from "../authentication/auth.service";
import {
  addToCartRequest,
  cartDetailRequest,
  deleteItemRequest,
  editQuantityRequest,
  oneCartDetailRequest,
} from "./cart.service";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }: any) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()

  const addToCart = async (data: any) => {
    const aToken = await getValueFor("aToken");
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      addToCartRequest(aToken, data)
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
          reject(err);
        });
    });
  };

  const cartDetail = async () => {
    const aToken = await getValueFor("aToken");
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      cartDetailRequest(aToken)
        .then((data) => {
          setIsLoading(false);
          resolve(data);
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
          }
          reject(err);
        });
    });
  };

  const oneCartDetail = async (id: any) => {
    const aToken = await getValueFor("aToken");
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      oneCartDetailRequest(aToken, id)
        .then((data) => {
          setIsLoading(false);
          resolve(data);
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
          }
          reject(err);
        });
    });
  };

  const editQuantity = async (data: any) => {
    const aToken = await getValueFor("aToken");
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      await editQuantityRequest(aToken, data)
        .then(() => {
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
          }
          reject(err);
        });
    });
  };

  const deleteItem = async (cartItemId: number) => {
    const aToken = await getValueFor("aToken");
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      await deleteItemRequest(aToken, cartItemId)
        .then(() => {
          setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          if(err.response.status === 401)
          {
            Alert.alert("session expired, please log in again");
          }
          reject(err);
        });
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartDetail,
        oneCartDetail,
        editQuantity,
        deleteItem,
        isLoading,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
