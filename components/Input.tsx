import React from "react";
import { StyleSheet, TextInput, TextInputProps, Text } from "react-native";

type InputProps = TextInputProps & {
  onChangeText: (value: string) => void;
  value: string;
  label: string;
  placeholder: string;
  isSecure?: boolean;
};

const Input = ({
  onChangeText,
  value,
  label,
  placeholder,
  isSecure = false,
  ...rest
}: InputProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    marginBottom: 12,
    fontSize: 18,
    alignSelf: "flex-start",
    marginLeft: 24,
  },
});

export default Input;
