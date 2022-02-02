import { createContext, useState } from "react";
import { getValueFor } from "../authentication/auth.service";
import {
  addToCartRequest,
  cartDetailRequest,
  editQuantityRequest,
  oneCartDetailRequest,
} from "./cart.service";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }: any) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState();

  const addToCart = async (data: any) => {
    const aToken = await getValueFor("aToken");
    console.log(aToken);
    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      addToCartRequest(aToken, data)
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
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
