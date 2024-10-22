import React, { useState, useEffect } from "react";
import { View, Button, Alert, StyleSheet, Text } from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  // get camera permissions
  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  // // get push notifications permissions
  const getPushNotificationsPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      await Notifications.requestPermissionsAsync();
    }
  };

  useEffect(() => {
    getCameraPermissions();
  }, []);

  useEffect(() => {
    getPushNotificationsPermissions();
  }, []);

  // send notifications
  const triggerPushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "QR Code Scanned!",
        body: "You successfully scanned the QR code!",
      },
      trigger: { seconds: 1 },
    });
  };

  // show qr code data and trigger push notifications
  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Content: ${data}`);
    triggerPushNotification();
  };

  // render camera view
  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          facing="back"
          mode="picture"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      </View>
    );
  };

  if (hasPermission === false) {
    <Text>{"Camera permission not granted"}</Text>;
  }

  return (
    <View style={styles.container}>
      {renderCamera()}
      {scanned && (
        <Button title="Tap to Scan" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: "80%",
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 40,
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default QRScanner;
