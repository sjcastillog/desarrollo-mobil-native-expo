import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../../hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";

interface PropsI {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}

const MenuIconButton = ({ onPress, icon }: PropsI) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={icon} size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default MenuIconButton;
