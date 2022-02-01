import { createContext, useState } from "react";
import { getValueFor } from "../authentication/auth.service";
import { cartRequest } from "./cart.service";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }: any) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState();
  
  const addToCart = async (data: any) => {
    const aToken = await getValueFor("aToken");
    console.log(aToken)
    return new Promise<void>(async (resolve, reject) => {
        setIsLoading(true)
        cartRequest(aToken, data)
        .then(() => {
          setIsLoading(false)
          resolve()
        })
        .catch((err) => {
          setIsLoading(false)
          reject(err)
        })
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
