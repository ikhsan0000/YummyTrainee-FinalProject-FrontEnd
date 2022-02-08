import { StackActions, useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  filterByCategoryRequest,
  productSearchRequest,
  productsRequest,
} from "./products.service";

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }: any) => {
  const navigation = useNavigation()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();

  const retriveAllProducts = () => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      await productsRequest()
        .then((res) => {
          setProducts(res.data);
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

  const searchProducts = (keyword: string) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      await productSearchRequest(keyword)
        .then((res) => {
          setProducts(res.data);
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
          setError(err);
          reject(err);
        });
    });
  };

  const filterByCategory = (category: string) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      await filterByCategoryRequest(category)
        .then((res) => {
          setProducts(res.data);
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
          setError(err);
          reject(err);
        });
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        retriveAllProducts,
        filterByCategory,
        searchProducts,
        isLoading,
        error,
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
