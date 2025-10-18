import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemeTextInput from "@/presentation/theme/components/ui/theme-text-input";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

// interface PropsI {
//   id: string;
// }
const ProductId = () => {
  const textColor = useThemeColor({}, "text");

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { productQuery } = useProduct(`${id}`);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={25} color={textColor} />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemeTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />
          <ThemeTextInput placeholder="Slug" style={{ marginVertical: 5 }} />
          <ThemeTextInput
            placeholder="Descripcion"
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemeTextInput placeholder="Precio" style={{ flex: 1 }} />
          <ThemeTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductId;
