import { createContext, useState } from "react";
import { Alert } from "react-native";
import { getValueFor } from "../authentication/auth.service";
import { createTransactionRequest, getAllTransactionRequest } from "./transaction.service";

export const TransactionContext = createContext({});

export const TransactionContextProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);

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
          }
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
          }
          reject(err);
        });
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        createTransaction,
        getTransactions,
        isLoading
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
