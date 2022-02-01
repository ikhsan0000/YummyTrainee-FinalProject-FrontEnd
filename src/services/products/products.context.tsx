import { createContext, useEffect, useState } from "react";
import { productsRequest } from "./products.service";

export const ProductsContext = createContext({});

export const ProductsContextProvider = ({ children }: any) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();

  const retriveAllProducts = () => {
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      await productsRequest()
        .then((data) => {
          setProducts(data.data);
          setIsLoading(false);
          resolve();
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error)
          reject(error);
        });
    });
  };


  return (
    <ProductsContext.Provider
      value={{
        retriveAllProducts,
        isLoading,
        error,
        products
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
