import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Main from "../components/Main";

const SwitchNavigator = createSwitchNavigator(
  {
    Login: Login,

    Signup: Signup,

    Main: Main,
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(SwitchNavigator);
