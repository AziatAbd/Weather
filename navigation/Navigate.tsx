import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import QRCodeScanner from "../components/QRCodeScanner";
import Weather from "../components/Weather";

const Stack = createNativeStackNavigator();

const Navigate = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="scan"
          component={QRCodeScanner}
          options={{ title: "Главная" }}
        />
        <Stack.Screen
          name="weather"
          component={Weather}
          options={{ title: "Погода" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;
