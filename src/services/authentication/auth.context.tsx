import { createContext, useState } from "react";
import { loginRequest, save, getValueFor } from "./auth.service";

export const AuthContext = createContext({});


export const AuthContextProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')


  const onLogin = (data: any) => {
    const formattedData = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    loginRequest(formattedData)
        .then((data:any) => {
           console.log(data)
           setError(false)
           setAccessToken(data.data.accessToken)
           setRefreshToken(data.data.refreshToken)

           save('aToken', accessToken)
           save('rToken', refreshToken)

           setIsAuthenticated(true)
        })
        .catch((err) => {
            setError(true)
            console.log(err)
        })
  };

  const printToken = (key: string) => {
    getValueFor(key)
  }

  return (
    <AuthContext.Provider
      value={{
        onLogin,
        isAuthenticated,
        error,
        printToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
