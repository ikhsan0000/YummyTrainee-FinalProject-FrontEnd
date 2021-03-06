import { createContext, useState } from "react";
import { loginRequest, save, getValueFor, registerRequest, logoutRequest } from "./auth.service";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = (data: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const formattedData = JSON.stringify({
        email: data.email,
        password: data.password,
      });
      setIsLoading(true)
      loginRequest(formattedData)
        .then(async (data: any) => {
          setError(false);

          await save("aToken", data.data.accessToken);    //save access token to AsyncStorage
          await save("rToken", data.data.refreshToken);   //save refresh token to AsyncStorage

          printToken("aToken")
          setIsAuthenticated(true);
          setIsLoading(false)
          resolve();
        })
        .catch((err) => {
          setIsLoading(false)
          setError(true);
          reject(err);
        });
    });
  };

  const onRegister = (data: any) => {
    return new Promise<void>(async (resolve, reject) => {
      const formattedData = JSON.stringify({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        passwordConfirm: data.passwordConfirm
      });
      setIsLoading(true)

      // resolve()
      registerRequest(formattedData)
        .then(() => {
          setIsLoading(false)
          resolve();
        })
        .catch((err) => {
          setIsLoading(false)
          reject(err);
        });
    });
  };

  const onLogout = async () => {
    const aToken = await getValueFor('aToken');
    return new Promise<void>(async (resolve, reject) => {
      logoutRequest(aToken)
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }


  const printToken = (key: string) => {
    getValueFor(key);
  };

  return (
    <AuthContext.Provider
      value={{
        onLogin,
        onRegister,
        onLogout,
        isAuthenticated,
        isLoading,
        error,
        printToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
