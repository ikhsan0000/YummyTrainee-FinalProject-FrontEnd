import React from 'react';
import { AuthenticationRoutes } from '../components/Navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './Onboarding';
import Welcome from './Welcome';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import PasswordChanged from './PasswordChanged';
import RegisterSuccess from './RegisterSuccess';

export {default as Onboarding} from "./Onboarding"
export {default as Welcome} from "./Welcome"

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();
export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="PasswordChanged"
        component={PasswordChanged}
        options={{
          headerShown: false,
        }}
      />

      <AuthenticationStack.Screen
        name="RegisterSuccess"
        component={RegisterSuccess}
        options={{
          headerShown: false,
        }}
      />

    </AuthenticationStack.Navigator>
  );
};