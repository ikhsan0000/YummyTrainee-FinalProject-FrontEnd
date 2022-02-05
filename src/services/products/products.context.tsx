import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { productSearchRequest, productsRequest } from "./products.service";

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }: any) => {
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
          setError(err)
          reject(err);
        });
    });
  };

  const searchProducts = (keyword: string) => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true)
      await productSearchRequest(keyword)
      .then((res) => { 
        setProducts(res.data);
        setIsLoading(false);
          resolve();
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err)
          reject(err);
        });
    })
  }


  return (
    <ProductsContext.Provider
      value={{
        retriveAllProducts,
        searchProducts,
        isLoading,
        error,
        products
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
