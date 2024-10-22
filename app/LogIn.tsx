import Input from "@/components/Input";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  // log in and navigate
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.navigate("./QRScanner");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const onSignUp = useCallback(() => router.push("/SignUp"), [router]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        label="Enter Your Email"
        keyboardType={"email-address"}
        autoComplete="email"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isSecure={true}
        label="Enter Your Password"
        autoComplete="password"
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text>Log In</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text>{"Didn't have an account?"}</Text>
        <TouchableOpacity onPress={onSignUp}>
          <Text>{" Sign up"} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "80%",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.icon,
    marginTop: 24,
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
});

export default LogIn;
