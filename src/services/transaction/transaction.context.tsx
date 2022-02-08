import { StackActions, useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import { getValueFor } from "../authentication/auth.service";
import { createTransactionRequest, getAllTransactionRequest } from "./transaction.service";

export const TransactionContext = createContext({});

export const TransactionContextProvider = ({ children }: any) => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()

  const getTransactions  = async () => {
    const aToken = await getValueFor("aToken");

    return new Promise(async (resolve, reject) => {
      setIsLoading(true);
      getAllTransactionRequest(aToken)
        .then((res) => {
          setIsLoading(false);
          resolve(res);
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
  }

  const createTransaction = async (data: any) => {
    const aToken = await getValueFor("aToken");

    return new Promise<void>(async (resolve, reject) => {
      setIsLoading(true);
      createTransactionRequest(aToken, data)
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
    <TransactionContext.Provider
      value={{
        createTransaction,
        getTransactions,
        isLoading,
        error
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
