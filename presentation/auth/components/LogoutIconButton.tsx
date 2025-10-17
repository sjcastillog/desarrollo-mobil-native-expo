import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

const LogoutIconButton = () => {
  const primaryColor = useThemeColor({}, "primary");
  const { logout } = useAuthStore();
  return (
    <View>
      <TouchableOpacity style={{ marginRight: 8 }} onPress={logout}>
        <Ionicons name="log-out-outline" size={24} color={primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default LogoutIconButton;
