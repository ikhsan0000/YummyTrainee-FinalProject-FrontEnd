import React from 'react';
import { Routes } from '../components/Navigation';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './Onboarding';
import Welcome from './Welcome';
import Login from './Login';

export {default as Onboarding} from "./Onboarding"
export {default as Welcome} from "./Welcome"

const AuthenticationStack = createStackNavigator<Routes>();
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

    </AuthenticationStack.Navigator>
  );
};