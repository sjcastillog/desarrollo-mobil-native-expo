import { productsApi } from "@/core/api/productsApi";
import { ProductI } from "../interfaces/product.interface";

export const updateCreateProduct = (product: Partial<ProductI>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

async function updateProduct(product: Partial<ProductI>) {
  const { id, images = [], user, ...rest } = product;
  console.log(rest);
  console.log(id)
  try {
    const { data } = await productsApi.patch<ProductI>(`/products/${id}`,{...rest});
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error al actualizar el producto");
  }
}

async function createProduct(product: Partial<ProductI>) {
  const { id, images = [], user, ...rest } = product;
  try {
    const { data } = await productsApi.post<ProductI>(`/products`, {
      // TODO: IMAGES
      ...rest,
    });
    return data;
  } catch (error: any) {
    throw new Error("Error al crear el producto");
  }
}
