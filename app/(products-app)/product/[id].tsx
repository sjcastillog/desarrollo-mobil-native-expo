import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import MenuIconButton from "@/presentation/theme/components/ui/MenuIconButton";
import ThemeButtonGroup from "@/presentation/theme/components/ui/theme-botton-group";
import ThemeButton from "@/presentation/theme/components/ui/theme-button";
import ThemeTextInput from "@/presentation/theme/components/ui/theme-text-input";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Redirect, router, useLocalSearchParams, useNavigation } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ProductId = () => {
  const textColor = useThemeColor({}, "text");

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { productQuery, productMutation } = useProduct(`${id}`);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
        icon="camera-outline"
        onPress={()=> router.push('/camera')}
        />
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
    <Formik initialValues={product} onSubmit={productMutation.mutate}>
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <ProductImages images={values.images} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemeTextInput
                placeholder="Titulo"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemeTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemeTextInput
                placeholder="Descripcion"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange("description")}
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
              <ThemeTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemeTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 10,
              }}
            >
              <ThemeButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(selectedOption: any) => {
                  let arr = values.sizes;
                  if (values.sizes.includes(selectedOption)) {
                    arr = arr.filter((size) => size !== selectedOption);
                  } else {
                    arr.push(selectedOption);
                  }
                  setFieldValue("sizes", arr);
                }}
              />
              <ThemeButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue("gender", selectedOption)
                }
              />
            </ThemedView>

            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20,
              }}
            >
              <ThemeButton icon="save-outline" onPress={() => handleSubmit()}>
                Guardar
              </ThemeButton>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductId;
