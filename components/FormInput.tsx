import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { getIn } from "formik";

function FormInput({ formik, name, placeholderName, keyboardType, ...rest }) {
  const value = getIn(formik?.values, name);
  const error = getIn(formik?.errors, name);
  const touched = getIn(formik?.touched, name);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholderName}</Text>
      <TextInput
        {...rest}
        value={typeof value === "string" ? value : ""}
        style={[
          styles.input,
          name === "shippingAddress.address" && styles.areaInput,
          touched && error ? styles.inputError : {},
        ]}
        onChangeText={(e) => formik.setFieldValue(name, e)}
        onBlur={() => formik.setFieldTouched(name)}
        keyboardType={keyboardType}
      />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: "#6b7280", // Tailwind gray-500
    marginBottom: 4,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  areaInput: {
    borderColor: "gray",
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 11,
    marginTop: 4,
  },
});
