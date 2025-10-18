import { ProductI } from "@/core/products/interfaces/product.interface";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductCard } from "./ProductCard";
import { useQueryClient } from "@tanstack/react-query";

interface PropsI {
  products: ProductI[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: PropsI) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefreseh = async () => {
    setIsRefreshing(true);

    await new Promise((resolve) => setTimeout(resolve, 200));
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });
    setIsRefreshing(false);
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage} // cuando llegue al final o al 80% de la pantalla llamar la siguiente data
      onEndReachedThreshold={0.8} // margen de 80% de nuestra pantalla para poder llamar informacion nueva
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onPullToRefreseh}
        />
      }
    />
  );
};

export default ProductList;
