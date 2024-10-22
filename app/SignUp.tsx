import { useCallback, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Input from "@/components/Input";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const auth = getAuth();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.navigate("./QRScanner");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const onSignIn = useCallback(() => router.push("/LogIn"), [router]);

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
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        label="Enter Your First Name"
        autoComplete="given-name"
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        label="Enter Your Last Name"
        autoComplete="family-name"
      />
      <Input
        placeholder={"Phone Number"}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        label="Enter Your Phone"
        autoComplete="tel"
        keyboardType={"number-pad"}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        isSecure={true}
        label="Enter Your Password"
        autoComplete="password"
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text>Register</Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Text>{"Already have an account?"}</Text>
        <TouchableOpacity onPress={onSignIn}>
          <Text>{" Sign in"} </Text>
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

export default SignUp;
