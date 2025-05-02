import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getIn } from "formik";

function FormInput({
  formik,
  name,
    inputType,
  placeholderName,
  containerStyle = {},
  keyboardType,
  ...rest
}) {
  const value = getIn(formik?.values, name);
  const error = getIn(formik?.errors, name);
  const touched = getIn(formik?.touched, name);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length < 3) {
      return text.replace(/\D/g, "").slice(0, 4);
    } else {
     return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
  };

  const formatCVC = (text) => {
    return text.replace(/\D/g, "").slice(0, 4)
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{placeholderName}</Text>
      {
        inputType === 'creditCardNumber' && (
            <TextInput
                {...rest}
                value={typeof value === "string" ? value : ""}
                style={[
                  styles.input,
                  name === "shippingAddress.address" && styles.areaInput,
                  touched && error ? styles.inputError : {},
                ]}
                onChangeText={(e) =>formik.setFieldValue(name,formatCardNumber(e))
                }
                onBlur={() => formik.setFieldTouched(name)}
                keyboardType={keyboardType}
            />
        ) || inputType === 'cvc' && (
            <TextInput
                {...rest}
                value={typeof value === "string" ? value : ""}
                style={[
                  styles.input,
                  name === "shippingAddress.address" && styles.areaInput,
                  touched && error ? styles.inputError : {},
                ]}
                onChangeText={(e) =>formik.setFieldValue(name,formatCVC(e))
                }
                onBlur={() => formik.setFieldTouched(name)}
                keyboardType={keyboardType}
            />
        ) || (
              <TextInput
                  {...rest}
                  value={typeof value === "string" ? value : ""}
                  style={[
                    styles.input,
                    name === "shippingAddress.address" && styles.areaInput,
                    touched && error ? styles.inputError : {},
                  ]}
                  onChangeText={(e) =>formik.setFieldValue(name,e)
                  }
                  onBlur={() => formik.setFieldTouched(name)}
                  keyboardType={keyboardType}
              />
          )
      }
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    // Flex ayarı yapılacak
  },
  label: {
    color: "#6b7280", // Tailwind gray-500
    marginBottom: 4,
  },
  input: {
    borderColor: "gray",
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  areaInput: {
    borderColor: "gray",
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