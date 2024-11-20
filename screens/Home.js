import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import MyProfile from "./Home/MyProfile";
import ListProfile from "./Home/ListProfile";
import Groupe from "./Home/Groupe";

const Tab = createMaterialBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListProfile" component={ListProfile} />
      <Tab.Screen name="Groupe" component={Groupe} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
}
