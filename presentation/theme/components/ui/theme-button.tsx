import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { useThemeColor } from "../../hooks/use-theme-color";

interface PropsI extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemeButton = ({ children, icon, ...rest }: PropsI) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? primaryColor + "90" : primaryColor,
        },
        styles.button,
      ]}
      {...rest}
    >
      <Text style={{ ...styles.text }}>{children}</Text>
      {icon ? (
        <Ionicons
          name={icon}
          size={24}
          color="white"
          style={{ marginHorizontal: 5 }}
        />
      ) : null}
    </Pressable>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
});
