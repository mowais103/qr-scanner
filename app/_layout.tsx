import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="LogIn">
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="LogIn" />
      <Stack.Screen name="QRScanner" />
    </Stack>
  );
}
