import { Camera, CameraView } from "expo-camera/next";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Navigate from "./navigation/Navigate";
import { CityContextProvider } from "./contexts/CityContext";

export default function App() {
  return (
    <CityContextProvider>
      <View style={styles.container}>
        <Navigate />
        <StatusBar style="auto" />
      </View>
    </CityContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
