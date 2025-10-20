import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type ProductI } from "../interfaces/product.interface";

const emptyProduct: ProductI = {
  id: "",
  title: "Nuevo Producto",
  description: "",
  price: 0,
  images: [],
  slug: "",
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: [],
};
export const getProductById = async (id: string): Promise<ProductI> => {
  if (id === "new") return emptyProduct;
  try {
    const { data } = await productsApi.get<ProductI>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  } catch (error) {
    throw new Error("unable load product");
  }
};
