import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { color } from "@/constants/colors";

function KeyboardAvoidingContainer({ children }) {
  return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

      </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingContainer;
