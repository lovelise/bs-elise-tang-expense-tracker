import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Header from "../components/Main";

const Stack = createStackNavigator();

function MystackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Welcome"
          component={Login}
          options={{ title: "                    Expense Tracker" }}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{ title: "Expense Tracker" }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: "               Register form" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MystackNavigation;
