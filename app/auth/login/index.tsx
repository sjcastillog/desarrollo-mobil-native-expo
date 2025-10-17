import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemeTextInput from "@/presentation/theme/components/ui/theme-text-input";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const LoginScreen = () => {
  const { width, height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 40 }}>
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>
        <View style={{ marginTop: 20 }}>
          <ThemeTextInput
            placeholder="Correo Electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          <ThemeTextInput
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
