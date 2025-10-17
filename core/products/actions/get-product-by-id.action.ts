import { API_URL, productsApi } from "@/core/api/productsApi";
import { type ProductI } from "../interfaces/product.interface";

export const getProductById = async (id: string): Promise<ProductI> => {
  try {
    const { data } = await productsApi.get<ProductI>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/products/${image}`),
    };
  } catch (error) {
    throw new Error("unable load product");
  }
};
