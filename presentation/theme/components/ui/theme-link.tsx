import { Ionicons } from "@expo/vector-icons";
import { Link, LinkProps } from "expo-router";
import React from "react";
import { useThemeColor } from "../../hooks/use-theme-color";

interface PropsI extends LinkProps {}

const ThemeLink = ({ style, ...rest }: PropsI) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <Link
      style={[
        {
          color: primaryColor,
        },
      ]}
      {...rest}
    />
  );
};

export default ThemeLink;
