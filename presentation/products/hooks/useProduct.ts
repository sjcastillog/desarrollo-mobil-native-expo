import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { ProductI } from "@/core/products/interfaces/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {

  const queryClient = useQueryClient();


  const productIdRef = useRef(productId); // new o UUID
  
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  // Mutacion
  const productMutation = useMutation({
    mutationFn: async (data: ProductI) => updateCreateProduct({
      ...data,
      id:productIdRef.current
    }),
    onSuccess(data: ProductI) {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({
        queryKey:['products', 'infinite']
      });
      queryClient.invalidateQueries({
        queryKey:['products', data.id]
      });
      Alert.alert("Producto guardado con exito");
    },
    onError(err) {
      Alert.alert(`${err}`);
    },
  });

  // mantener el id del producto en caso de ser nuevo
  return {
    productQuery,
    productMutation,
  };
};
