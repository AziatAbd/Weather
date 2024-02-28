import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Camera } from "expo-camera";
import { CameraView } from "expo-camera/next";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

type RootStackParamList = {
  weather: { data: string };
};

type QRCodeScannerProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "weather">;
};

const QRCodeScanner = ({ navigation }: QRCodeScannerProps) => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(false);
    navigation.navigate("weather", { data });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <StyledText>
        Чтобы посмотреть погоду сначала отсканируйте QR Code
      </StyledText>

      {scanned && (
        <>
          <CameraView
            onBarcodeScanned={!scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <StyledButtonCont>
            <Button title={"Cancel"} onPress={() => setScanned(false)} />
          </StyledButtonCont>
        </>
      )}
      {!scanned && (
        <Button title={"Tap to Scan"} onPress={() => setScanned(true)} />
      )}
    </>
  );
};

export default QRCodeScanner;

const StyledText = styled(Text)`
  font-size: 24px;
  padding: 10px 20px;
  font-weight: 500;
`;

const StyledButtonCont = styled(View)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
