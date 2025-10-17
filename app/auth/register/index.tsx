import { ThemedText } from "@/presentation/theme/components/themed-text";
import ThemeButton from "@/presentation/theme/components/ui/theme-button";
import ThemeLink from "@/presentation/theme/components/ui/theme-link";
import ThemeTextInput from "@/presentation/theme/components/ui/theme-text-input";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

const RegisterScreen = () => {
  const { width, height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Crear Cuenta</ThemedText>
          <ThemedText style={{ color: "grey" }}>
            Por favor crea una cuenta para continuar
          </ThemedText>
        </View>
        <View style={{ marginTop: 20 }}>
          <ThemeTextInput
            placeholder="Nombre Completo"
            autoCapitalize="words"
            icon="person-outline"
          />
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

        <View style={{ marginTop: 10 }}></View>

        {/* Boton */}
        <ThemeButton icon="arrow-forward-outline">Crear Cuenta</ThemeButton>

        <View style={{ marginTop: 50 }}></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>Ya tienes Cuenta?</ThemedText>
          <ThemeLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            Ingresar
          </ThemeLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
