import React from "react";
import SignupPage from "./scr/screens/SignupPage";
import LoginPage from "./scr/screens/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./scr/screens/BottomTab";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator options={{ headerShown: false }}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*const navigator = createStackNavigator(
  {
    LoadingScreen: {
      screen: LoadingScreen,
      navigationOptions: { headerShown: null },
    },
    SignUp: {
      screen: SignupPage,
      navigationOptions: { headerShown: null },
    },
    GeofenceSetting: {
      screen: GeofenceSetting,
      navigationOptions: { headerShown: null },
    },
    MapScreen: {
      screen: MapScreen,
      navigationOptions: { headerShown: null },
    },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: { headerShown: null },
    },

    MainScreen: {
      screen: MainScreen,
      navigationOptions: { headerShown: null },
    },
  },
  {
    initialRouteName: "LoginPage",
    defaultNavigationOptions: {
      title: "GeofenceApp",
    },
  }
);*/
