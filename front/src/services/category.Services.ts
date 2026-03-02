import api from "./api";
import type { Category, Product } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const res = await api.get<Product[]>(`/categories/${categoryId}/products`);
  return res.data;
};