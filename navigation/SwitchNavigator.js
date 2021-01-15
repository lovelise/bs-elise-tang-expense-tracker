import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Main from "../components/Main";

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
          name="Main"
          component={Main}
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
